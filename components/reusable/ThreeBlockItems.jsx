import React from "react";

import Currency from "../svg/Currency";
import ProductCard from "./ProductCard";

const ThreeBlockItems = () => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-[15px] md:gap-[60px] px-[15px] md:px-10 mb-10 relative">
      <ProductCard />
      <div className="hidden md:block"></div>
      <ProductCard rounded={true} />
      <div className="absolute top-0 block w-px h-full -translate-x-1/2 bg-bgColorHover md:hidden left-1/2"></div>
      <ProductCard />
      <div className="block md:hidden"></div>
    </section>
  );
};

export default ThreeBlockItems;
