import React from "react";
import Link from "next/link";

import Articles from "../reusable/Articles";
import Title from "../reusable/Title";
import Oneliner from "../reusable/Oneliner";

const Editorial = ({ data, editorial }) => {
  return (
    <section className="pt-[80px] md:pt-[120px] ">
      <Link href="/editorial">
        <Title title={data.heading} link />
      </Link>
      <Oneliner text={data.description} />
      <div className=" px-[15px] md:px-10">
        <Articles data={editorial} homePage={true} />
      </div>
    </section>
  );
};

export default Editorial;
