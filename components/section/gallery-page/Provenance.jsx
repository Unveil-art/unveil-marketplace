import React from "react";

const Provenance = () => {
  return (
    <section className="px-10 py-[100px]">
      <h2 className="mb-10 s1">Provenance</h2>
      <div className="gap-10 md:flex">
        <div className="w-full">
          <p className="block md:hidden b4 w-[180px] mb-10">
            <strong>About history</strong>
            <br />
            We believe transparency creates wealth we gain trust by our
            collectors by being transparent.
          </p>
          <div className="flex justify-between w-full gap-10 py-2 border-b-2 border-unveilBlack">
            <div className="hidden b4 md:flex">
              <p className="w-[150px]">Edition</p>
              <p>Transaction</p>
            </div>
            <p className="hidden md:block">To</p>
          </div>
          {[1, 1, 1, 1, 1, 1].map((item) => (
            <div className="justify-between gap-1 py-2 border-b md:flex md:border-t-0 last:border-none border-bgBlackOpacity2">
              <div className="md:flex">
                <p className="w-[150px] b3 md:l2">40x30 no 1/3 </p>
                <p className="b3 opacity-60">
                  jonbranson3210 bought from mackstokes.
                </p>
              </div>
              <p className="b3">€1300</p>
            </div>
          ))}
        </div>
        <button className="block mt-5 btn btn-secondary btn-full md:hidden">
          Show more
        </button>

        <div className="w-[130px] md:flex hidden items-end">
          <p className="b4">
            <strong>About history</strong>
            <br />
            We use blockchain technology to showcase the true history of
            artpieces
          </p>
        </div>
      </div>
    </section>
  );
};

export default Provenance;
