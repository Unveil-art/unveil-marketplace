import React from "react";

const TextImageTwo = ({ data }) => {
  return (
    <section className="relative grid grid-cols-1 mb-10 md:my-20 md:grid-cols-5">
      <div className="order-2 md:col-span-2 md:order-1">
        <p className="md:max-w-[350px] sticky top-[32px] h-fit mt-10 leading-[110%] px-[15px] ml-[100px] md:ml-[40px] s2 drop-cap">
          {data.Text}
        </p>
      </div>
      <div className="order-1 w-full md:col-span-3 md:order-2">
        <div className="w-full sticky top-0 h-fit bg-bgColor aspect-[10/11]">
          <img
            src={data.Image.data.attributes.url}
            alt={data.Image.data.attributes.alt}
          />
        </div>
        {data.Caption && (
          <p className="mt-[15px] b4 hidden md:block">{data.Caption}</p>
        )}
      </div>
    </section>
  );
};

export default TextImageTwo;
