import React from "react";

import ProductCard from "../reusable/ProductCard";

const SearchBlockItems = () => {
  return (
    <section className="grid grid-cols-4 gap-10">
      {[1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
        <div key={index} className="">
          <ProductCard />
        </div>
      ))}
    </section>
  );
};

export default SearchBlockItems;
