import React from "react";
import Title from "../reusable/Title";
import Oneliner from "../reusable/Oneliner";

const Editorial = () => {
  return (
    <section className="pt-[180px] px-[15px] md:px-10">
      <Title title="Editorial" />
      <Oneliner
        text="Get inspired and learn."
        href="/journal"
        link="View journal"
      />
      <div className="relative grid grid-cols-2 gap-[15px] md:gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="w-full aspect-[10/11] bg-bgColor"></div>
          <div className="md:text-center md:max-w-[400px] md:mx-auto mt-2 md:mt-10">
            <p className="b3 md:h2 md:opacity-80">
              What determines the value of an Art piece
            </p>
            <p className="b3 opacity-60 mt-1 md:max-w-[230px] md:mx-auto">
              Groeneveld amassed dozens of interests he couldn&apos;t narrow
            </p>
          </div>
        </div>
        <div className="absolute top-0 hidden w-px h-full -translate-x-1/2 md:block bg-unveilDrakGray left-1/2"></div>
        <div className="mt-[100px]">
          <div className="aspect-[3/4] md:rounded-none rounded-t-full bg-bgColor"></div>
          <div className="mx-auto mt-2">
            <p className=" b3">What determines the value of an Art piece</p>
            <p className="mt-1 b3 opacity-60">
              Groeneveld amassed dozens of interests he couldn&apos;t narrow
            </p>
          </div>
        </div>
        <div className="md:block hidden absolute top-0 w-px h-full -translate-x-1/2 bg-unveilDrakGray right-[24%]"></div>

        <div>
          <div>
            <div className="aspect-[3/4] md:rounded-t-full bg-bgColor"></div>
            <div className="mx-auto mt-2">
              <p className=" b3">What determines the value of an Art piece</p>
              <p className="mt-1 b3 opacity-60">
                Groeneveld amassed dozens of interests he couldn&apos;t narrow
              </p>
            </div>
          </div>
          <div className="md:block hidden mt-[100px]">
            <div className="aspect-[3/4] bg-bgColor"></div>
            <div className="mx-auto mt-2">
              <p className=" b3">What determines the value of an Art piece</p>
              <p className="mt-1 b3 opacity-60">
                Groeneveld amassed dozens of interests he couldn&apos;t narrow
              </p>
            </div>
          </div>
        </div>
        <div className="md:hidden block mt-[100px]">
          <div className="aspect-[3/4] bg-bgColor"></div>
          <div className="mx-auto mt-2">
            <p className=" b3">What determines the value of an Art piece</p>
            <p className="mt-1 b3 opacity-60">
              Groeneveld amassed dozens of interests he couldn&apos;t narrow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Editorial;
