import React from "react";
import Animate from "@/components/reusable/animate";
import Currency from "../svg/Currency";

const TwoBlockItems = ({ homePage = false }) => {
  return (
    <div
      className={`${
        homePage ? "grid-cols-2" : "grid-cols-1 mb-[60px]"
      } grid grid-cols-1 gap-[15px] mx-[15px] md:mx-10 md:grid-cols-2 relative`}
    >
      <Animate options={{ y: 50 }}>
        <div
          className={`${
            homePage ? "aspect-[10/11]" : "aspect-square"
          }  bg-unveilGreen`}
        ></div>
        <span className="nft-print">nft + print</span>
        <h5 className="pt-1 b3">Artwork Name</h5>
        <p className="b3 opacity-60">Alexander Sporre</p>
        <div className="flex items-center gap-1">
          <p className="b3 opacity-60">€1200 (</p>
          <div className="scale-[1.3]">
            <Currency />
          </div>
          <p className="b3 opacity-60">1.2)</p>
        </div>
      </Animate>
      {homePage && (
        <div className="absolute top-0 block w-px h-full -translate-x-1/2 md:hidden bg-bgColorHover left-1/2"></div>
      )}
      <Animate options={{ y: 50 }} className={`${homePage ? "md:mt-0 mt-[120px]" : ""}`}>
        <div
          className={`${
            homePage
              ? "aspect-[10/11] md:rounded-none rounded-t-full"
              : "aspect-square"
          }  bg-unveilGreen`}
        ></div>
        <span className="nft-print">nft + print</span>
        <h5 className="pt-1 b3">Artwork Name</h5>
        <p className="b3 opacity-60">Alexander Sporre</p>
        <div className="flex items-center gap-1">
          <p className="b3 opacity-60">€1200 (</p>
          <div className="scale-[1.3]">
            <Currency />
          </div>
          <p className="b3 opacity-60">1.2)</p>
        </div>
      </Animate>
    </div>
  );
};

export default TwoBlockItems;
