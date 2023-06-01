import React from "react";

import Currency from "../svg/Currency";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";

const About = ({ bg, item }) => {
  return (
    <section className="relative grid grid-cols-1 my-5 md:grid-cols-2 2xl:h-screen md:my-10">
      <div className="relative md:aspect-square aspect-[10/11] 2xl:aspect-auto bg-bgColor">
        <Image
          src={item.media_url}
          alt={item.name}
          layout="fill"
          objectFit="cover"
        />
        {item.name && (
          <div className="absolute bottom-[15px] left-[15px] w-[200px] bg-bgBlackOpacity border rounded-[10px] border-bgColorHover text-unveilWhite py-2 md:py-5 px-2 md:px-[15px] bg-blur">
            <Link href={`/gallery/${item.id}`}>
              <p className="leading-tight mb-[2px] b5"> {item.name}</p>
            </Link>
            <Link href={`/people/${item.owner_id}`}>
              <h6 className="truncate text-[14px] md:text-[16px] b3">
                {item.owner_id}
              </h6>
            </Link>
            {item.editions && (
              <div className="flex items-center gap-1 mt-[2px]">
                <p className="leading-tight b5">€ {item.editions[0]?.price}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        style={{ backgroundColor: bg }}
        className="relative p-[15px] pt-10 md:p-10 text-unveilWhite aspect-[10/11] md:aspect-auto"
      >
        <Link href={`/gallery/${item.id}`}>
          {item.name && (
            <h2 className="h1 max-w-[75%] md:max-w-[90%] w-fit">{item.name}</h2>
          )}
          {item.title && (
            <h2 className="h1 max-w-[75%] md:max-w-[90%] w-fit">
              {item.title}
            </h2>
          )}
        </Link>
        <div className="s2">
          <CountdownTimer
            targetDate={new Date(item.live_time)}
            owner={item.owner_id}
          />
        </div>
        <div className="absolute bottom-[40px] md:bottom-20 left-32 md:left-1/2 max-w-[310px]">
          {item.curator_id && (
            <Link href={`/people/${item.curator_id}`}>
              <h5 className="l2">Curated by {item.curator_id}</h5>
            </Link>
          )}
          {!item.curator_id && (
            <Link href={`/people/${item.owner_id}`}>
              <h5 className="l2">By {item.owner_id}</h5>
            </Link>
          )}

          {item.detail_shots && (
            <p className="pt-4 md:pt-8 b3">{item.detail_shots[0]?.caption}</p>
          )}
          {item.description && (
            <p className="pt-4 md:pt-8 b3">{item.description}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
