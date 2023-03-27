import React, { useState } from "react";
import { motion } from "framer-motion";

import MoreInfo from "../../components/svg/MoreInfo";

import { variantPopIn, variantBackground } from "../../utils/animations";
import Close from "../svg/Close";

const MoreInfoPopIn = ({ infoOpen, setInfoOpen }) => {
  return (
    <>
      <section className="fixed z-50 w-full h-screen overflow-hidden">
        <motion.div
          variants={variantPopIn}
          animate={infoOpen ? "ani" : "init"}
          initial="init"
          className="fixed  hidden overflow-y-scroll top-0 right-0 sm:top-5 sm:right-5 w-full sm:w-[380px]  bg-unveilWhite px-5 py-10 z-50 sm:rounded-[20px] h-screen sm:h-fit"
        >
          <div
            onClick={() => setInfoOpen(!infoOpen)}
            className="absolute top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
          >
            <div className="-translate-x-[1px]">
              <Close />
            </div>
          </div>
          <div className="">
            <p className="text-center b4 mt-[120px]">Artworks</p>
            <h3 className="text-center s2 mb-[80px]">Established</h3>
            <p className="s2">
              Professionals who have gained recognition for their exceptional
              artistic vision and photographic skills, and have typically built
              a career around their ability to capture and communicate a unique
              perspective through their photography.
            </p>
          </div>
        </motion.div>
        <motion.div
          onClick={() => setInfoOpen(!infoOpen)}
          variants={variantBackground}
          animate={infoOpen ? "ani" : "init"}
          initial="init"
          className="fixed top-0 left-0 hidden w-full h-screen bg-unveilGrey unveilTransition"
        ></motion.div>
      </section>
    </>
  );
};

export default MoreInfoPopIn;
