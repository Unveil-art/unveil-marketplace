import React, { useEffect, useState } from "react";
import Animate from "@/components/reusable/Animate";
import { default as NextImage } from "next/image";
import Check2 from "@/components/svg/Check2";
import ColorThief from "colorthief";

const PeopleAbout = ({ details, displayName, collections, recognition }) => {
  const [dominantColor, setDominantColor] = useState("rgb(21, 17, 0)");
  const [isLightColor, setIsLightColor] = useState(false);

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
    if (details.profileUrl) {
      const colorThief = new ColorThief();
      let img = new Image();
      img.src = details.profileUrl + "?" + Date.now();
      img.crossOrigin = "Anonymous";

      img.onload = function () {
        let color = colorThief.getColor(img);

        if (isLight(color)) {
          color = darkenColor(color, 30);
          setIsLightColor(true);
        }

        setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      };
    }
  }, []);

  const instagram = () => {
    details.instagram ? window.open(details.instagram) : "";
  };
  const website = () => {
    details.website ? window.open(details.website) : "";
  };

  const awardRecognition = recognition.filter(
    (item) => item.recognition_type === "AWARD"
  );

  const collectionRecognition = recognition.filter(
    (item) => item.recognition_type === "COLLECTION"
  );

  const exhibitionRecognition = recognition.filter(
    (item) => item.recognition_type === "EXHIBITION"
  );

  const educationRecognition = recognition.filter(
    (item) => item.recognition_type === "EDUCATION"
  );

  return (
    <section>
      <div className="md:flex md:pr-10 pr-[15px] ml-10 md:ml-0 mt-10">
        <div className="md:max-w-[35vw] h-fit w-full md:pl-10 md:pr-14 mb-11 md:mb-0">
          <h2 className="s2 mb-8">Unveil Collector’s Advice</h2>
          {/* <div className="mb-5 last:mb-0">
            <div className="b3 font-medium mb-0.5">Achievements</div>
            <ul className="b3">
              <li className="flex items-center mb-1 last:mb-0">
                <span className="mr-2 inline-block">
                  <Check2 />
                </span>
                <span>Exhibitions: Paris Photo, FOAM +3</span>
              </li>
              <li className="flex items-center mb-1 last:mb-0">
                <span className="mr-2 inline-block">
                  <Check2 />
                </span>
                <span>Awards & Nominations: Foam Talent +3</span>
              </li>
            </ul>
          </div>

          <div className="mb-5 last:mb-0">
            <div className="b3 font-medium mb-0.5">Market highlights</div>
            <ul className="b3">
              <li className="flex items-center mb-1 last:mb-0">
                <span className="mr-2 inline-block">
                  <Check2 />
                </span>
                <span>Exhibitions: Paris Photo, FOAM +3</span>
              </li>
              <li className="flex items-center mb-1 last:mb-0">
                <span className="mr-2 inline-block">
                  <Check2 />
                </span>
                <span>Awards & Nominations: Foam Talent +3</span>
              </li>
            </ul>
          </div>

          <div className="mb-5 last:mb-0">
            <div className="b3 font-medium mb-3">Market highlights</div>
            <div className="md:mb-8 mb-3 last:mb-0">
              <h3 className="l1 mb-2">by The Guardian</h3>
              <p className="h5 font-light">
                Van der Molen Sequester: A mesmerizing portrayal of Canaries
                desolate beauty, showcasing nature poise and patience.
              </p>
            </div>
            <div className="md:mb-8 mb-3 last:mb-0">
              <h3 className="l1 mb-2">by The Guardian</h3>
              <p className="h5 font-light">
                Van der Molen Sequester: A mesmerizing portrayal of Canaries
                desolate beauty, showcasing nature poise and patience.
              </p>
            </div>
          </div> */}
        </div>
        <div className="">
          <p className="h4 drop-cap max-w-[740px]">{details.description}</p>
          {educationRecognition.length > 0 && (
            <div className="mt-10">
              <h3 className="s2 mb-6">Education</h3>
              <ul className="h5">
                {educationRecognition.map((item, index) => (
                  <li key={index}>{item.description}</li>
                ))}
              </ul>
            </div>
          )}
          {exhibitionRecognition.length > 0 && (
            <div className="mt-10">
              <h3 className="s2 mb-6">Exhibitions</h3>
              <ul className="h5">
                {exhibitionRecognition.map((item, index) => (
                  <li key={index}>{item.description}</li>
                ))}
              </ul>
            </div>
          )}
          {collectionRecognition.length > 0 && (
            <div className="mt-10">
              <h3 className="s2 mb-6">Collections</h3>
              <ul className="h5">
                {collectionRecognition.map((item, index) => (
                  <li key={index}>{item.description}</li>
                ))}
              </ul>
            </div>
          )}
          {awardRecognition.length > 0 && (
            <div className="mt-10">
              <h3 className="s2 mb-6">Awards</h3>
              <ul className="h5">
                {awardRecognition.map((item, index) => (
                  <li key={index}>{item.description}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="relative grid grid-cols-1 mt-10 md:mt-[140px] md:grid-cols-2 mb-10 md:mb-[160px]">
        <div className="w-full md:order-1">
          <Animate
            options={{ y: 0, image: true }}
            className="w-full sticky top-0  overflow-hidden h-fit bg-bgColor aspect-[10/11]"
          >
            {details.profileUrl && (
              <NextImage
                src={details.profileUrl}
                alt={"People"}
                fill={true}
                style={{ objectFit: "cover" }}
                className="gsap-image"
                priority
              />
            )}
          </Animate>
        </div>
        <div
          className="flex items-end order-2 p-4 md:p-14 aspect-square md:aspect-auto md:order-1"
          style={{ backgroundColor: dominantColor }}
        >
          <div
            className="h4"
            style={{
              color: isLightColor ? "#141414" : "#F9F7F2",
            }}
          >
            Start collecting work <br /> of {displayName}
          </div>
        </div>
        {/* <Animate
          options={{ alpha: true }}
          className="order-1 md:col-span-2 md:order-2"
        >
          <div className="md:max-w-[350px] md:mt-0 mt-5 sticky top-[32px] leading-[110%] pr-[15px] ml-[40px] md:ml-[60px] justify-between flex flex-col">
            <button
              className="mt-20 btn btn-secondary btn-full"
              onClick={() => instagram()}
            >
              {details.instagram
                ? "Instagram"
                : "No Instagram available"}
            </button>
            <button
              className="mt-[10px] btn btn-secondary btn-full md:mb-0 mb-10"
              onClick={() => website()}
            >
              {details.twitter ? "Website" : "No Twitter available"}
            </button>
            <button
              className="mt-[10px] btn btn-secondary btn-full md:mb-0 mb-10"
              onClick={() => website()}
            >
              {details.website ? "Website" : "No Website available"}
            </button>
          </div>
        </Animate> */}
      </div>
    </section>
  );
};

export default PeopleAbout;
