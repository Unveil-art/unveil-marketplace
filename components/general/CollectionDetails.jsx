import React from "react";

import Currency from "../svg/Currency";

const CollectionDetails = ({ imageMargin, color, backgroundColor }) => {
  return (
    <div className="md:flex-row flex-col flex gap-[30px] relative">
      <div
        className={`${
          imageMargin ? "md:mb-10 md:ml-10" : ""
        } w-full md:w-[65svw] aspect-square pr-10 md:pr-0`}
      >
        <div className="block w-full h-full bg-unveilGreen"></div>
      </div>
      <div className="md:ml-0 ml-10 md:mb-0 mb-[55px] sticky top-10 pb-10 left-0 h-fit">
        <h6
          className="w-fit rounded-full px-2 l2 mb-[10px] md:mb-[15px]"
          style={{ border: `solid 1px ${color}` }}
        >
          Live Drop
        </h6>
        <p className="s2 mb-[6px] md:mb-[15px]">03:02:22</p>
        <h3 className="h4">Collection name</h3>
        <small className="b5">Starting price (edition of 10)</small>
        <div className="flex items-center  mb-[15px]">
          <p className="b3">€1200 (</p>
          <Currency color={color} />
          <p className="b3">1.2)</p>
        </div>
        <button
          className="btn btn-primary"
          style={{ backgroundColor: color, color: backgroundColor }}
        >
          View collection
        </button>
      </div>
    </div>
  );
};

export default CollectionDetails;
