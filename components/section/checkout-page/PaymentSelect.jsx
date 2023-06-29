import React, { useEffect, useState } from "react";

import MoreInfo from "@/components/svg/MoreInfo";
import Mastercard from "@/components/svg/Mastercard";
import Visa from "@/components/svg/Visa";
import MetaMask from "@/components/svg/MetaMask";
import Ideal from "@/components/svg/Ideal";
import Chat from "@/components/reusable/Chat";

const PaymentSelect = ({
  paymentOpen,
  setPaymentOpen,
  setPayment,
  setStep,
  artwork,
}) => {
  // const [royalties, setRoyalties] = useState(artwork.royalties);
  // const [first, setFirst] = useState();
  // const [after, setAfter] = useState();
  // const [display, setDisplay] = useState();

  // useEffect(() => {
  //   if (royalties) {
  //     artwork.royalties.forEach((item) => {
  //       if (item.from.includes("First")) {
  //         setFirst(item.percentage);
  //       }
  //       if (item.from.includes("After")) {
  //         setAfter(item.percentage);
  //       }
  //     });
  //   }
  //   if (first && after) {
  //     setDisplay(`From ${firstPercentage}% to ${afterPercentage}%`);
  //   } else if (first) {
  //     setDisplay(`From ${firstPercentage}%`);
  //   } else if (after) {
  //     setDisplay(`To ${afterPercentage}%`);
  //   }
  // }, [artwork]);

  return (
    <div>
      <div className="flex items-center gap-1 mb-[15px] lg:mb-[30px] pt-10">
        <p className="font-[500] b3 ">Choose your Payment Method</p>
        <div
          onClick={() => setPaymentOpen(!paymentOpen)}
          className="cursor-pointer"
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
        className="relative cursor-pointer text-center btn btn-secondary btn-full btn-lg my-[10px]"
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
            About {artwork.name} (NFT backed by print, edition 1 of 1)
          </p>
          <div className="grid grid-cols-2 gap-y-[5px] gap-x-5">
            <div className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full  cursor-pointer">
              <p className="b5 leading-[23px]">Creator address</p>
              <p className="truncate b3 !text-[13px] leading-normal md:b4 w-[130px]">
                {artwork.owner.walletAddress.toLowerCase().slice(0,4)}...{artwork.owner.walletAddress.toLowerCase().slice(-4)}
              </p>
            </div>
            <div className="rounded-[10px] unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
              <p className="b5">Royalties</p>
              <p className="truncate b4">{artwork.royalties[0]?.percentage}%
                    {artwork.royalties[1]?.percentage && `, ${artwork.royalties[1]?.percentage}%`}</p>
            </div>
            <div className="rounded-[10px] unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
              <p className="b5">Token ID</p>
              <p className="truncate b4">#</p>
            </div>
            {artwork.edition_type !== "NFT_Only" && (
              <div className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px]">
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

            <div className="rounded-[10px] unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
              <p className="b5">Blockchain</p>
              <p className="truncate b4">Ethereum</p>
            </div>
            {artwork.edition_type !== "NFT_Only" && (
              <div className="rounded-[10px] unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
                <p className="b5">Frame</p>
                <p className="truncate b4">.</p>
              </div>
            )}
            <div className="rounded-[10px] unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
              <p className="b5">Token standard</p>
              <p className="truncate b4">ERC-721</p>
            </div>
            {artwork.edition_type !== "NFT_Only" && (
              <div className="rounded-[10px] unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
                <p className="b5">Print technique</p>
                <p className="truncate b4">.</p>
              </div>
            )}
            <div className="rounded-[10px] unveilTransition hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
              <p className="b5">Platform fee</p>
              <p className="truncate b4">10%</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentSelect;
