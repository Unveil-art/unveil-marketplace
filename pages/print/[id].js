import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";
import Loader from "@/components/svg/Loader";
import Image from "next/image";
import {
  getClientSecretForShipping,
  getCurrentExchangeRateETHUSD,
  getEditionById,
  makePrintRequest,
  postTransaction,
} from "lib/backend";
import { useEffect } from "react";
import { Web3Context, rpcUrl } from "@/contexts/Web3AuthContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { CheckoutWithCard } from "@paperxyz/react-client-sdk";
import { useRouter } from "next/router";
import axios from "axios";
import Mastercard from "@/components/svg/Mastercard";
import Visa from "@/components/svg/Visa";
import Ideal from "@/components/svg/Ideal";
import MetaMask from "@/components/svg/MetaMask";
import MoreInfo from "@/components/svg/MoreInfo";
import MoreInfoPopIn from "@/components/pop-in/MoreInfoPopIn";
import RPC from "lib/RPC";
import { MARKET_ABI, MARKET_CONTRACT_ADDRESS } from "lib/constants";
import Web3 from "web3";

const PrintNft = ({ edition }) => {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [payment, setPayment] = useState("");
  const [formData, setFormData] = useState(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [secretSdkClient, setSecretSdkClient] = useState("");
  const { value: token } = useLocalStorage("token");
  const { value: wallet } = useLocalStorage("accounts");
  const { provider } = useContext(Web3Context);
  const router = useRouter();
  const _interval = useRef(null);
  const _timeout = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: edition?.buyer?.firstName,
      lastName: edition?.buyer?.lastName,
    },
  });

  const handlePrice = async () => {
    const res = await getCurrentExchangeRateETHUSD();
    setPrice((res.USD * edition.shipping_price).toFixed(2));
  };

  const getShippingSecret = async (token, artwork_id, edition_id, wallet) => {
    try {
      setLoading(true);

      const data = await getClientSecretForShipping(token, {
        wallet_address: wallet,
        artwork_id: artwork_id,
        edition_id: edition_id,
      });

      setSecretSdkClient(data.sdkClientSecret);
      setLoading(false);
    } catch (err) {
      console.log(err);
      showTopStickyNotification("error", err?.response?.data?.message);
      setLoading(false);
    }
  };

  const pollForTransactionHash = (id) => {
    console.log("polling started", id);

    _interval.current = setInterval(() => {
      console.log("polling running");
      axios({
        method: "GET",
        url: `https://withpaper.com/api/v1/transaction-status/${id}`,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAPER_API_SECRET}`,
          Accept: "application/json",
        },
      })
        .then(async ({ data, status }) => {
          console.log(data, "data");
          if (status === 200 && data.result.status === "TRANSFER_SUCCEEDED") {
            await makePrintRequest(token, {
              edition_id: edition.id,
              firstName: formData.firstName,
              lastName: formData.lastName,
              house_number: formData.address,
              postal_code: formData.postalCode,
              city: formData.city,
              country: formData.country,
              phone: formData.phone,
              shipping_charge: edition.shipping_charge,
              total_cost: edition.shipping_charge,
            });

            await postTransaction(token, {
              transaction_hash: data.result.transactionHash,
              amount: parseFloat(edition.shipping_price.toFixed(4)),
              currency: "ETH",
              transaction_type: "PRINT_REQUEST",
              chain_link: rpcUrl,
              edition_id: edition.id,
              artwork_id: edition.artwork.id,
            });
            showTopStickyNotification("success", "Request Sent");
            router.push("/account");
            clearInterval(_interval.current);
            clearTimeout(_timeout.current);
          } else if (data.result.status === "TRANSFER_FAILED") {
            showTopStickyNotification(
              "error",
              "Request Failed! Payment will be Refund in 5-7 working days"
            );
            clearInterval(_interval.current);
            clearTimeout(_timeout.current);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("re-requesting");
        });
    }, 3000);

    _timeout.current = setTimeout(() => {
      clearInterval(_interval.current);
      setStep(3);
      showTopStickyNotification(
        "error",
        "Server Timeout Please Contact Unveil Team."
      );
    }, 30000);
  };

  useEffect(() => {
    return () => {
      clearInterval(_interval.current);
      clearTimeout(_timeout.current);
    };
  }, []);

  const payWithWallet = async (data) => {
    if (!provider) {
      showTopStickyNotification(
        "error",
        "Invalid Provider! Please Sign in again"
      );
      return;
    }

    try {
      setLoading(true);
      const rpc = new RPC(provider);
      const contract = await rpc.getContract(
        MARKET_ABI,
        MARKET_CONTRACT_ADDRESS
      );
      const priceInWei = Web3.utils.toWei(edition.shipping_price.toFixed(4)); // priceInEth replace with edition.price
      const transaction = await contract.methods
        .ShippingActivation(
          edition.artwork.contract_address,
          edition.token_id,
          edition.shipping_signature,
          priceInWei
        )
        .send({ from: wallet, value: priceInWei });
      await makePrintRequest(token, {
        edition_id: edition.id,
        firstName: data.firstName,
        lastName: data.lastName,
        house_number: data.address,
        postal_code: data.postalCode,
        city: data.city,
        country: data.country,
        phone: data.phone,
        shipping_charge: parseFloat(edition.shipping_price.toFixed(4)),
        total_cost: parseFloat(edition.shipping_price.toFixed(4)),
      });

      await postTransaction(token, {
        transaction_hash: transaction.transactionHash,
        amount: parseFloat(edition.shipping_price.toFixed(4)),
        currency: "ETH",
        transaction_type: "PRINT_REQUEST",
        chain_link: rpcUrl,
        edition_id: edition.id,
        artwork_id: edition.artwork.id,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(JSON.stringify(err), "=====");
      showTopStickyNotification("error", err?.message);
    }
  };

  const onSubmitForm = async (data) => {
    setFormData(data);
    // console.log(data);
    if (provider) {
      if (!edition.shipping_signature) {
        showTopStickyNotification(
          "error",
          "Edition is not signed for Printing"
        );
        return;
      }
      if (payment === "Creditcard")
        getShippingSecret(token, edition.artwork_id, edition.id, wallet);
      if (payment === "Wallet") payWithWallet(data);
    } else {
      showTopStickyNotification(
        "error",
        "Invalid Provider! please sign in again"
      );
    }
  };

  useEffect(() => {
    if (edition) {
      handlePrice();
    }
  }, [edition]);

  return (
    <>
      {secretSdkClient && !!formData && (
        <div
          onClick={(e) => {
            setSecretSdkClient("");
            e.stopPropagation();
          }}
          className="fixed z-50 top-0 left-0 w-[100vw] h-[100vh] flex flex-col justify-center items-center"
        >
          <div className="p-4 w-[390px] border border-gray-700 shadow-lg mt-10 rounded-lg bg-[#ffffff]">
            <CheckoutWithCard
              sdkClientSecret={secretSdkClient}
              options={{
                colorBackground: "#ffffff",
                colorPrimary: "#807676",
                colorText: "#283618",
                borderRadius: 6,
                inputBackgroundColor: "#ffffff",
                inputBorderColor: "#3f3f3f",
              }}
              onPaymentSuccess={(result) => {
                console.log("Payment successful.", result);
                pollForTransactionHash(result.id);
              }}
              onError={(error) => {
                console.error("Payment error:", error);
                // toast.error(error.error.message);
                showTopStickyNotification("error", error.error.message);
                setStep(3);
              }}
            />
          </div>
        </div>
      )}

      <main className="pb-[120px] px-[15px] md:px-10 lg:flex justify-between gap-5">
        <div className="lg:flex justify-center w-full mt-[120px]">
          <div className="lg:max-w-2xl">
            <h1 className="lg:mb-20 mb-4">Print NFT</h1>
            <p className="s2 lg:mb-10 mb-8">
              Good news! Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Etiam consequat magna eu convallis malesuada. €2000 Ut
              semper semper orci at viverra. Quisque et leo sagittis, rutrum
              lorem dapibus,
            </p>
            <h2 className="b3 lg:mb-6 mb-5">Shipping address</h2>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="grid grid-cols-2 mb-[15px] md:gap-x-[15px] gap-x-2 ">
                <div className="relative">
                  <input
                    placeholder="First name"
                    className="input"
                    type="text"
                    name="firstName"
                    {...register("firstName", {
                      required: "Required",
                    })}
                  />
                  <p
                    className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                      errors.firstName?.message ? "opacity-100" : ""
                    }`}
                  >
                    {errors.firstName?.message}
                  </p>
                </div>

                <div className="relative">
                  <input
                    placeholder="Last name"
                    className="input"
                    type="text"
                    name="lastName"
                    {...register("lastName", {
                      required: "Required",
                    })}
                  />
                  <p
                    className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                      errors.lastName?.message ? "opacity-100" : ""
                    }`}
                  >
                    {errors.lastName?.message}
                  </p>
                </div>
              </div>

              <div className="relative mb-[15px]">
                <input
                  placeholder="Street and house number"
                  className="input"
                  name="address"
                  type="text"
                  {...register("address", {
                    required: "Required",
                  })}
                />
                <p
                  className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                    errors.address?.message ? "opacity-100" : ""
                  }`}
                >
                  {errors.address?.message}
                </p>
              </div>

              <div className="grid grid-cols-2 mb-[15px] md:gap-x-[15px] gap-x-2 ">
                <div className="relative">
                  <input
                    placeholder="Postal code"
                    className="input"
                    type="text"
                    name="postalCode"
                    {...register("postalCode", {
                      required: "Required",
                    })}
                  />
                  <p
                    className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                      errors.postalCode?.message ? "opacity-100" : ""
                    }`}
                  >
                    {errors.postalCode?.message}
                  </p>
                </div>

                <div className="relative">
                  <input
                    placeholder="City"
                    className="input"
                    type="text"
                    name="city"
                    {...register("city", {
                      required: "Required",
                    })}
                  />
                  <p
                    className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                      errors.city?.message ? "opacity-100" : ""
                    }`}
                  >
                    {errors.city?.message}
                  </p>
                </div>
              </div>

              <div className="relative mb-[15px]">
                <select
                  className="select-input"
                  name="country"
                  {...register("country", {
                    required: "Required",
                  })}
                >
                  <option value="" disabled selected>
                    Country
                  </option>
                  <option>The Netherlands</option>
                  <option>United Kingdom</option>
                </select>

                <p
                  className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                    errors.country?.message ? "opacity-100" : ""
                  }`}
                >
                  {errors.country?.message}
                </p>
              </div>

              <div className="relative mb-14">
                <input
                  placeholder="Phone"
                  className="input"
                  name="phone"
                  type="tel"
                  {...register("phone", {
                    required: "Required",
                  })}
                />
                <p
                  className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                    errors.phone?.message ? "opacity-100" : ""
                  }`}
                >
                  {errors.phone?.message}
                </p>
              </div>

              <div className="">
                <div className="w-full border-t border-unveilBlack flex justify-between items-center h5 py-4">
                  <div>Insured carbon Neutral shipping</div>
                  <div>${price}</div>
                </div>

                <div className="w-full border-t-2 border-unveilBlack flex justify-between items-center h5 pt-1.5">
                  <div>Total costs</div>
                  <div className="s2">${price}</div>
                </div>
              </div>

              {payment!=="" && <button
                className="flex items-center justify-center mt-10 mb-10 btn btn-primary btn-lg btn-full md:btn-wide"
                type="submit"
              >
                {loading && (
                  <div className="h-[25px] animate-spin flex items-center">
                    <Loader color="#F6F4ED" />
                  </div>
                )}
                {!loading && <>Request Print</>}
              </button>}
            </form>
            {payment === "" && (
              <div className="flex my-4 flex-col gap-1">
                <div className="flex items-center gap-1 mb-[15px] lg:mb-[20px] pt-10">
                  <p className="font-[500] b3 ">Choose your Payment Method</p>
                  <div
                    onClick={() => setPaymentOpen(!paymentOpen)}
                    className="cursor-pointer mb-[2px]"
                  >
                    <MoreInfo />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setPayment("Creditcard");
                  }}
                  className="relative disabled:bg-opacity-70 disabled:cursor-not-allowed cursor-pointer text-center btn btn-primary btn-full btn-lg my-[10px]"
                >
                  <p>Creditcard/iDeal</p>
                  <div className="flex items-center gap-[10px] top-1/2 right-5 -translate-y-1/2 absolute">
                    <Mastercard />
                    <Visa />
                    <Ideal />
                  </div>
                </button>
                <div
                  onClick={() => {
                    setPayment("Wallet");
                  }}
                  className="relative cursor-pointer text-center btn btn-secondary btn-full btn-lg md:my-[5px]"
                >
                  <p>Wallet</p>
                  <div className="flex items-center gap-[10px] top-1/2 right-5 -translate-y-1/2 absolute">
                    <MetaMask />
                    <img src="/images/t.png" alt="T" />
                  </div>
                </div>
              </div>
            )}
            <div className="rounded-[10px] overflow-hidden flex h-[67px] items-center bg-bgColor w-full">
              <div className="aspect-[1/1] mr-4 w-[67px] relative">
                <Image
                  src="/images/Nick_Fancher.png"
                  alt="Nick Fancher"
                  fill={true}
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div>
                <p className="b4">
                  <b className="font-medium">Get help</b> with printing your
                  artiece
                </p>
                <p className="b5 leading-tight">
                  Explore the posibilities with NFTs and prints
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:min-w-[400px] lg:max-w-[460px] mt-10 lg:mt-[120px] relative">
          <div className="w-full lg:sticky lg:top-[120px]">
            <div className="w-full h-[526px] bg-[#F0EDE4] flex justify-center items-center mb-4">
              <div className="bg-unveilWhite w-full max-w-[220px] h-[300px] border-[#3F3030] shadow p-0 relative">
                <Image
                  src={edition?.artwork?.media_url}
                  alt="Nick Fancher"
                  fill={true}
                  style={{ objectFit: "contain" }}
                  priority
                  className="relative"
                />
              </div>
            </div>
            <p className="text-center">{edition.artwork?.name}</p>
            <p className="text-unveilGrey text-center">
              {edition?.owner?.firstName} {edition?.owner?.lastName}
            </p>
          </div>
        </div>
        <MoreInfoPopIn open={paymentOpen} setOpen={setPaymentOpen} />
      </main>
    </>
  );
};

export default PrintNft;

export async function getServerSideProps({ params }) {
  const edition = await getEditionById(params.id);

  return {
    props: {
      edition,
    },
  };
}
