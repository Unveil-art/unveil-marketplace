import React, { useEffect, useState } from "react";

import Currency from "../svg/Currency";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";
import Animate from "./Animate";
import { getUserName } from "lib/utils";
import { getCurrentExchangeRateETHUSD } from "lib/backend";
import { default as NextImage } from "next/image";
import ColorThief from "colorthief";

const AboutPrint = ({ item }) => {
  const [exchangeRate, setExchangeRate] = useState(1900);
  const [dominantColor, setDominantColor] = useState("#141414");

  function isLight(rgb) {
    const [r, g, b] = rgb;
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    const luminance = a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    return luminance > 0.179;
  }

  function darkenColor(rgb, percent) {
    // Convert to HSL
    let [r, g, b] = rgb;
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      let diff = max - min;
      s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
      switch (max) {
        case r:
          h = (g - b) / diff + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / diff + 2;
          break;
        case b:
          h = (r - g) / diff + 4;
          break;
      }
      h /= 6;
    }

    // Darken
    l = Math.max(0, l - percent / 100);

    // Convert back to RGB
    let r1, g1, b1;

    if (s === 0) {
      r1 = g1 = b1 = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r1 = hue2rgb(p, q, h + 1 / 3);
      g1 = hue2rgb(p, q, h);
      b1 = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r1 * 255), Math.round(g1 * 255), Math.round(b1 * 255)];
  }

  useEffect(() => {
    const colorThief = new ColorThief();
    let img = new Image();
    img.src = item.media_url + "?" + Date.now();
    img.crossOrigin = "Anonymous";

    img.onload = function () {
      let color = colorThief.getColor(img);

      if (isLight(color)) {
        color = darkenColor(color, 15);
      }

      setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  }, []);

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
      <section
        className={`relative grid grid-cols-1 my-5 md:grid-cols-2 2xl:h-screen unveilTransition md:my-10 `}
      >
        <div
          data-cursor={item.name}
          data-cursor-color="#b2b4ae"
          className="relative md:aspect-square aspect-[10/11] 2xl:aspect-auto bg-bgColor"
        >
          <Link
            href={`/gallery/${item.name ? "artwork" : "collection"}/${item.id}`}
          >
            <NextImage
              src={item.media_url}
              alt={item.name}
              fill={true}
              style={{ objectFit: "cover" }}
              priority
            />
          </Link>
        </div>
        <div
          style={{ backgroundColor: dominantColor }}
          className="relative p-[15px] pt-10 md:p-10 unveilTransition bg-bgColor text-unveilWhite aspect-[10/11] md:aspect-auto"
        >
          {item.live_time && (
            <span className="live-now mb-2.5 inline-block">Live now</span>
          )}
          {item.title && (
            <Link href={`/gallery/collection/${item.id}`}>
              <h2 className="h3 max-w-[75%] break-words md:max-w-[90%] w-fit">
                {item.title}
              </h2>
            </Link>
          )}
          {item.name && (
            <Link href={`/gallery/artwork/${item.id}`}>
              <h2 className="h3 max-w-[75%]  md:max-w-[90%] w-fit">
                {item.name}
              </h2>
            </Link>
          )}
          {item.live_time && (
            <div className="break-words s2 mt-[5px]">
              <CountdownTimer
                targetDate={new Date(item.live_time)}
                owner={getUserName(item.owner)}
                owner_id={item.owner_id}
              />
            </div>
          )}

          <div className="absolute bottom-[40px] md:bottom-[50px] right-8 max-w-[310px]">
            <ul>
              <li className="s1">Sonia Mangiapane</li>
              <li className="s1">Maria Bodil</li>
              <li className="s1">Wanda Tuerlincks</li>
              <li className="s1">Joost Termeer</li>
              <li className="s1">Bram van Stappen</li>
            </ul>
            {item.curator_id && (
              <Link href={`/people/${item.curator_id}`}>
                <h5 className="l2 truncate  max-w-[150px]">
                  Curated by {item.curator_id}
                </h5>
              </Link>
            )}
            {!item.curator_id && (
              <Link
                href={`/people/${item.owner_id}`}
                className="flex items-center mt-4"
              >
                {item.owner.profileUrl && (
                  <div className="mr-3.5 w-10 h-10 rounded-full overflow-hidden relative">
                    <NextImage
                      src={item.owner.profileUrl}
                      alt={getUserName(item.owner)}
                      fill={true}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className="leading-[0]">
                  <span className="b5 leading-none inline-block mb-1.5">
                    Curated by
                  </span>
                  <h5 className="b4 leading-none">{getUserName(item.owner)}</h5>
                </div>
              </Link>
            )}

            {/* {item.detail_shots && item.detail_shots[0] && (
              <p className="pt-4 md:pt-8 b3">{item.detail_shots[0]?.caption}</p>
            )} */}
            {/* {item.description && (
              <p className="pt-4 md:pt-8 b3 line-clamp-[6] md:line-clamp-[8] break-words">
                {item.description}
              </p>
            )} */}
          </div>
        </div>
      </section>
    </Animate>
  );
};

export default AboutPrint;
