import React from "react";

import OneLiner from "../reusable/Oneliner";
import Title from "../reusable/Title";
import TwoBlockHomeItems from "../reusable/TwoBlockHomeItems";
import ThreeBlockItems from "../reusable/ThreeBlockItems";
import TwoBlockItems from "../reusable/TwoBlockItems";
import ProductCard from "../reusable/ProductCard";
import TwoBlockItem from "../reusable/TwoBlockItem";

const NewlyCurated = ({ data, artworks }) => {
  return (
    <section className="pt-10 md:pt-[180px] pb-[130px]">
      <Title title={data.heading} />
      <OneLiner text={data.description} />
      <div className="grid mx-[15px] md:mx-10 gap-x-10 gap-y-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {artworks?.map((artwork, i) => (
          <ProductCard item={artwork} key={i} hasMargin={false} />
        ))}
      </div>
      {/* <TwoBlockHomeItems homePage={true} data={data.block} /> */}
    </section>
  );
};

export default NewlyCurated;
