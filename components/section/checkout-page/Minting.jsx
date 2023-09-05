import React, { useState, useEffect, useRef } from "react";
import ColorThief from "colorthief";
import DraggableImage from "lib/animations/draggableImage";

const Minting = ({ artwork }) => {
  const [dominantColor, setDominantColor] = useState("rgba(21, 17, 0, 0.05)");
  const imgDrag1 = useRef();
  const imgDrag2 = useRef();

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
    img.src = artwork.media_url + "?" + Date.now();
    img.crossOrigin = "Anonymous";

    img.onload = function () {
      let color = colorThief.getColor(img);

      if (isLight(color)) {
        color = darkenColor(color, 15);
      }

      if (imgDrag1.current && imgDrag2.current) {
        new DraggableImage(imgDrag1.current);
        new DraggableImage(imgDrag2.current);
      }

      setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  }, []);

  return (
    <div
      style={{ backgroundColor: dominantColor }}
      className="fixed top-0 left-0 z-10 w-full h-screen bg-unveilBlack "
    >
      <div
        className="absolute md:top-20 md:left-20 top-0 left-0 w-[150px] md:w-[300px] cursor-grab"
        ref={imgDrag1}
      >
        <div className="w-full h-full img-drag">
          <div className="w-full h-full img-drag__inner">
            <img
              src={artwork.media_url}
              alt={artwork.name}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
      <div
        className="absolute bottom- md:bottom-20 md:right-20 right-0 w-[150px] md:w-[300px] cursor-grab"
        ref={imgDrag2}
      >
        <div className="w-full h-full img-drag">
          <div className="w-full h-full img-drag__inner">
            <img
              src={artwork.media_url}
              alt={artwork.name}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="h-[100svh] relative w-full flex items-center justify-center pointer-events-none z-20">
        <div>
          <div className="w-10 h-10 mx-auto border rounded-full border-unveilWhite"></div>
          <h1 className="text-center h4 mt-[10px] text-unveilWhite">
            Mint in progress...
          </h1>
          <p className="text-center b3 mt-[10px] text-unveilWhite">
            Your artwork is being minted and should complete shortly
          </p>
          <button className="block mx-auto mt-2 opacity-50 cursor-not-allowed cursor btn btn-secondary md:hidden">
            View on Etherscan
          </button>
        </div>
        <button className="absolute hidden -translate-x-1/2 opacity-50 cursor-not-allowed md:block cursor btn btn-secondary btn-wide bottom-10 left-1/2">
          View on Etherscan
        </button>
      </div>
    </div>
  );
};

export default Minting;
