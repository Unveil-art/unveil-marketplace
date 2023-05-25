import React from "react";

import Chat from "@/components/reusable/Chat";
import Ideal from "@/components/svg/Ideal";

const Payment = ({ payment }) => {
  return (
    <>
      <h1 className="mt-5 h3 mb-[80px]">Select {payment}</h1>
      {payment === "Creditcard" && (
        <>
          <input
            type="text"
            className="input"
            name="card-number"
            id="card-number"
            placeholder="Card number"
          />
          <div className="grid grid-cols-4 gap-[10px] mt-[10px]">
            <input
              type="text"
              className="col-span-2 input"
              name="name"
              id="name"
              placeholder="Name card holder"
            />
            <input
              type="text"
              className="input"
              name="month-year"
              id="month-year"
              placeholder="MM/YY"
            />
            <input
              type="text"
              className="input"
              name="cvc"
              id="cvc"
              placeholder="CVC"
            />
          </div>
          <div className="relative cursor-pointer text-center btn btn-primary btn-full btn-lg my-[10px]">
            <p>Pay now ($2218,08)</p>
          </div>
        </>
      )}
      {payment === "iDeal" && (
        <div className="relative cursor-pointer text-center btn btn-primary btn-full btn-lg my-[10px]">
          <p>Pay now ($2218,08)</p>
          <div className="flex items-center gap-[10px] top-1/2 right-5 -translate-y-1/2 absolute">
            <Ideal />
          </div>
        </div>
      )}
      {payment === "Wallet" && (
        <div className="relative cursor-pointer text-center btn btn-primary btn-full btn-lg my-[10px]">
          <p>Pay now ($2218,08)</p>
        </div>
      )}

      <div className="mt-10 mb-20">
        <Chat
          title="Get help with payment"
          text="Explore the possibilities with NFTs and prints"
        />
      </div>
    </>
  );
};

export default Payment;