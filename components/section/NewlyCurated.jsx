import React from "react";

import OneLiner from "../reusable/Oneliner";
import Title from "../reusable/Title";
import TwoBlockHomeItems from "../reusable/TwoBlockHomeItems";

const NewlyCurated = ({ data }) => {
  return (
    <section className="pt-10 md:pt-[180px] pb-[130px]">
      <Title title={data.heading} />
      <OneLiner text={data.description} />
      <TwoBlockHomeItems homePage={true} data={data.block} />
    </section>
  );
};

export default NewlyCurated;
