import Partners from "@/components/reusable/Partners";
import React from "react";

const FeaturedIn = ({ data }) => {
  return (
    <section className="mt-5 mb-10">
      <div className="h-px w-[calc(100%-30px)] md:w-[calc(100%-80px)] mx-[15px] md:mx-10 bg-unveilDrakGray"></div>
      <h2 className="h3 md:mx-[38px] pt-5 mx-[15px] mb-[130px] md:mb-[180px]">
        Featured in
      </h2>
      <Partners data={data} />
    </section>
  );
};

export default FeaturedIn;