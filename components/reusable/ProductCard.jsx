import React from "react";

import Currency from "../svg/Currency";

const ProductCard = ({ rounded = false }) => {
  return (
    <div className="[&:nth-child(3)]:mt-[120px]">
      <div
        className={`${
          rounded ? "rounded-t-full" : ""
        } bg-unveilGreen aspect-[3/4] mb-1`}
      ></div>
      <span className=" nft-print">nft + print</span>
      <h5 className="b3">Artwork Name</h5>
      <p className="b3 opacity-60">Alexander Sporre</p>
      <div className="flex items-center gap-1">
        <p className="b3 opacity-60">€1200 (</p>
        <div className="scale-[1.1] md:scale-[1.3]">
          <Currency />
        </div>
        <p className="b3 opacity-60">1.2)</p>
      </div>
    </div>
  );
};

export default ProductCard;
