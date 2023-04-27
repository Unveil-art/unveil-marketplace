import Arrow from "@/components/svg/Arrow";
import React from "react";

const Link = () => {
  return (
    <section className="md:flex my-10 md:my-20 border-t-[3px] border-b mx-[15px] md:mx-10 border-b-unveilDrakGray py-10 border-t-unveilBlack justify-between items-center">
      <div className="flex items-center gap-5">
        <div className="min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] md:min-w-[100px] md:min-h-[100px] md:max-w-[100px] md:max-h-[100px] bg-bgColor rounded-full"></div>
        <div>
          <h2 className="s1">
            Unlock Insider Access to the World of Photography
          </h2>
          <div className="flex items-center gap-5 mt-[15px] md:hidden">
            <Arrow />
            <a target="_blank" rel="noreferrer" href="" className="l2">
              Join our Discord
            </a>
          </div>
        </div>
      </div>
      <div className="items-center hidden gap-5 md:flex">
        <Arrow />
        <a target="_blank" rel="noreferrer" href="" className="l2">
          Join our Discord
        </a>
      </div>
    </section>
  );
};

export default Link;
