import { useRef, useState } from "react";
import { useAsideAnimation } from "@/hooks/animations/useAsideAnimation";
import Close from "../svg/Close";

const SortAndSearch = () => {
  const el = useRef();
  const [filterOpen, setFilterOpen] = useState(false);

  useAsideAnimation(el, filterOpen);

  const handleOpen = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <section className="fixed z-50 w-full h-screen overflow-hidden">
      <div
        onClick={() => handleOpen()}
        className="fixed cursor-pointer -translate-x-1/2 bg-unveilBlack w-fit bottom-[15px] left-1/2 py-[6px] px-5 rounded-full"
      >
        <p className="b4 text-unveilWhite">Search & Sort</p>
      </div>
      <div ref={el} className="fixed z-50 w-full h-screen overflow-hidden">
        <div className="gsap-el fixed overflow-y-scroll top-0 right-0 sm:top-5 sm:right-5 w-full sm:w-[380px]  bg-unveilWhite px-5 py-10 z-50 sm:rounded-[20px] h-screen sm:h-fit">
          <div
            onClick={() => handleOpen()}
            className="absolute top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
          >
            <div className="-translate-x-[1px]">
              <Close />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="b4 block pb-[10px]">Category</label>
              <div className="grid grid-cols-2">
                <div className="w-full py-7 border cursor-pointer rounded-l-[10px] border-unveilBlack">
                  <p className="mx-auto w-fit b3">Artworks</p>
                </div>
                <div className="w-full py-7 border cursor-pointer rounded-r-[10px] border-l-0 border-unveilBlack">
                  <p className="mx-auto w-fit b3">Collections</p>
                </div>
              </div>
            </div>
            <div>
              <label className="b4 block pb-[10px]">Medium</label>
              <div className="grid grid-cols-2">
                <div className="w-full py-7 border cursor-pointer rounded-tl-[10px] border-unveilBlack">
                  <p className="mx-auto w-fit b3">All</p>
                </div>
                <div className="w-full py-7 border cursor-pointer rounded-tr-[10px] border-l-0 border-unveilBlack">
                  <p className="mx-auto w-fit b3">Collections</p>
                </div>
                <div className="w-full py-7 border cursor-pointer rounded-bl-[10px] border-t-0 border-unveilBlack">
                  <p className="mx-auto w-fit b3">Collections</p>
                </div>
                <div className="w-full py-7 border cursor-pointer rounded-br-[10px] border-l-0 border-t-0 border-unveilBlack">
                  <p className="mx-auto w-fit b3">Collections</p>
                </div>
              </div>
            </div>
            <div>
              <label className="b4 block pb-[10px]">Sort (ascending)</label>
              <div className="grid grid-cols-2">
                <div className="w-full py-7 border cursor-pointer rounded-tl-[10px] border-unveilBlack">
                  <p className="mx-auto w-fit b3">Alphabetical</p>
                </div>
                <div className="w-full py-7 border cursor-pointer rounded-tr-[10px] border-l-0 border-unveilBlack">
                  <p className="mx-auto w-fit b3">Followers</p>
                </div>
                <div className="w-full py-7 border cursor-pointer rounded-bl-[10px] border-t-0 border-unveilBlack">
                  <p className="mx-auto w-fit b3">Trading volume</p>
                </div>
                <div className="w-full py-7 border cursor-pointer rounded-br-[10px] border-l-0 border-t-0 border-unveilBlack">
                  <p className="mx-auto w-fit b3">Newest</p>
                </div>
              </div>
            </div>
            <div>
              <label className="b4 block pb-[10px]">Sort (ascending)</label>
              <button className="mb-[6px] btn btn-secondary btn-full">
                Search
              </button>
              <button className="btn btn-primary btn-full">Apply filters</button>
              <button className="block mx-auto mt-5 underline decoration-1 underline-offset-2 l1">
                Reset filters
              </button>
            </div>
          </div>
        </div>
        <div
          onClick={() => handleOpen()}
          className="gsap-layer invisible fixed top-0 left-0 w-full h-screen bg-unveilGrey"
        ></div>
      </div>
    </section>
  );
};

export default SortAndSearch;
