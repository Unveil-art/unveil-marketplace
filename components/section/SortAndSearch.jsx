import React, { useState } from "react";
import { motion } from "framer-motion";

import Close from "../svg/Close";

const variantPopIn = {
  init: {
    x: "110%",
    transitionEnd: {
      display: "none",
    },
    transition: { duration: 1, ease: [0.58, 0, 0, 1] },
  },
  ani: {
    x: 0,
    display: "block",
    transition: { duration: 1, ease: [0.58, 0, 0, 1] },
  },
};
const variantBackground = {
  init: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
    transition: { duration: 1, ease: [0.58, 0, 0, 1] },
  },
  ani: {
    opacity: 1,
    display: "block",
    transition: { duration: 1, ease: [0.33, 0, 0, 1] },
  },
};

const SortAndSearch = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const handleOpen = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <section className="w-full h-screen overflow-hidden">
      <div
        onClick={() => handleOpen()}
        className="fixed cursor-pointer -translate-x-1/2 bg-unveilBlack w-fit bottom-10 left-1/2 py-[6px] px-5 rounded-full"
      >
        <p className="b4 text-unveilWhite">Search & Sort</p>
      </div>
      <motion.div
        variants={variantPopIn}
        animate={filterOpen ? "ani" : "init"}
        initial="init"
        className="fixed  hidden overflow-y-scroll top-0 right-0 sm:top-5 sm:right-5 w-full sm:w-[380px]  bg-unveilWhite px-5 py-10 z-50 sm:rounded-[20px] h-screen sm:h-fit"
      >
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
      </motion.div>
      <motion.div
        onClick={() => handleOpen()}
        variants={variantBackground}
        animate={filterOpen ? "ani" : "init"}
        initial="init"
        className="fixed top-0 left-0 hidden w-full h-screen bg-unveilGrey unveilTransition"
      ></motion.div>
    </section>
  );
};

export default SortAndSearch;
