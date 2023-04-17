import React from "react";
import Image from "next/image";

import Animate from "../reusable/Animate";
import Title from "../reusable/Title";
import Oneliner from "../reusable/Oneliner";

const Editorial = ({ data }) => {
  return (
    <section className="pt-[180px] px-[15px] md:px-10">
      <Title title={data.heading} />
      <Oneliner text={data.description} />
      <div className="relative grid grid-cols-2 gap-[15px] md:gap-10 md:grid-cols-4">
        <Animate options={{
          y: 175,
          alpha: true,
          delay: 'random'
        }} className="md:col-span-2">
          <div className="w-full aspect-[10/11] relative">
            <Image
              src={data.block[0].image.data.attributes.url}
              alt={data.block[0].image.data.attributes.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="md:text-center md:max-w-[400px] md:mx-auto mt-2 md:mt-10">
            <p className="b3 md:h2 md:opacity-80">{data.block[0].heading}</p>
            <p className="b3 opacity-60 mt-1 md:max-w-[230px] md:mx-auto">
              {data.block[0].description}
            </p>
          </div>
        </Animate>
        <div className="absolute top-0 hidden w-px h-full -translate-x-1/2 md:block bg-unveilDrakGray left-1/2"></div>
        <Animate options={{
          y: 175,
          alpha: true,
          delay: 'random'
        }} className="mt-[100px]">
          <div className="aspect-[3/4] md:rounded-none rounded-t-full relative">
            <Image
              src={data.block[1].image.data.attributes.url}
              alt={data.block[1].image.data.attributes.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="mx-auto mt-2">
            <p className=" b3">{data.block[1].heading}</p>
            <p className="mt-1 b3 opacity-60">{data.block[1].description}</p>
          </div>
        </Animate>
        <div className="md:block hidden absolute top-0 w-px h-full -translate-x-1/2 bg-unveilDrakGray right-[24%]"></div>
        <div>
          <Animate options={{
            y: 175,
            alpha: true,
            delay: 'random'
          }}>
            <div className="aspect-[3/4] md:rounded-t-full relative overflow-hidden">
              <Image
                src={data.block[2].image.data.attributes.url}
                alt={data.block[2].image.data.attributes.alt}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="mx-auto mt-2">
              <p className=" b3">{data.block[2].heading}</p>
              <p className="mt-1 b3 opacity-60">{data.block[2].description}</p>
            </div>
          </Animate>
          <Animate options={{
            y: 175,
            alpha: true,
            delay: 'random'
          }} className="md:block hidden mt-[100px]">
            <div className="aspect-[3/4] relative">
              <Image
                src={data.block[3].image.data.attributes.url}
                alt={data.block[3].image.data.attributes.alt}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="mx-auto mt-2">
              <p className=" b3">{data.block[3].heading}</p>
              <p className="mt-1 b3 opacity-60">{data.block[3].description}</p>
            </div>
          </Animate>
        </div>
        <div className="md:hidden block mt-[100px]">
          <div className="aspect-[3/4] relative">
            <Image
              src={data.block[3].image.data.attributes.url}
              alt={data.block[3].image.data.attributes.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="mx-auto mt-2">
            <p className=" b3">{data.block[3].heading}</p>
            <p className="mt-1 b3 opacity-60">{data.block[3].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Editorial;
