import React from "react";

const AboutItem = () => {
  return (
    <section>
      <div className="mx-10 my-10 md:my-[80px]">
        <p className="mb-5 s1">About the collection</p>
        <h2 className="md:max-w-[60%] md:h2 b2 drop-cap">
          My photography I operate on the border of fiction and non-fiction as
          that is where I consider myself to be. A place where emotions and
          fragments of life collide into something almost tangible.{" "}
        </h2>
      </div>
      <div className="gap-10 px-[15px] md:px-10 py-5 my-5 overflow-auto md:flex-row flex-col flex flex-nowrap md:py-10 md:my-10">
        <div className="w-full md:w-auto md:min-w-[66%] md:max-w-[66%] flex-col md:flex-row flex gap-5 md:gap-10">
          <div className="ml-[80px] md:ml-0 w-[230px] md:w-[160px] b3 md:b4 order-2 md:order-1">
            <p>
              In this picture: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. In mollis dui sit amet nisi aliquet.
            </p>
            <div className="w-10 h-10 mt-5 overflow-hidden rounded-full md:mt-10 bg-bgColor"></div>
            <p className="mt-1 l2">Play soundbite</p>
          </div>
          <div className="w-full aspect-[4/3] bg-bgColor order-1 md:order-2"></div>
        </div>
        <div className="w-full md:w-auto md:min-w-[66%] md:max-w-[66%] flex-col md:flex-row flex gap-5 md:gap-10">
          <div className="ml-[80px] md:ml-0 w-[230px] md:w-[160px] b3 md:b4 order-2 md:order-1">
            <p className="">
              In this picture: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. In mollis dui sit amet nisi aliquet.
            </p>
          </div>
          <div className="w-full aspect-[4/3] bg-bgColor order-1 md:order-2"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutItem;
