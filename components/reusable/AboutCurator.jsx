import React from "react";

const AboutCurator = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="w-full aspect-square bg-bgColor"></div>
      <div className="relative bg-unveilBlack text-unveilWhite">
        <h3 className="pr-10 -rotate-90 -translate-x-[25%] translate-y-full h1 w-fit ">
          About
        </h3>
        <div className="w-[55%] pt-[100px] md:pt-0 pr-[15px] pb-10 ml-auto md:ml-0 md:absolute bottom-10 right-10  h-fit">
          <p>
            By <span className="l2">BASTIAAN WOUDT</span>{" "}
          </p>
          <h4 className="mt-5 mb-10 b2 md:h2">
            In my photography I operate on the border of fiction and non-fiction
            as.
          </h4>
          <div className="mb-5">
            <p className="py-1 border-b cursor-pointer b4 border-unveilWhite">
              3 Awards
            </p>
            <p className="py-1 border-b cursor-pointer b4 border-unveilWhite">
              3 Awards
            </p>
            <p className="py-1 border-b cursor-pointer b4 border-unveilWhite">
              3 Awards
            </p>
            <p className="py-1 cursor-pointer b4 border-unveilWhite">
              0x23874s873wn
            </p>
          </div>
          <button className="btn btn-secondary btn-full border-unveilWhite">
            Follow artist
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutCurator;
