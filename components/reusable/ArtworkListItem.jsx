import React from "react";

const ArtworkListItem = ({ i }) => {
  return (
    <div
      key={i}
      className="flex items-center justify-between border-b border-bgBlackOpacity"
    >
      <div className="flex items-center gap-4 md:gap-10">
        <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
        <div>
          <h4 className="mb-2 md:mb-0 s1">Blue Ocean</h4>
          <button className="block btn btn-secondary md:hidden">View</button>
        </div>
      </div>
      <button className="hidden btn btn-secondary md:block">View</button>
    </div>
  );
};

export default ArtworkListItem;
