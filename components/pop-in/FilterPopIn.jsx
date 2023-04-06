import React from "react";
import { motion } from "framer-motion";

import {
  variantPopIn,
  variantBackground,
  variantCloseBtn,
} from "../../utils/animations";
import Close from "../svg/Close";

const FilterPopIn = ({ filterOpen, setFilterOpen }) => {
  return (
    <>
      <motion.div
        onClick={() => setFilterOpen(!filterOpen)}
        variants={variantCloseBtn}
        animate={filterOpen ? "ani" : "init"}
        initial="init"
        className="fixed z-[60] top-[30px] right-[30px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
      >
        <div className="-translate-x-[1px]">
          <Close />
        </div>
      </motion.div>
      <motion.div
        variants={variantPopIn}
        animate={filterOpen ? "ani" : "init"}
        initial="init"
        className="fixed hidden overflow-y-scroll right-[15px] top-[15px] md:top-5 md:right-5 w-[320px] sm:w-[380px] bg-unveilWhite px-5 py-10 z-50 rounded-[10px] md:rounded-[20px] h-[calc(100vh-30px)]"
      >
        {/* TODO: scrroll on desktop */}

        <div className="space-y-6">
          <div>
            <label className="b6 block pb-[10px]">Category</label>
            <div className="grid grid-cols-2">
              <div className="w-full py-8 border cursor-pointer rounded-l-[10px] border-unveilBlack">
                <p className="mx-auto w-fit b3">Artworks</p>
              </div>
              <div className="w-full py-8 border cursor-pointer rounded-r-[10px] border-l-0 border-unveilBlack">
                <p className="mx-auto w-fit b3">Collections</p>
              </div>
            </div>
          </div>
          <div>
            <label className="b6 block pb-[10px]">Medium</label>
            <div className="grid grid-cols-2">
              <div className="w-full py-8 border cursor-pointer rounded-tl-[10px] border-unveilBlack">
                <p className="mx-auto w-fit b3">All</p>
              </div>
              <div className="w-full py-8 border cursor-pointer rounded-tr-[10px] border-l-0 border-unveilBlack">
                <p className="mx-auto w-fit b3">Collections</p>
              </div>
              <div className="w-full py-8 border cursor-pointer rounded-bl-[10px] border-t-0 border-unveilBlack">
                <p className="mx-auto w-fit b3">Collections</p>
              </div>
              <div className="w-full py-8 border cursor-pointer rounded-br-[10px] border-l-0 border-t-0 border-unveilBlack">
                <p className="mx-auto w-fit b3">Collections</p>
              </div>
            </div>
          </div>
          <div>
            <label className="b6 block pb-[10px]">Sort (ascending)</label>
            <div className="grid grid-cols-2">
              <div className="w-full py-8 border cursor-pointer rounded-tl-[10px] border-unveilBlack">
                <p className="mx-auto w-fit b3">Alphabetical</p>
              </div>
              <div className="w-full py-8 border cursor-pointer rounded-tr-[10px] border-l-0 border-unveilBlack">
                <p className="mx-auto w-fit b3">Followers</p>
              </div>
              <div className="w-full py-8 border cursor-pointer rounded-bl-[10px] border-t-0 border-unveilBlack">
                <p className="mx-auto w-fit b3">Trading volume</p>
              </div>
              <div className="w-full py-8 border cursor-pointer rounded-br-[10px] border-l-0 border-t-0 border-unveilBlack">
                <p className="mx-auto w-fit b3">Newest</p>
              </div>
            </div>
          </div>
          <div>
            <label className="b6 block pb-[10px]">Sort (ascending)</label>
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
        onClick={() => setFilterOpen(!filterOpen)}
        variants={variantBackground}
        animate={filterOpen ? "ani" : "init"}
        initial="init"
        className="fixed top-0 left-0 hidden w-full h-screen bg-unveilGrey unveilTransition"
      ></motion.div>
    </>
  );
};

export default FilterPopIn;
