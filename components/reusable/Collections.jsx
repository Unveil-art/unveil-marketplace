import React, { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { default as NextImage } from "next/image";
import ColorThief from "colorthief";

const Collections = ({ color = "#F9F7F2", bgColor = "#141414", item }) => {
  const [dominantColor, setDominantColor] = useState("rgba(21, 17, 0, 0.05)");

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
        color = darkenColor(color, 30);
      }

      setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  }, []);

  console.log(item);
  return (
    <section className="grid grid-cols-1 md:h-screen md:m-0 m-[15px] md:grid-cols-2">
      <div
        className="flex flex-col justify-between order-2 p-10 aspect-square md:aspect-auto md:order-1"
        style={{ backgroundColor: dominantColor, color: color }}
      >
        <div>
          <h2 className="h1">{item.title}</h2>
          <div className="mt-5 s2">
            <CountdownTimer targetDate={new Date(item.live_time)} />
          </div>
        </div>
        <div className="max-w-[60%]   ml-auto">
          {item.curator_id && (
            <p className="mb-5 l2">Curated by {item.curator_id}</p>
          )}
          <p className="b3">{item.description}</p>
        </div>
      </div>
      <div className="relative order-1 bg-bgColor md:order-2 aspect-square md:aspect-auto">
        <NextImage
          src={item.media_url}
          alt={item.title}
          fill={true}
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </section>
  );
};

export default Collections;
