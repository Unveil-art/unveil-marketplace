import Chat from "@/components/reusable/Chat";
import React from "react";

const ConnectWithWallet = ({ setStep }) => {
  return (
    <>
      <h1 className="mt-5 h3 mb-[80px]">Wallet connected</h1>
      <input
        type="email"
        className="input"
        name="email"
        id="email"
        placeholder="Email"
      />
      <button
        onClick={() => setStep(3)}
        className="btn mt-[15px] btn-primary btn-full btn-lg"
      >
        Start buying
      </button>
      <div className="mt-10 mb-20">
        <Chat
          title="Get help with payment"
          text="Explore the possibilities with NFTs and prints"
        />
      </div>
    </>
  );
};

export default ConnectWithWallet;
