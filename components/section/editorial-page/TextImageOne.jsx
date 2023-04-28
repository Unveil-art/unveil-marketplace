import Title from "@/components/reusable/Title";
import React from "react";

const TextImageOne = ({ data, title }) => {
  return (
    <section className="grid grid-cols-1 mb-10 md:my-20 md:grid-cols-5">
      <div className="w-full md:col-span-3 ">
        <div className="w-full bg-bgColor aspect-[10/11]">
          <img
            src={data.Image.data.attributes.url}
            alt={data.Image.data.attributes.alt}
          />
        </div>
        <div className="md:bg-[#D9D9D9] md:py-20 md:text-center text-left px-[15px] py-2 b3 md:l2">
          <p>caption</p>
        </div>
      </div>
      <div className="md:col-span-2">
        <div className="block mt-10 mb-20 md:hidden">
          <Title title={title} />
        </div>
        <p className="md:max-w-[350px] leading-[110%] px-[15px] ml-[100px] md:ml-[60px] s2 drop-cap">
          {data.Text}
        </p>
      </div>
    </section>
  );
};

export default TextImageOne;
