import React from "react";
import Link from "next/link";

const FloatingArt = () => {
  return (
    <>
      <section className="h-[100svh] flex justify-center flex-col p-[15px] sm:p-10 relative">
        <div className="absolute -z-10 block top-[5%] left-[20%]">
          <div className="bg-unveilGreen w-[70px] h-[89px] sm:w-[140px] sm:h-[180px]"></div>
          <small className="hidden sm:block l2">Batiaan Woudt</small>
        </div>

        <div className="absolute -z-10 block bottom-[20%] sm:bottom-[5%] right-[10%] left-auto sm:left-[40%]">
          <div className="bg-unveilGreen w-[70px] h-[89px] sm:w-[140px] sm:h-[180px]"></div>
          <small className="hidden sm:block l2">Batiaan Woudt</small>
        </div>

        <div className="absolute -z-10 block top-[10%] sm:top-0 right-[4%] sm:right-auto sm:left-1/2">
          <div className="bg-unveilGreen w-[136px] h-[184px] sm:w-[410px] sm:h-[500px]"></div>
          <small className="hidden sm:block l2">Batiaan Woudt</small>
        </div>

        <div className="absolute -z-10 block bottom-[0] sm:bottom-[30%] left-0 sm:left-auto sm:right-0 sm:translate-y-1/2 translate-y-0">
          <div className="bg-unveilGreen w-[174px] h-[249px] sm:w-[320px] sm:h-[422px]"></div>
          <small className="hidden sm:block l2">Batiaan Woudt</small>
        </div>

        <h1 className="h3 max-w-[600px]">
          Collect photography. Empower artists.
        </h1>
        <div className="flex gap-[10px] mt-5 md:mt-10">
          <Link href="">
            <button className="btn btn-primary">Start collecting</button>
          </Link>
          <Link href="">
            <button className="btn btn-secondary">Request access</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default FloatingArt;
