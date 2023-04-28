import React from "react";

const TextImageTwo = ({ data }) => {
  return (
    <section className="grid grid-cols-1 mb-10 md:my-20 md:grid-cols-5">
      <div className="order-2 md:col-span-2 md:order-1">
        <p className="md:max-w-[350px] mt-10 leading-[110%] px-[15px] ml-[100px] md:ml-[40px] s2 drop-cap">
          {data.Text}
        </p>
      </div>
      <div className="order-1 w-full md:col-span-3 md:order-2">
        <div className="w-full bg-bgColor aspect-[10/11]">
          <img
            src={data.Image.data.attributes.url}
            alt={data.Image.data.attributes.alt}
          />
        </div>
        <div className="md:bg-[#D9D9D9] md:py-20 md:text-center text-left px-[15px] py-2 b3 md:l2"></div>
        {data.Caption && (
          <p className="mt-[15px] b4 hidden md:block">{data.Caption}</p>
        )}
      </div>
    </section>
  );
};

export default TextImageTwo;
