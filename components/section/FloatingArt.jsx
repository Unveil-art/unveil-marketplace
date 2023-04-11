import React from "react";
import Link from "next/link";
import Image from "next/image";

const FloatingArt = ({ data }) => {
  return (
    <>
      <section className="h-[100svh] flex justify-center flex-col p-[15px] sm:p-10 relative">
        <div className="absolute -z-10 block top-[5%] left-[20%]">
          <div className="w-[70px] h-[89px] sm:w-[140px] sm:h-[180px] relative">
            <Image
              src={data.topleft.data.attributes.url}
              alt={data.topleft.data.attributes.alt}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <small className="hidden sm:block l2">{data.topleft_name}</small>
        </div>

        <div className="absolute -z-10 block bottom-[20%] sm:bottom-[5%] right-[10%] left-auto sm:left-[40%]">
          <div className="relative w-[70px] h-[89px] sm:w-[140px] sm:h-[180px]">
            <Image
              src={data.bottomleft.data.attributes.url}
              alt={data.bottomleft.data.attributes.alt}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <small className="hidden sm:block l2">{data.bottomleft_name}</small>
        </div>

        <div className="absolute -z-10 block top-[10%] sm:top-0 right-[4%] sm:right-auto sm:left-1/2">
          <div className="relative w-[136px] h-[184px] sm:w-[410px] sm:h-[500px]">
            <Image
              src={data.topright.data.attributes.url}
              alt={data.topright.data.attributes.alt}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <small className="hidden sm:block l2">{data.centerright_name}</small>
        </div>

        <div className="absolute -z-10 block bottom-[0] sm:bottom-[30%] left-0 sm:left-auto sm:right-0 sm:translate-y-1/2 translate-y-0">
          <div className="relative w-[174px] h-[249px] sm:w-[320px] sm:h-[422px]">
            <Image
              src={data.centerright.data.attributes.url}
              alt={data.centerright.data.attributes.alt}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <small className="hidden sm:block l2">{data.centerright_name}</small>
        </div>

        <h1 className="h3 max-w-[600px]">{data.heading}</h1>
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
