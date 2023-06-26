import React from "react";

import ProductCard from "../reusable/ProductCard";

const SearchBlockItems = ({ items }) => {
  return (
    <section className="grid grid-cols-2 gap-10 md:grid-cols-4">
      {items.map((item, i) => (
        <div className="" key={i}>
          <ProductCard item={item} />
        </div>
      ))}
    </section>
  );
};

export default SearchBlockItems;
