import React from "react";

const NFTsListItem = ({ i }) => {
  return (
    <div
      key={i}
      className="flex items-center justify-between border-b last:border-none border-bgBlackOpacity"
    >
      <div className="flex items-center gap-4 md:gap-10">
        <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
        <div className="flex justify-between gap-2 md:block">
          <div>
            <p className="b4 text-unveilGrey">Name</p>
            <h4 className="mb-2 md:mb-0 s1">Artwork name</h4>
          </div>
        </div>
      </div>
      <div>
        <p className="b4 text-unveilGrey">Price</p>
        <h4 className="mb-2 md:mb-0 s1">€1900 (+23%)</h4>
      </div>
      <div className="flex flex-col gap-1 md:flex-row">
        <button className=" btn btn-secondary">print</button>
        <button className=" btn btn-secondary">Show info</button>
      </div>
    </div>
  );
};

export default NFTsListItem;
