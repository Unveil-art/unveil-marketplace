import BigCheck from "@/components/svg/BigCheck";
import Link from "next/link";
import React from "react";

const Minted = ({ artwork }) => {
  return (
    <div className="fixed top-0 left-0 z-10 w-full h-screen grid-cols-2 md:grid bg-unveilBlack text-unveilWhite">
      <div className="hidden md:block"></div>
      <div className="flex items-center max-w-[700px] pr-10">
        <div className="flex flex-col items-center justify-between w-full h-screen p-10 pt[80px] md:h-fit md:block">
          <div>
            <div className="flex items-end gap-1 text-center md:gap-2">
              <div className="mb-2 scale-75 md:scale-100">
                <BigCheck />
              </div>
              <h1>Artwork</h1>
            </div>
            <h1>Collected</h1>
          </div>

          <Link href="/account">
            <button className="w-full mt-5 btn btn-white btn-lg">
              View NFT in Wallet
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Minted;
