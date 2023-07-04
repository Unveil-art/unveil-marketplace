import React from "react";

import Currency from "../svg/Currency";
import ProductCard from "./ProductCard";

const ThreeBlockItems = ({ items }) => {
  return (
    <section className="grid my-5 md:mt-10 grid-cols-2 md:grid-cols-4 gap-[15px] md:gap-[60px] px-[15px] md:px-10 mb-10 relative">
      {items[0] && <ProductCard item={items[0]} />}
      <div className="hidden md:block"></div>
      {items[1] && <ProductCard item={items[1]} rounded={true} />}
      <div className="absolute top-0 block w-px h-full -translate-x-1/2 bg-bgColorHover md:hidden left-1/2"></div>
      {items[2] && <ProductCard item={items[2]} />}
      <div className="block md:hidden"></div>
    </section>
  );
};

export default ThreeBlockItems;
