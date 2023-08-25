import React, { useContext, useEffect, useState } from "react";
import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";
import Loader from "@/components/svg/Loader";
import Image from "next/image";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  getArtworkById,
  getPrintRequestByID,
  getCurrentExchangeRateETHUSD,
  postTransaction,
  updateRequestStatus,
} from "lib/backend";
import { useRouter } from "next/router";
import { Web3Context, rpcUrl } from "@/contexts/Web3AuthContext";
import RPC from "lib/RPC";
import { MARKET_ABI, MARKET_CONTRACT_ADDRESS } from "lib/constants";

const PrintRequest = () => {
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [usdRate, setUsdRate] = useState(0);
  const [printRequest, setPrintRequest] = useState();
  const [artwork, setArtwork] = useState();
  const { provider } = useContext(Web3Context);
  const { value: wallet } = useLocalStorage("walletAddress");
  const { value: token } = useLocalStorage("token");
  const router = useRouter();

  const onSubmitForm = (e) => {
    e.preventDefault();
  };

  const init = async () => {
    setLoading(true);
    try {
      const requestData = await getPrintRequestByID(token, router.query.id);
      const artworkData = await getArtworkById(requestData.edition.artwork_id);
      setPrintRequest(requestData);
      setArtwork(artworkData);

      const res = await getCurrentExchangeRateETHUSD();
      setUsdRate(res.USD);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      init();
    }
  }, [token]);

  const handleConfirmDelivery = async () => {
    setCreating(true);

    try {
      if (provider) {
        const rpc = new RPC(provider);
        const contract = await rpc.getContract(
          MARKET_ABI,
          MARKET_CONTRACT_ADDRESS
        );
        let gas = await rpc.getGasPrice();

        const transaction = await contract.methods
          .ShipmentDelivered(
            artwork.contract_address,
            printRequest.edition.token_id,
            String(printRequest.edition.token_id)
          )
          .send({ from: wallet, gasPrice: gas });
        await postTransaction(token, {
          transaction_hash: transaction.transactionHash,
          amount: 0,
          currency: "ETH",
          transaction_type: "PRINT_DELIVERED",
          chain_link: rpcUrl,
          edition_id: printRequest.edition.id,
          artwork_id: artwork.id,
        });
        await updateRequestStatus(token, router.query.id, {
          status: "ShipmentDelivered",
        });
        showTopStickyNotification(
          "info",
          "Print Delivery verified sucessfully"
        );
        router.push("/account");
      } else {
        showTopStickyNotification("error", "Please Login Again");
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      let message = error.response?.data.message || error.message;
      showTopStickyNotification("error", message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="pb-[120px] px-[15px] md:px-10">
      {!loading ? (
        <div className="lg:flex justify-between gap-5">
          <div className="lg:flex justify-center w-full mt-[120px]">
            <div className="lg:max-w-2xl">
              <h1 className="lg:mb-20 mb-4">Your Print Order</h1>
              {printRequest.status === "ShipmentDelivered" && (
                <p className="s2 lg:mb-10 mb-8">
                  Print delivery is Confirmed from your end.
                </p>
              )}
              {printRequest.status === "Activated" && (
                <p className="s2 lg:mb-10 mb-8">
                  Good news! your print order is placed successfully. Please
                  Wait for Artist to get it confirmed.
                </p>
              )}
              {printRequest.status === "ArtistConfirmed" && (
                <p className="s2 lg:mb-10 mb-8">
                  The artist has confirmed your order. Please mark it as
                  delivered once you receive your order.
                </p>
              )}
              <div>
                <div>
                  <h2 className="b3 lg:mb-6 mb-3">Shipping info</h2>
                  <div className="w-full flex lg:mb-20 mb-10">
                    <div className="w-1/2">
                      <div className="mb-9 last:mb-0">
                        <h3 className="font-medium b3">Name</h3>
                        <p className="b3">
                          {printRequest?.firstName} {printRequest?.lastName}
                        </p>
                      </div>

                      <div className="mb-9 last:mb-0">
                        <h3 className="font-medium b3">Shipping Charge</h3>

                        <p className="b3">
                          $
                          {(printRequest?.shipping_charge * usdRate).toFixed(2)}{" "}
                          <span className="b4 text-unveilGrey">
                            ({printRequest?.shipping_charge} ETH)
                          </span>
                        </p>
                      </div>
                      <div className="mb-9 last:mb-0">
                        <h3 className="font-medium b3">Total Cost</h3>
                        <p className="b3">
                          ${(printRequest?.total_cost * usdRate).toFixed(2)}{" "}
                          <span className="b4 text-unveilGrey">
                            ({printRequest?.total_cost} ETH)
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="mb-9 last:mb-0">
                        <h3 className="font-medium b3">City</h3>
                        <p className="b3">{printRequest?.city}</p>
                      </div>
                      <div className="mb-9 last:mb-0">
                        <h3 className="font-medium b3">Country</h3>
                        <p className="b3">{printRequest?.country}</p>
                      </div>
                      <div className="mb-9 last:mb-0">
                        <h3 className="font-medium b3">Address</h3>
                        <p className="b3">{printRequest?.house_number}</p>
                      </div>
                    </div>
                  </div>
                  {printRequest.status === "ArtistConfirmed" && (
                    <div className="flex">
                      <button
                        className="w-1/2 btn btn-lg btn-secondary mr-5 disabled:cursor-not-allowed"
                        disabled={creating}
                        onClick={handleConfirmDelivery}
                      >
                        {creating ? (
                          <div className="h-[25px] animate-spin justify-center flex items-center">
                            <Loader />
                          </div>
                        ) : (
                          "Confirm Delivery"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:min-w-[400px] lg:max-w-[460px] mt-10 lg:mt-[120px] relative">
            {artwork && (
              <div className="w-full lg:sticky lg:top-[120px]">
                <div className="w-full h-[526px] bg-[#F0EDE4] flex justify-center items-center mb-4">
                  <div className="bg-unveilWhite w-full max-w-[220px] h-[300px] border-[#3F3030] shadow p-0 relative">
                    <Image
                      src={artwork?.media_url}
                      alt={artwork?.name}
                      fill={true}
                      style={{ objectFit: "contain" }}
                      priority
                      className="relative"
                    />
                  </div>
                </div>
                <p className="text-center">{artwork.name}</p>
                <p className="text-unveilGrey text-center">
                  {artwork.owner.firstName}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-screen mt-[120px]">
          <h1>Loading...</h1>
        </div>
      )}
    </main>
  );
};

export default PrintRequest;

export async function getServerSideProps({ params }) {
  return {
    props: {},
  };
}
