import React from "react";
import Link from "next/link";
import Image from "next/image";

const RequestAccess = ({ data }) => {
  return (
    <section className="grid w-full h-screen grid-cols-1 md:grid-cols-2">
      <div className="absolute w-full h-full -z-10">
        <div className="relative w-full h-full">
          <Image
            src={data.image.data.attributes.url}
            alt={data.image.data.attributes.alt}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="hidden md:block"></div>
      <div className="md:pl-0 pl-[40px] pr-[15px] md:pr-10">
        <h2 className="h3 pt-[60px] md:pt-[140px] max-w-[400px]">
          {data.banner_heading}
        </h2>
        <p className="mt-3 mb-3 md:mt-10 md:mb-10 b3 w-[90%] ">
          {data.banner_description}
        </p>
        <Link href={data.link}>
          <button className="block mb-3 btn btn-primary md:w-fit btn-full">
            Request access
          </button>
        </Link>
        <small className=" b4">{data.link_bottom_text}</small>
      </div>
    </section>
  );
};

export default RequestAccess;
