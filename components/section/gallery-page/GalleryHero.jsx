import React, { useState } from "react";
import Wishlist from "../../svg/Wishlist";
import OptionsPopIn from "@/components/pop-in/OptionsPopIn";

const GalleryHero = () => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-5">
        <div className="relative flex items-center justify-center md:col-span-3 bg-bgColor py-[120px]">
          <div className="w-[200px] aspect-[3/4] shadow"></div>
        </div>
        <div className="md:col-span-2 ">
          <div className="md:mb-[100px] my-10 md:mt-[180px] md:space-y-10 text-center px-[15px] md:pl-10 md:pr-5">
            <p className="pb-5 l2 md:pb-0">name</p>
            <h1>Title</h1>
            <p className="hidden md:block">From price</p>
            <div className="relative pt-10 md:pt-[100px] flex justify-between gap-5">
              <div className="md:space-y-[6px] w-full md:block grid grid-cols-2 gap-[6px]">
                <div className="rounded-[10px] border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <p className="b5">Collection</p>
                  <p className="truncate b4">Collectio name</p>
                </div>
                <div className="rounded-[10px] border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <p className="b5">Curator</p>
                  <p className="truncate b4">Curator name</p>
                </div>
                <div className="rounded-[10px] border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <p className="b5">Sold as</p>
                  <p className="truncate b4">Digital / Physical</p>
                </div>
                <div className="rounded-[10px] border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <p className="b5">Payment</p>
                  <p className="truncate b4">Payment methods</p>
                </div>
                <div className="rounded-[10px] border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <p className="b5">Available sizes</p>
                  <p className="truncate b4">Sized</p>
                </div>
                <div className="rounded-[10px] border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <p className="b5">Creator royalty</p>
                  <p className="truncate b4">Royalty %</p>
                </div>
                <div className="rounded-[10px] border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <p className="b5">Creator & royalty address</p>
                  <p className="truncate b4">Adress</p>
                </div>
                <div className="rounded-[10px] border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <p className="b5">Recognitions</p>
                  <p className="truncate b4">Awards</p>
                </div>
                <div className="rounded-[10px] col-span-2 md:justify-start justify-center items-center flex gap-2 h-[68px] border border-unveilBlack md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <Wishlist />
                  <p className="b4">Add to wishlist</p>
                </div>
              </div>
              <div className="md:block hidden w-[200px] border border-bgColorHover rounded-[10px] overflow-hidden sticky top-10 h-fit">
                <div className="lg:w-[calc(100%-40px)] 2xl:w-[calc(100%-64px)] aspect-[2/3] shadow2 lg:m-5 2xl:m-8 bg-bgColor"></div>
                <div
                  onClick={() => setOptionsOpen(!optionsOpen)}
                  className="py-2  uppercase cursor-pointer bg-unveilBlack text-unveilWhite l1 tracking-[0.18rem]"
                >
                  View options
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden relative flex items-center justify-center md:col-span-3 bg-bgColor py-[120px]">
          <div className="w-[200px] aspect-[3/4] shadow"></div>
          <div className="absolute rounded-[10px] bg-blur bottom-5 w-[200px] md:py-[8px] px-[12px] py-[6px] md:px-[16px] left-[15px] bg-blur">
            <p className="b4 text-unveilWhite">Unveil AR</p>
            <p className="b5 text-unveilWhite">View in Room</p>
          </div>
        </div>

        <div
          onClick={() => setOptionsOpen(!optionsOpen)}
          className="fixed bottom-0 left-0 flex w-full bg-unveilBlack md:hidden"
        >
          <div className="w-5 aspect-[3/4] bg-unveilGreen m-1"></div>
          <p className="text-unveilWhite text-center w-full l1 uppercase tracking-[0.18rem] py-2">
            View options
          </p>
        </div>
      </section>
      <OptionsPopIn optionsOpen={optionsOpen} setOptionsOpen={setOptionsOpen} />
    </>
  );
};

export default GalleryHero;
