import React, { useState } from "react";
import { motion } from "framer-motion";

import { variantPopIn, variantBackground } from "../../utils/animations";

import Close from "../svg/Close";
import FilterPopIn from "../pop-in/FilterPopIn";

const SortAndSearch = () => {
  const [filterOpen, setFilterOpen] = useState(false);

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
      <FilterPopIn filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
    </section>
  );
};

export default SortAndSearch;
