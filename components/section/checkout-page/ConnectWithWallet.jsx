import Chat from "@/components/reusable/Chat";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getUserMe } from "lib/backend";
import React from "react";

const ConnectWithWallet = ({ setStep, email="" }) => {
  
  return (
    <>
      <h1 className="mt-5 h3 mb-[80px] lg:block hidden">Wallet connected</h1>
      <input
        type="email"
        defaultValue={email}
        className="mt-10 input"
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
      <hr />
      <div className="pt-[15px] md:pt-[30px] mt-[15px] md:mt-[30px] mb-10 border-t lg:mb-20 lg:mt-10 border-bgColorHover">
        <Chat
          title="Get help with payment"
          text="Explore the possibilities with NFTs and prints"
        />
      </div>
    </>
  );
};

export default ConnectWithWallet;
