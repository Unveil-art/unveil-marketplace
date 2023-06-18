import React from "react";

import Chat from "@/components/reusable/Chat";
import Ideal from "@/components/svg/Ideal";

const Payment = ({ mint, payment, setStep, total }) => {
  return (
    <>
      <h1 className="mt-5 h3 mb-[80px] hidden lg:block">Select {payment}</h1>
      {payment === "Creditcard" && (
        <>
          <input
            type="text"
            className="mt-10 input"
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
          <div
            onClick={() => mint()}
            className="relative cursor-pointer text-center btn btn-primary btn-full btn-lg my-[10px]"
          >
            <p>Pay now (${total ? total : "0"})</p>
          </div>
        </>
      )}
      {payment === "iDeal" && (
        <div
          onClick={() => mint()}
          className="relative mt-10 cursor-pointer text-center btn btn-primary btn-full btn-lg my-[10px]"
        >
          <p>Pay now (${total ? total : "0"})</p>
          <div className="flex items-center gap-[10px] top-1/2 right-5 -translate-y-1/2 absolute">
            <Ideal />
          </div>
        </div>
      )}
      {payment === "Wallet" && (
        <div
          onClick={() => mint()}
          className="relative mt-10 cursor-pointer text-center btn btn-primary btn-full btn-lg my-[10px]"
        >
          <p>Pay now (${total ? total : "0"})</p>
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
