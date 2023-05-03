import React from "react";

const Upcoming = ({ data }) => {
  return (
    <div className="ml-[15px] py-10 md:flex justify-between md:ml-[35svw] md:pr-[40px]">
      <div className="flex gap-[15px] justify-between md:justify-start">
        <div className="min-w-[90px]">
          <p className="b4">Artists</p>
          <p className="text-[27px]">{data.Artists}</p>
        </div>
        <div className="w-px h-10 bg-unveilGreen"></div>
        <div className="min-w-[90px]">
          <p className="b4">Artworks</p>
          <p className="text-[27px]">{data.Artworks}</p>
        </div>
        <div className="w-px h-10 bg-unveilGreen"></div>
        <div className="">
          <p className="b4">Release date</p>
          <p className="text-[27px]">{data.Release_date}</p>
        </div>
      </div>
      <div className="w-full md:w-[240px] xl:w-[300px]">
        <h5 className="text-[27px] b3 mb-5">New artists</h5>
        <p className="py-[2px] cursor-pointer my-1 border-y border-unveilGreen b3">
          Artist 1
        </p>
        <p className="py-[2px] cursor-pointer my-1 border-b border-unveilGreen b3">
          Artist 2
        </p>
        <p className="py-[2px] cursor-pointer my-1 b3">Artist 3</p>
      </div>
    </div>
  );
};

export default Upcoming;
