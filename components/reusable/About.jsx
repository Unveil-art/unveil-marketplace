import React, { useEffect, useState } from "react";

import Currency from "../svg/Currency";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";
import Animate from "./Animate";
import { getUserName } from "lib/utils";
import { getCurrentExchangeRateETHUSD } from "lib/backend";

const About = ({ bg, item }) => {
  const [exchangeRate, setExchangeRate] = useState(1900);

  const init = async () => {
    try {
      const data = await getCurrentExchangeRateETHUSD();
      setExchangeRate(data.USD);
    } catch (err) {
      console.log(err);
    }
  };

  const getUSD = (eth) => {
    return (eth * exchangeRate).toFixed(2);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Animate options={{ alpha: true }}>
      <section className="relative grid grid-cols-1 my-5 md:grid-cols-2 2xl:h-screen md:my-10">
        <div
          data-cursor={item.name}
          data-cursor-color="#b2b4ae"
          className="relative md:aspect-square aspect-[10/11] 2xl:aspect-auto bg-bgColor"
        >
          <Link href={`/gallery/artwork/${item.id}`}>
          <Image
            src={item.media_url}
            alt={item.name}
            fill={true}
            style={{ objectFit: "cover" }}
            priority
          />
          </Link>
          {item.name && (
            <div className="absolute bottom-[15px] left-[15px] w-[200px] bg-bgBlackOpacity border rounded-[10px] border-bgColorHover text-unveilWhite py-2 md:py-5 px-2 md:px-[15px] bg-blur">
              <Link href={`/gallery/artwork/${item.id}`}>
                <p className="leading-tight mb-[2px] b5"> {item.name}</p>
              </Link>
              <Link href={`/people/${item.owner_id}`}>
                <h6 className="truncate text-[14px] md:text-[16px] b3">
                  {getUserName(item.owner)}
                </h6>
              </Link>
              {item.editions && (
                <div className="flex items-center gap-1 mt-[2px]">
                  <p className="leading-tight b5">
                    ${parseFloat(getUSD(item.editions[0]?.price)).toFixed()} (
                    {item.editions[0]?.price} ETH)
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div
          style={{ backgroundColor: bg }}
          className="relative p-[15px] pt-10 md:p-10 text-unveilWhite aspect-[10/11] md:aspect-auto"
        >
          {item.title && (
            <Link href={`/gallery/collection/${item.id}`}>
              <h2 className="h1 max-w-[75%] break-words md:max-w-[90%] w-fit">
                {item.title}
              </h2>
            </Link>
          )}
          {item.name && (
            <Link href={`/gallery/artwork/${item.id}`}>
              <h2 className="h1 max-w-[75%] break-words md:max-w-[90%] w-fit">
                {item.name}
              </h2>
            </Link>
          )}
          {item.live_time && (
            <div className="s2">
              <CountdownTimer
                targetDate={new Date(item.live_time)}
                owner={getUserName(item.owner)}
                owner_id={item.owner_id}
              />
            </div>
          )}

          <div className="absolute bottom-[40px] md:bottom-20 left-32 md:left-1/2 max-w-[310px]">
            {item.curator_id && (
              <Link href={`/people/${item.curator_id}`}>
                <h5 className="l2">Curated by {item.curator_id}</h5>
              </Link>
            )}
            {!item.curator_id && (
              <Link href={`/people/${item.owner_id}`}>
                <h5 className="l2">By {getUserName(item.owner)}</h5>
              </Link>
            )}

            {item.detail_shots && item.detail_shots[0] && (
              <p className="pt-4 md:pt-8 b3">{item.detail_shots[0]?.caption}</p>
            )}
            {item.description && (
              <p className="pt-4 md:pt-8 b3">{item.description}</p>
            )}
          </div>
        </div>
      </section>
    </Animate>
  );
};

export default About;
