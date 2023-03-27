import React from "react";

import Currency from "../svg/Currency";

const About = ({ name, price, title, subheading, text, bg, releaseDate }) => {
  return (
    <section className="relative grid grid-cols-1 md:grid-cols-2 2xl:h-screen mt-[100px]">
      <div className="relative md:aspect-square aspect-[10/11] 2xl:aspect-auto bg-unveilGreen">
        {!releaseDate && (
          <div className="absolute bottom-2 left-[15px] w-[200px] bg-bgBlackOpacity border rounded-[10px] border-bgColorHover text-unveilWhite py-5 px-[15px] bg-blur">
            <p className="leading-tight b5">Artwork name</p>
            <h6 className="truncate text-[14px] md:text-[16px] b3">
              {name} {name}
            </h6>
            <div className="flex items-center gap-1">
              <p className="leading-tight b5">{price} (</p>
              <div className="scale-[1.3]">
                <Currency color="#F7F4ED" />
              </div>
              <p className="leading-tight b5">1.2)</p>
            </div>
          </div>
        )}
      </div>
      <div
        style={{ backgroundColor: bg }}
        className="relative p-[15px] pt-10 md:p-10 text-unveilWhite aspect-[10/11] md:aspect-auto"
      >
        <h2 className="h1 max-w-[75%] md:max-w-[90%]">{title}</h2>
        {releaseDate && (
          <h4 className="mt-5 s1 font-teodor">
            {releaseDate} - {name}
          </h4>
        )}
        <div className="absolute bottom-[60px] md:bottom-20 left-32 md:left-1/2 max-w-[310px]">
          <h5 className="l2">{subheading}</h5>
          <p className="pt-8 b3">{text}</p>
        </div>
      </div>

      {/* absolute label */}
      <span
        className="md:block hidden absolute -translate-x-1/2 -translate-y-1/2 border rounded-full border-unveilWhite top-1/2 left-1/2 text-unveilWhite l2 px-[10px] cursor-pointer"
        style={{ backgroundColor: bg }}
      >
        View Artwork
      </span>
    </section>
  );
};

export default About;
