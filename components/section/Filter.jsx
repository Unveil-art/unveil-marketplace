import React from "react";

const Filter = () => {
  return (
    <div className="ml-10 md:ml-[35svw] flex g justify-between pr-10">
      <div className="flex items-center gap-2 md:block">
        <p className="md:mb-3 b3 md:b4">Category</p>
        <div className="flex items-center gap-1">
          <span className="px-4 border rounded-full cursor-pointer l2 border-unveilBlack">
            Artworks
          </span>
          <span className="px-4 border rounded-full cursor-pointer l2 border-bgColor">
            Collections
          </span>
        </div>
      </div>
      <div className="hidden md:block">
        <p className="mb-3 b4">Artist</p>
        <div className="flex items-center gap-1">
          <span className="px-4 border rounded-full cursor-pointer l2 border-unveilBlack">
            Established
          </span>
          <span className="px-4 border rounded-full cursor-pointer l2 border-bgColor">
            Talent
          </span>
        </div>
      </div>
      <div className="hidden md:block">
        <p className="mb-3 b4">Medium</p>
        <div className="flex items-center">
          <span className="px-4 py-[0px] border rounded-l-[5px] cursor-pointer l2 border-unveilBlack">
            Digital
          </span>
          <span className="px-4 py-[0px] border rounded-r-[5px] cursor-pointer l2 border-bgColor">
            Print
          </span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
