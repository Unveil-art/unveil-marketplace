import React from "react";
import Image from "next/image";

import Animate from "../reusable/Animate";
import Link from "next/link";

const Articles = ({ data, homePage = false }) => {
  return (
    <div className="relative grid grid-cols-2 gap-[15px] md:gap-10 md:grid-cols-4">
      {data[0] && (
        <Animate
          options={{
            y: 175,
            alpha: true,
            delay: "random",
          }}
          className={`md:col-span-2 ${!homePage ? "col-span-2" : ""}`}
        >
          <Link href={`/editorial/${data[0].attributes.slug}`}>
            <>
              <div
                className={`w-full aspect-[3/4] md:aspect-[10/11] relative ${
                  !homePage ? "!aspect-[10/11]" : ""
                }`}
              >
                {data[0].attributes.Image && (
                  <Image
                    src={data[0].attributes.Image.data.attributes.url}
                    alt={data[0].attributes.Image.data.attributes.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="md:text-center md:max-w-[400px] md:mx-auto mt-2 md:mt-10">
                <p className="b3 md:h2">{data[0].attributes.Title}</p>
                <p className="b3 opacity-60 md:max-w-[280px] mt-5 md:mx-auto">
                  {data[0].attributes.Description}
                </p>
              </div>
            </>
          </Link>
        </Animate>
      )}
      <div className="absolute top-0 hidden w-px h-full -translate-x-[150%] md:block bg-unveilDrakGray left-1/2"></div>
      {data[1] && (
        <Link href={`/editorial/${data[1].attributes.slug}`}>
          <Animate
            options={{
              y: 175,
              alpha: true,
              delay: "random",
            }}
            className="mt-[100px] h-fit md:sticky top-[32px]"
          >
            <div className="aspect-[3/4] md:rounded-none rounded-t-full relative">
              {data[1].attributes.Image && (
                <Image
                  src={data[1].attributes.Image.data.attributes.url}
                  alt={data[1].attributes.Image.data.attributes.alt}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            <div className="mx-auto mt-2">
              <p className=" b3">{data[1].attributes.Title}</p>
              <p className="mt-1 b3 opacity-60">
                {data[1].attributes.Description}
              </p>
            </div>
          </Animate>
        </Link>
      )}

      <div className="md:block hidden absolute top-0 w-px h-full -translate-x-1/2 bg-unveilDrakGray right-[24%]"></div>
      <div>
        {data[2] && (
          <Link href={`/editorial/${data[2].attributes.slug}`}>
            <Animate
              options={{
                y: 175,
                alpha: true,
                delay: "random",
              }}
            >
              <div className="aspect-[3/4] md:rounded-t-full relative overflow-hidden">
                {data[2].attributes.Image && (
                  <Image
                    src={data[2].attributes.Image.data.attributes.url}
                    alt={data[2].attributes.Image.data.attributes.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="mx-auto mt-2">
                <p className="b3">{data[2].attributes.Title}</p>
                <p className="mt-1 b3 opacity-60">
                  {data[2].attributes.Description}
                </p>
              </div>
            </Animate>
          </Link>
        )}
        {data[3] && (
          <Link href={`/editorial/${data[3].attributes.slug}`}>
            <Animate
              options={{
                y: 175,
                alpha: true,
                delay: "random",
              }}
              className="md:block hidden mt-[100px]"
            >
              <div className="aspect-[3/4] relative">
                {data[3].attributes.Image && (
                  <Image
                    src={data[3].attributes.Image.data.attributes.url}
                    alt={data[3].attributes.Image.data.attributes.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="mx-auto mt-2">
                <p className="b3">{data[3].attributes.Title}</p>
                <p className="mt-1 b3 opacity-60">
                  {data[3].attributes.Description}
                </p>
              </div>
            </Animate>
          </Link>
        )}
        {!homePage && data[4] && (
          <Link href={`/editorial/${data[4].attributes.slug}`}>
            <Animate
              options={{
                y: 175,
                alpha: true,
                delay: "random",
              }}
              className="md:block hidden mt-[100px]"
            >
              <div className="aspect-[3/4] relative">
                {data[4].attributes.Image && (
                  <Image
                    src={data[4].attributes.Image.data.attributes.url}
                    alt={data[4].attributes.Image.data.attributes.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="mx-auto mt-2">
                <p className="b3">{data[4].attributes.Title}</p>
                <p className="mt-1 b3 opacity-60">
                  {data[4].attributes.Description}
                </p>
              </div>
            </Animate>
          </Link>
        )}
      </div>
      {data[3] && (
        <Link href={`/editorial/${data[3].attributes.slug}`}>
          <Animate
            options={{
              y: 175,
              alpha: true,
              delay: "random",
            }}
            className="md:hidden block mt-[100px]"
          >
            <div className="aspect-[3/4] relative">
              {data[3].attributes.Image && (
                <Image
                  src={data[3].attributes.Image.data.attributes.url}
                  alt={data[3].attributes.Image.data.attributes.alt}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            <div className="mx-auto mt-2">
              <p className="b3">{data[3].attributes.Title}</p>
              <p className="mt-1 b3 opacity-60">
                {data[3].attributes.Description}
              </p>
            </div>
          </Animate>
        </Link>
      )}
      {!homePage && data[4] && (
        <Link href={`/editorial/${data[4].attributes.slug}`}>
          <Animate
            options={{
              y: 175,
              alpha: true,
              delay: "random",
            }}
            className="block md:hidden"
          >
            <div className="aspect-[3/4] relative">
              {data[4].attributes.Image && (
                <Image
                  src={data[4].attributes.Image.data.attributes.url}
                  alt={data[4].attributes.Image.data.attributes.alt}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            <div className="mx-auto mt-2">
              <p className="b3">{data[4].attributes.Title}</p>
              <p className="mt-1 b3 opacity-60">
                {data[4].attributes.Description}
              </p>
            </div>
          </Animate>
        </Link>
      )}
    </div>
  );
};

export default Articles;
