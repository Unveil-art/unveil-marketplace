import React from "react";

const Minting = ({ artwork }) => {
  return (
    <div className="z-10 fixed h-screen w-full top-0 left-0 bg-[#9A8183] flex items-center justify-center">
      <div className="h-[100svh] relative w-full">
        <div>
          <div className="w-10 h-10 mx-auto border rounded-full border-unveilWhite"></div>
          <h1 className="text-center h4 mt-[10px] text-unveilWhite">
            Mint in progress...
          </h1>
          <p className="text-center b3 mt-[10px] text-unveilWhite">
            Your artwork is being minted and should complete shortly
          </p>
        </div>
        <button className="absolute -translate-x-1/2 opacity-50 cursor-not-allowed cursor btn btn-secondary btn-wide bottom-10 left-1/2">
          View on Etherscan
        </button>
      </div>
    </div>
  );
};

export default Minting;
