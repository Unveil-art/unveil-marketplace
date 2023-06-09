import React from "react";

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
}) => {
  return (
    <div>
      <div className="flex items-center gap-1">
        <p className="font-[500] b3">Choose your Payment Method</p>
        <div
          onClick={() => setPaymentOpen(!paymentOpen)}
          className="cursor-pointer"
        >
          <MoreInfo />
        </div>
      </div>
      <div
        onClick={() => {
          setPayment("Creditcard");
          setStep(2);
        }}
        className="relative cursor-pointer text-center btn btn-primary btn-full btn-lg my-[10px]"
      >
        <p>Creditcard</p>
        <div className="flex items-center gap-[10px] top-1/2 right-5 -translate-y-1/2 absolute">
          <Mastercard />
          <Visa />
        </div>
      </div>
      <div
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
      </div>
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
      <div className="py-2 mt-5 mb-5 border-t lg:mb-20 lg:mt-10 border-bgColorHover">
        <Chat
          chatBtn={true}
          btnDesktop={true}
          title="Get help with payment"
          text="Explore the possibilities with NFTs and prints"
        />
      </div>
      <p className="font-[500] b3 mb-[15px] lg:mb-[30px]">
        About Maha 3 (NFT backed by print, edition 1 of 1)
      </p>
      <div className="grid grid-cols-2 gap-y-1 gap-x-5">
        <div className="rounded-[10px] hover:border-unveilBlack  border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
          <p className="b5">Creator address</p>
          <p className="truncate b4">0xB365AA6973...</p>
        </div>
        <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
          <p className="b5">Royalties</p>
          <p className="truncate b4">15% first 12 months, 7,5% </p>
        </div>
        <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
          <p className="b5">Token ID</p>
          <p className="truncate b4">#2304</p>
        </div>
        <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
          <p className="b5">Dimensions</p>
          <p className="truncate b4">100x150</p>
        </div>
        <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
          <p className="b5">Blockchain</p>
          <p className="truncate b4">Polygon</p>
        </div>
        <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
          <p className="b5">Frame</p>
          <p className="truncate b4">Not included in price</p>
        </div>
        <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
          <p className="b5">Token standard</p>
          <p className="truncate b4">ERC-721</p>
        </div>
        <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
          <p className="b5">Print technique</p>
          <p className="truncate b4">Archival Pigment Print</p>
        </div>
        <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full ">
          <p className="b5">Platform fee</p>
          <p className="truncate b4">2,5%</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelect;
