import React from "react";

import OneLiner from "../reusable/Oneliner";
import Title from "../reusable/Title";
import TwoBlockItems from "../reusable/TwoBlockItems";

const NewlyCurated = ({ data }) => {
  return (
    <section className="pt-10 md:pt-[180px] pb-[130px]">
      <Title title={data.heading} />
      <OneLiner text={data.description} />
      <TwoBlockItems homePage={true} data={data.block} />
    </section>
  );
};

export default NewlyCurated;
