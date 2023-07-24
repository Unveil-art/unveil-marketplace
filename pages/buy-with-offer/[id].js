import React, { useEffect, useState, useContext } from "react";
import {
  getOffer,
  getArtworkById,
  getCurrentExchangeRateETHUSD,
  updateSignature,
  acceptOffer,
  buyEdition,
  postTransaction,
} from "lib/backend";
import Image from "next/image";
import Web3 from "web3";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import { MARKET_ABI } from "lib/constants";
import { Web3Context } from "@/contexts/Web3AuthContext";
import RPC from "lib/RPC";

import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";
import Loader from "@/components/svg/Loader";
import { extractDate } from "lib/utils";

const Details = () => {
  const { provider, convertWei } = useContext(Web3Context);
  const { value: token } = useLocalStorage("token");
  const router = useRouter();

  const [offer, setOffer] = useState();
  const [artwork, setArtwork] = useState();
  const [price, setPrice] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [loading, setLoading] = useState(true);
  const [royalty, setRoyalty] = useState();

  const init = async () => {
    setLoading(true);
    try {
      const offerData = await getOffer(token, router.query.id);
      const artworkData = await getArtworkById(offerData.edition.artwork_id);

      if (offerData?.edition?.price) {
        const res = await getCurrentExchangeRateETHUSD();
        setPrice((res.USD * offerData?.amount).toFixed(2));
        setOriginalPrice((res.USD * offerData?.edition?.price).toFixed(2));
      }
      if (offerData?.status !== "ACCEPTED") router.push("/account");

      setOffer(offerData);
      setArtwork(artworkData);

      const royalties = artworkData.royalties;
      const isFutureDate =
        new Date(extractDate(royalties[0].to)).getTime() > Date.now();

      isFutureDate
        ? setRoyalty(royalties[0].percentage)
        : setRoyalty(royalties[1].percentage);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const percentageIncrease =
    (offer?.amount /
      (offer?.edition?.price === 0 ? 1 : offer?.edition?.price)) *
    100;

  const handleBuy = async () => {
    try {
      if (provider) {
        setLoading(true);
        // console.log(offer?.edition.edition_id);
        // const res = await buyEdition(token, offer?.edition.id);

        console.log(res);

        // await postTransaction(token, {
        //   transaction_hash: data.result.transactionHash,
        //   amount: parseFloat(edition.price.toFixed(4)),
        //   currency: "ETH",
        //   transaction_type: "MINT_EDITION",
        //   chain_link: rpcUrl,
        //   edition_id: edition.id,
        //   artwork_id: artwork.id,
        // });

        // showTopStickyNotification("info", "Offer accepted sucessfully");
        // router.push("/account");
      }
    } catch (error) {
      let message = error.response.data.message || error.message;
      showTopStickyNotification("error", message);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOffer = async () => {
    try {
      if (provider) {
        setCreating(true);
        const priceInWei = Web3.utils.toWei(offer.amount.toFixed(4));

        let rpc = new RPC(provider);
        let contract = await rpc.getContract(
          MARKET_ABI,
          process.env.NEXT_PUBLIC_MARKET_ADDRESS
        );

        const hash = await contract.methods
          .getHashMessage(
            artwork.contract_address,
            artwork.json_uri,
            priceInWei
          )
          .call(function (error, result) {
            console.log(result);
          });
        const signature = await rpc.signMessage(hash, wallet, "");

        const res = await updateSignature(
          token,
          { signature },
          offer.edition_id
        );

        await acceptOffer(token, offer.id);
        showTopStickyNotification("info", "Offer accepted sucessfully");
        router.push("/account");
      }
    } catch (error) {
      let message = error.response.data.message || error.message;
      showTopStickyNotification("error", message);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (token) {
      init();
    }
  }, [token]);

  return (
    <main className="pb-[120px] px-[15px] md:px-10">
      {offer ? (
        <div className="lg:flex justify-between gap-5">
          <div className="lg:flex justify-center w-full mt-[120px]">
            <div className="max-w-3xl">
              <h1 className="lg:mb-20 mb-4">Offer accepted</h1>
              <p className="s2 lg:mb-10 mb-8">
                Good news! the buyer has accepted your offer of ${price}.
              </p>
              <h2 className="b3 lg:mb-6 mb-3">Personal message</h2>
              <p className="b3 mb-8 lg:mb-10 max-w-[500px]">{offer?.message}</p>
              <div>
                <h2 className="b3 lg:mb-6 mb-3">Trade info</h2>
                <div className="w-full flex lg:mb-20 mb-10">
                  <div className="w-1/2">
                    <div className="mb-9 last:mb-0">
                      <h3 className="font-medium b3">Offer Price</h3>
                      <p className="b3">
                        ${price}{" "}
                        <span className="b4 text-unveilGrey">
                          ({(offer?.amount).toFixed(2)} ETH)
                        </span>
                      </p>
                    </div>

                    <div className="mb-9 last:mb-0">
                      <h3 className="font-medium b3">Original Price</h3>
                      <p className="b3">${originalPrice}</p>
                    </div>
                    <div className="mb-9 last:mb-0">
                      <h3 className="font-medium b3">Price increase</h3>
                      <p className="b3">{percentageIncrease.toFixed(2)}%</p>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="mb-9 last:mb-0">
                      <h3 className="font-medium b3">Artist royalty</h3>
                      <p className="b3">{royalty}%</p>
                    </div>
                    <div className="mb-9 last:mb-0">
                      <h3 className="font-medium b3">Platform fee</h3>
                      <p className="b3">2.5%</p>
                    </div>
                    <div className="mb-9 last:mb-0">
                      <h3 className="font-medium b3">Buyer name</h3>
                      <p className="b3">{offer?.sender?.firstName}</p>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <button
                    className="w-1/2 btn btn-lg btn-primary disabled:cursor-not-allowed"
                    onClick={handleBuy}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="h-[25px] animate-spin justify-center flex items-center">
                        <Loader color="#F7F4ED" />
                      </div>
                    ) : (
                      "Buy now"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:min-w-[400px] lg:max-w-[460px] mt-10 lg:mt-[120px] relative">
            <div className="w-full lg:sticky lg:top-[120px]">
              <div className="w-full h-[526px] bg-[#F0EDE4] flex justify-center items-center mb-4">
                <div className="bg-unveilWhite w-full max-w-[220px] h-[300px] border-[#3F3030] shadow p-0 relative">
                  {artwork && (
                    <Image
                      src={artwork?.media_url}
                      alt={artwork?.name}
                      fill={true}
                      style={{ objectFit: "contain" }}
                      priority
                      className="relative"
                    />
                  )}
                </div>
              </div>
              <p className="text-center">Artwork Name</p>
              <p className="text-unveilGrey text-center">Alexander Sporre</p>
            </div>
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

export default Details;

export async function getServerSideProps({ params }) {
  return {
    props: {},
  };
}
