import React from "react";

import Currency from "../svg/Currency";

const TwoBlockItems = () => {
  return (
    // TODO: homepage kleiner ander wel onder elkaar
    <div className="grid grid-cols-1 gap-[15px] mx-[15px] md:mx-10 md:grid-cols-2">
      <div>
        <div className="aspect-square bg-unveilGreen"></div>
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
      </div>
      <div>
        <div className="aspect-square bg-unveilGreen"></div>
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
      </div>
    </div>
  );
};

export default TwoBlockItems;
