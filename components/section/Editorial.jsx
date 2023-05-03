import React from "react";

import Articles from "../reusable/Articles";
import Title from "../reusable/Title";
import Oneliner from "../reusable/Oneliner";

const Editorial = ({ data, editorial }) => {
  return (
    <section className="pt-[180px] ">
      <Title title={data.heading} />
      <div className=" px-[15px] md:px-10">
        <Oneliner text={data.description} />
        <Articles data={editorial} homePage={true} />
      </div>
    </section>
  );
};

export default Editorial;
