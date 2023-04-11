import React from "react";
import Image from "next/image";

import Currency from "../svg/Currency";

const CollectionDetails = ({ imageMargin, color, backgroundColor, data }) => {
  return (
    <div className="md:flex-row flex-col flex gap-[30px] relative">
      <div
        className={`${
          imageMargin ? "md:mb-10 md:ml-10" : ""
        } w-full md:w-[65svw] pr-10 md:pr-0`}
      >
        <div className="relative block w-full h-full">
          <img
            src={data.image.data.attributes.url}
            alt={data.image.data.attributes.alt}
          />
        </div>
      </div>
      <div className="md:ml-0 ml-10 md:mb-0 mb-[55px] sticky top-10 pb-10 left-0 h-fit">
        <h6
          className="w-fit rounded-full px-2 l2 mb-[10px] md:mb-[15px]"
          style={{ border: `solid 1px ${color}` }}
        >
          {data.status}
        </h6>
        <p className="s2 mb-[6px] md:mb-[15px]">03:02:22</p>
        <h3 className="h4">{data.name}</h3>
        <small className="b5">{data.price_heading}</small>
        <div className="flex items-center  mb-[15px]">
          <p className="b3">{data.price} (</p>
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
