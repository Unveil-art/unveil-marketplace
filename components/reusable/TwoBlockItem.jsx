import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Animate from "./Animate";
import { getUserName } from "lib/utils";
import { getCurrentExchangeRateETHUSD } from "lib/backend";
import { useWindowSize } from "@/hooks/useWindowSize";
import { darkenColor, isLight } from "lib/utils/color";
import ColorThief from "colorthief";


const ARTWORK_COLOR = {
  "Limited": "#ACA9BE",
  "Extended": "#FFB800",
  "1-of-1":"#D6471A"
}

const TwoBlockItem = ({ item, i }) => {
  const [orientation, setOrientation] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(1900);
  const [uniqueEditionTypes, setUniqueEditionTypes] = useState([]);
  const [dominantColor, setDominantColor] = useState("rgba(21, 17, 0, 0.05)");

  useEffect(() => {
    if (item.title) {
      const types = item.artworks.map((artwork) => {
        switch (artwork.edition_type) {
          case "NFT_Only":
            return "NFT";
          case "Print_Only":
            return "PRINT";
          case "NFT_Backed_by_Print":
            return "NFT + PRINT";
          default:
            return null;
        }
      });

      const flatUniqueTypes = [...new Set(types.flat())];

      setUniqueEditionTypes(flatUniqueTypes);
    }
  }, []);

  const { width } = useWindowSize();

  const init = async () => {
    try {
      const data = await getCurrentExchangeRateETHUSD();
      setExchangeRate(data.USD);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const getUSD = (eth) => {
    return (eth * exchangeRate).toFixed(2);
  };

  useEffect(() => {
    const img = new window.Image();
    img.src = item.media_url;
    img.crossOrigin = "Anonymous";
    const colorThief = new ColorThief();

    img.onload = function () {
      let color = colorThief.getColor(img);

      if (this.width > this.height) {
        setOrientation(true);
      } else {
        setOrientation(false);
      }

      if (isLight(color)) {
        color = darkenColor(color, 30);
      }

      setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  }, [item.media_url]);

  return (
    <div>
      <Animate options={{ alpha: true, delay: i * 0.1 }}>
        <>
          {item.title && (
            <Link href={`/gallery/collection/${item.id}`}>
              <div
                className="relative w-full overflow-hidden bg-bgColor aspect-square transition-colors duration-500"
                data-hover-bg
                style={{
                  "--hover-bg-color": `${dominantColor}`,
                }}
              >
                <div
                  className={` ${
                    orientation
                      ? "mx-[10%] md:mx-[20%] w-[calc(100%-20%)] md:w-[calc(100%-40%)]"
                      : "mx-[25%] md:mx-[30%] w-[calc(100%-50%)] md:w-[calc(100%-60%)]"
                  } ${width < 768 ? "shadow2" : "shadow1"}
       relative  h-full `}
                >
                  <Image
                    src={item.media_url}
                    alt={item.title}
                    fill={true}
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>
            </Link>
          )}
          {item.name && (
            <Link href={`/gallery/artwork/${item.id}`}>
              <div
                className="relative w-full overflow-hidden bg-bgColor aspect-square transition-colors duration-500"
                data-hover-bg
                style={{
                  "--hover-bg-color": `${dominantColor}`,
                }}
              >
                <div
                  className={` ${
                    orientation
                      ? "mx-[10%] md:mx-[20%] w-[calc(100%-20%)] md:w-[calc(100%-40%)]"
                      : "mx-[25%] md:mx-[30%] w-[calc(100%-50%)] md:w-[calc(100%-60%)]"
                  } ${width < 768 ? "shadow2" : "shadow1"}
     relative h-full `}
                >
                  <Image
                    src={item.media_url}
                    alt={item.name}
                    fill={true}
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>
            </Link>
          )}
          {uniqueEditionTypes && (
            <>
              {uniqueEditionTypes.map((item) => (
                <span
                  key={i}
                  className={`${item === "NFT" ? "nft" : ""} ${
                    item === "NFT + PRINT" ? "nft-print" : ""
                  } ${item === "PRINT" ? "print" : ""} `}
                >
                  {item}
                </span>
              ))}
            </>
          )}
          <div className="flex gap-1 mt-2">
      {item.edition_type && (
        <>
          {item.edition_type === "NFT_Backed_by_print" && (
            <span className="nft-print">PRINT</span>
          )}
          {item.edition_type === "NFT_Only" && <span className="nft bg-black text-white">DIGITAL</span>}
          {item.edition_type === "Print_Only" && (
            <span className="print">PRINT</span>
          )}
        </>
        )}
        {item.artwork_type && (
        <>
          {item.artwork_type === "Limited" && (
            <span className={`nft-print`} style={{backgroundColor:ARTWORK_COLOR[item.artwork_type]}}>LIMITED EDITION</span>
          )}
          {item.artwork_type === "Extended" && <span className={`nft`} style={{backgroundColor:ARTWORK_COLOR[item.artwork_type]}}>EXTENDED EDITION</span>}
          {item.artwork_type === "1-of-1" && (
            <span className={`print`} style={{backgroundColor:ARTWORK_COLOR[item.artwork_type]}}>1-OF-1</span>
          )}
        </>
            )}
            </div>
          {item.title && (
            <Link href={`/gallery/collection/${item.id}`}>
              <h5 className="b3">{item.title}</h5>
            </Link>
          )}
          {item.name && (
            <Link href={`/gallery/artwork/${item.id}`}>
              <h5 className="b3">{item.name}</h5>
            </Link>
          )}
          <Link href={`/people/${item.owner_id}`}>
            <p className="b3 opacity-60">{getUserName(item.owner)}</p>
          </Link>
          {item.editions && (
            <div className="flex items-center gap-1">
              <p className="b3 opacity-60">
                ${parseFloat(getUSD(item.editions[0]?.price)).toFixed()} (
                {item.editions[0]?.price?.toFixed(2)} ETH)
              </p>
            </div>
          )}
        </>
      </Animate>
    </div>
  );
};

export default TwoBlockItem;
