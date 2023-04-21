import React from "react";

import Articles from "../reusable/Articles";
import Title from "../reusable/Title";
import Oneliner from "../reusable/Oneliner";

const Editorial = ({ data }) => {
  return (
    <section className="pt-[180px] px-[15px] md:px-10">
      <Title title={data.heading} />
      <Oneliner text={data.description} />
      <Articles data={data} />
    </section>
  );
};

export default Editorial;
