import React from "react";
import Animate from "@/components/reusable/Animate";
import Currency from "../svg/Currency";

const TwoBlockItems = ({ homePage = false, data }) => {
  return (
    <div
      className={`${
        homePage ? "grid-cols-2" : "grid-cols-1 mb-[60px]"
      } grid grid-cols-1 gap-[15px] mx-[15px] md:mx-10 md:grid-cols-2 relative`}
    >
      <Animate options={{ alpha: !homePage, y: 100 }}>
        <div
          className={`${
            homePage ? "aspect-[3/4]" : "aspect-square"
          }  bg-unveilGreen`}
        ></div>
        <span className="nft-print">{data[0].type}</span>
        <h5 className="pt-1 b3">{data[0].name}</h5>
        <p className="b3 opacity-60">{data[0].user_name}</p>
        <div className="flex items-center gap-1">
          <p className="b3 opacity-60">{data[0].price} (</p>
          <div className="scale-[1.3]">
            <Currency />
          </div>
          <p className="b3 opacity-60">1.2)</p>
        </div>
      </Animate>
      {homePage && (
        <div className="absolute top-0 block w-px h-full -translate-x-1/2 md:hidden bg-bgColorHover left-1/2"></div>
      )}
      <Animate options={{ alpha: !homePage, y: 50 }} className={`${homePage ? "md:mt-0 mt-[120px]" : ""}`}>
        <div
          className={`${
            homePage
              ? "aspect-[3/4] md:rounded-none rounded-t-full"
              : "aspect-square"
          }  bg-unveilGreen`}
        ></div>
        <span className="nft-print">{data[1].type}</span>
        <h5 className="pt-1 b3">{data[1].name}</h5>
        <p className="b3 opacity-60">{data[1].user_name}</p>
        <div className="flex items-center gap-1">
          <p className="b3 opacity-60">{data[1].europrice} (</p>
          <div className="scale-[1.3]">
            <Currency />
          </div>
          <p className="b3 opacity-60">{data[1].price})</p>
        </div>
      </Animate>
    </div>
  );
};

export default TwoBlockItems;
