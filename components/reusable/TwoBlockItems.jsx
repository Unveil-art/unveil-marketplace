import React, { useEffect, useState } from "react";
import { getCurrentExchangeRateETHUSD } from "lib/backend";
import TwoBlockItem from "./TwoBlockItem";

const TwoBlockItems = ({ items }) => {
  const [frameObj, setFrameObj] = useState([]);

  // useEffect(() => {
  //   items.forEach((item) => {
  //     let arr = item.frame[0].split(", ");

  //     let frameObject = {
  //       frame: "",
  //       size: "",
  //       color: "",
  //       border: "",
  //     };
  //     if (artwork.edition_type !== "NFT_Only") {
  //       setFrameObj() = {
  //         frame: arr[0],
  //         size: arr[1],
  //         color: arr[2].split(" ")[0],
  //         border: arr[3].split(" ")[2],
  //       };
  //   })
  // })

  return (
    <div className="px-[15px] my-5 md:my-10 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-[15px] md:gap-5">
      {items.map((item, i) => (
        <TwoBlockItem item={item} key={i} i={i} />
      ))}
    </div>
  );
};

export default TwoBlockItems;
