import React from "react";

import OneLiner from "../reusable/Oneliner";
import Title from "../reusable/Title";
import TwoBlockItems from "../reusable/TwoBlockItems";

const NewlyCurated = () => {
  return (
    <section className="pt-[180px] pb-[130px]">
      <Title title="Newly curated" />
      <OneLiner
        text="Artists worth viewing. Selected for ou by our curators."
        link="View collections"
        href="/gallery"
      />
      <TwoBlockItems />
    </section>
  );
};

export default NewlyCurated;
