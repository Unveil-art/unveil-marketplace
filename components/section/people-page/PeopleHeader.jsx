import React from "react";

const PeopleHeader = () => {
  return (
    <section className="ml-[40px] md:ml-[35svw] pr-[15px] md:mt-0 mt-[20px] md:pr-[40px]">
      <p className="s2 my-[60px] md:block hidden ">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quia
        beatae. Consequuntur pariatur incidunt minima aperiam cupiditate libero
        rerum autem voluptatum earum officiis, sunt non in repudiandae aliquid
        alias nisi.
      </p>
      <div className="justify-between md:flex">
        <div>
          <div className="flex gap-[15px] w-full justify-between md:justify-start">
            <div className="min-w-[90px]">
              <p className="b4">Followers</p>
              <p className="text-[27px]">72</p>
            </div>
            <div className="w-px h-10 bg-unveilGreen"></div>
            <div className="min-w-[90px]">
              <p className="b4">Sold artworks</p>
              <p className="text-[27px]">21</p>
            </div>
            <div className="w-px h-10 bg-unveilGreen"></div>
            <div className="">
              <p className="b4">unique collectors</p>
              <p className="text-[27px]">58</p>
            </div>
          </div>
          <button className="mt-[10px] btn btn-full btn-secondary">
            Follow
          </button>
        </div>
        <div className="w-full md:w-[240px] xl:w-[300px] mt-[10px]">
          <p className="py-[2px] cursor-pointer my-1 border-b border-unveilGreen b3 md:b4">
            @alecandersporre, Amsterdam (NL)
          </p>
          <p className="py-[2px] cursor-pointer my-1 border-b border-unveilGreen b3 md:b4">
            45/15 endorsements
          </p>
          <p className="py-[2px] cursor-pointer my-1  b3 md:b4">
            0x2312313-9213-13
          </p>
          <p className="py-[2px] cursor-pointer my-1 b4 md:b5">
            Verified artist
          </p>
        </div>
      </div>
    </section>
  );
};

export default PeopleHeader;
