import React from "react";

const TwoArticles = () => {
  return (
    <section className="py-[120px] border-b border-b-unveilDrakGray mb-10 px-[15px] md:px-10">
      <h2 className="s2 mb-[15px]">Continue reading</h2>
      <div className="grid grid-cols-2 gap-[15px] md:gap-10 border-t-[3px] border-t-unveilBlack pt-5">
        <div className="grid-cols-2 gap-5 md:grid">
          <div className="bg-bgColor aspect-[3/4] w-full"></div>
          <div className="flex flex-col justify-end ">
            <p className="mt-2 l2">Educate</p>
            <p className="mt-1 b3 opacity-60">
              Trying to define yourself is like trying to bite your own teeth
            </p>
          </div>
        </div>
        <div className="grid-cols-2 gap-5 md:grid">
          <div className="bg-bgColor rounded-t-full aspect-[3/4] w-full"></div>
          <div className="flex flex-col justify-end ">
            <p className="mt-2 l2">Educate</p>
            <p className="mt-1 b3 opacity-60">
              Trying to define yourself is like trying to bite your own teeth
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoArticles;
