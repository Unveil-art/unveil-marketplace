import React, { useEffect, useState } from "react";

import MoreInfo from "@/components/svg/MoreInfo";
import Mastercard from "@/components/svg/Mastercard";
import Visa from "@/components/svg/Visa";
import MetaMask from "@/components/svg/MetaMask";
import Ideal from "@/components/svg/Ideal";
import Chat from "@/components/reusable/Chat";
import MoreInfoPopIn from "@/components/pop-in/MoreInfoPopIn";
import { setConfig } from "next/config";

const PaymentSelect = ({
  paymentOpen,
  setPaymentOpen,
  setPayment,
  setStep,
  artwork,
  index,
}) => {
  // More info pop-in states
  const [curator, setCurator] = useState(false);
  const [royalties, setRoyalties] = useState(false);
  const [blockchain, setBlockchain] = useState(false);
  const [tokenStandard, setTokenStandard] = useState(false);
  const [tokenId, setTokenId] = useState(false);
  const [platform, setPlatform] = useState(false);

  function checkEditionType(edition_type) {
    let message;

    switch (edition_type) {
      case "NFT_Only":
        message = "NFT";
        break;
      case "Print_only":
        message = "Print";
        break;
      case "NFT_Backed_by_print":
        message = "NFT backed by print";
        break;
      default:
        message = "NFT";
    }

    return message;
  }

  return (
    <div>
      <div className="flex items-center gap-1 mb-[15px] lg:mb-[30px] pt-10">
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
          setStep(2);
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
      {/* <div
        onClick={() => {
          setPayment("iDeal");
          setStep(2);
        }}
        className="relative cursor-pointer text-center btn btn-secondary btn-full btn-lg my-[10px]"
      >
        <p>iDeal</p>
        <div className="flex items-center gap-[10px] top-1/2 right-5 -translate-y-1/2 absolute">
          <Ideal />
        </div>
      </div> */}
      <div
        onClick={() => {
          setPayment("Wallet");
          setStep(2);
        }}
        className="relative cursor-pointer text-center btn btn-secondary btn-full btn-lg md:my-[5px]"
      >
        <p>Wallet</p>
        <div className="flex items-center gap-[10px] top-1/2 right-5 -translate-y-1/2 absolute">
          <MetaMask />
          <img src="/images/t.png" alt="T" />
        </div>
      </div>
      <div className="pt-[15px] md:pt-[30px] mt-[15px] md:mt-[30px] mb-5 border-t lg:mb-20 lg:mt-10 border-bgColorHover">
        <Chat
          chatBtn={true}
          btnDesktop={true}
          title="Get help with payment"
          text="Explore the possibilities with NFTs and prints"
        />
      </div>
      {artwork && (
        <>
          <p className="font-[500] mt-10 b3 mb-[15px] lg:mb-[30px]">
            About {artwork.name} ({checkEditionType(artwork.edition_type)},
            edition {index + 1} of {artwork.editions.length})
          </p>
          <div className="grid grid-cols-2 gap-y-[5px] gap-x-5">
            <div
              onClick={() => setCurator((prev) => !prev)}
              className="rounded-[10px]  hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full  cursor-pointer"
            >
              <p className="b5 leading-[23px]">Creator address</p>
              <p className="truncate b3 !text-[13px] leading-normal md:b4 w-[130px]">
                {artwork.owner.walletAddress.toLowerCase().slice(0, 4)}...
                {artwork.owner.walletAddress.toLowerCase().slice(-4)}
              </p>
            </div>
            <div
              onClick={() => setRoyalties((prev) => !prev)}
              className="rounded-[10px] cursor-pointer unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full "
            >
              <p className="b5">Royalties</p>
              <p className="truncate b4">
                {artwork.royalties[0]?.percentage}%
                {artwork.royalties[1]?.percentage &&
                  `, ${artwork.royalties[1]?.percentage}%`}
              </p>
            </div>

            {artwork.token_id && (
              <div
                onClick={() => setTokenId((prev) => !prev)}
                className="rounded-[10px] cursor-pointer unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full "
              >
                <p className="b5">Token ID</p>
                <p className="truncate b4">#{artwork.token_id}</p>
              </div>
            )}
            {artwork.edition_type !== "NFT_Only" && (
              <div className="rounded-[10px] cursor-pointer hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px]">
                <p className="b5 leading-[23px]">Dimensions</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  {artwork.size.map((item, i) => (
                    <span key={i}>
                      {item}
                      {i < artwork.size.length - 1 && <>, </>}
                    </span>
                  ))}
                </p>
              </div>
            )}

            <div
              onClick={() => setBlockchain((prev) => !prev)}
              className="rounded-[10px] cursor-pointer unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full "
            >
              <p className="b5">Blockchain</p>
              <p className="truncate b4">Ethereum</p>
            </div>
            {artwork.edition_type !== "NFT_Only" && (
              <div className="rounded-[10px] cursor-pointer unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
                <p className="b5">Frame</p>
                <p className="truncate b4">.</p>
              </div>
            )}
            <div
              onClick={() => setTokenStandard((prev) => !prev)}
              className="rounded-[10px] cursor-pointer unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full "
            >
              <p className="b5">Token standard</p>
              <p className="truncate b4">ERC-721</p>
            </div>
            {artwork.edition_type !== "NFT_Only" && (
              <div className="rounded-[10px] cursor-pointer unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
                <p className="b5">Print technique</p>
                <p className="truncate b4">.</p>
              </div>
            )}
            <div
              onClick={() => setPlatform((prev) => !prev)}
              className="rounded-[10px] cursor-pointer unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full "
            >
              <p className="b5">Platform fee</p>
              <p className="truncate b4">10%</p>
            </div>
          </div>
        </>
      )}
      {/* Curator pop-in */}
      <MoreInfoPopIn
        open={curator}
        setOpen={setCurator}
        subtitle="Curator address"
        title={`${artwork.owner.walletAddress
          .toLowerCase()
          .slice(0, 4)}...${artwork.owner.walletAddress
          .toLowerCase()
          .slice(-4)}`}
        text={`${artwork.owner.walletAddress} is the address which is the address of the curator`}
      />

      {/* Royalties pop-in */}
      <MoreInfoPopIn
        open={royalties}
        setOpen={setRoyalties}
        subtitle="Curator royalty"
        text="In the world of NFTs, royalties are a way for artists to earn a percentage of the sales each time their artwork is resold to a new collector. Unlike traditional art sales, where artists typically only benefit from the initial sale, NFTs allow artists to continue receiving compensation as their work increases in value over time. This unique feature ensures ongoing recognition and rewards for artists as their creations become more popular in the digital art market. At Unveil, we go a step further by giving artists the option to set two different royalty percentages, discouraging immediate resale and fostering a more meaningful relationship between artists and collectors. This approach promotes a fair and sustainable ecosystem that values the contributions of artists and supports their creative journey."
        title={`${artwork.royalties[0]?.percentage}%${
          artwork.royalties[1]?.percentage ? " | " : ""
        } ${artwork.royalties[1]?.percentage}${
          artwork.royalties[1]?.percentage ? "%" : ""
        } `}
      />

      {/* Royalties pop-in */}
      <MoreInfoPopIn
        open={royalties}
        setOpen={setRoyalties}
        subtitle="Curator royalty"
        text="In the world of NFTs, royalties are a way for artists to earn a percentage of the sales each time their artwork is resold to a new collector. Unlike traditional art sales, where artists typically only benefit from the initial sale, NFTs allow artists to continue receiving compensation as their work increases in value over time. This unique feature ensures ongoing recognition and rewards for artists as their creations become more popular in the digital art market. At Unveil, we go a step further by giving artists the option to set two different royalty percentages, discouraging immediate resale and fostering a more meaningful relationship between artists and collectors. This approach promotes a fair and sustainable ecosystem that values the contributions of artists and supports their creative journey."
        title={`${artwork.royalties[0]?.percentage}%${
          artwork.royalties[1]?.percentage ? " | " : ""
        } ${artwork.royalties[1]?.percentage}${
          artwork.royalties[1]?.percentage ? "%" : ""
        } `}
      />

      {/* Blockchain pop-in */}
      <MoreInfoPopIn
        open={blockchain}
        setOpen={setBlockchain}
        text="This is the blockchain of our smart contract."
        title="Ethereum"
        subtitle="Blockchain"
      />

      {/* Token id pop-in */}
      <MoreInfoPopIn
        open={tokenId}
        setOpen={setTokenId}
        text="This is the token ID of the edition."
        title={artwork?.token_id}
        subtitle="Token ID"
      />

      {/* Token pop-in */}
      <MoreInfoPopIn
        open={tokenStandard}
        setOpen={setTokenStandard}
        text="This is the token standard of our smart contract."
        title="ERC-721"
        subtitle="Token standard"
      />

      {/* Platform fee pop-in */}
      <MoreInfoPopIn
        open={platform}
        setOpen={setPlatform}
        text="This is the platform fee of our smart contract."
        title="10%"
        subtitle="Platform fee"
      />
    </div>
  );
};

export default PaymentSelect;
