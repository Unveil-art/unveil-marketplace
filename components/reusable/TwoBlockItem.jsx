import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Animate from "./Animate";
import { getUserName } from "lib/utils";
import { getCurrentExchangeRateETHUSD } from "lib/backend";

const TwoBlockItem = ({ item, i }) => {
  const [orientation, setOrientation] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(1900);

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
    img.onload = function () {
      if (this.width > this.height) {
        setOrientation(true);
      } else {
        setOrientation(false);
      }
    };
    img.src = item.media_url;
  }, [item.media_url]);

  return (
    <div>
      <Animate options={{ alpha: true, delay: i * 0.1 }}>
        <>
          {item.title && (
            <Link href={`/gallery/collection/${item.id}`}>
              <div className="relative w-full overflow-hidden bg-bgColor aspect-square">
                <div
                  className={` ${
                    orientation
                      ? "mx-[10%] md:mx-[20%] w-[calc(100%-20%)] md:w-[calc(100%-40%)]"
                      : "mx-[25%] md:mx-[30%] w-[calc(100%-50%)] md:w-[calc(100%-60%)]"
                  } shadow1
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
              <div className="relative w-full overflow-hidden bg-bgColor aspect-square">
                <div
                  className={` ${
                    orientation
                      ? "mx-[10%] md:mx-[20%] w-[calc(100%-20%)] md:w-[calc(100%-40%)]"
                      : "mx-[25%] md:mx-[30%] w-[calc(100%-50%)] md:w-[calc(100%-60%)]"
                  } shadow1
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
          {item.edition_type && (
            <>
              {item.edition_type === "NFT_Backed_by_print" && (
                <span className="nft-print">nft + print</span>
              )}
              {item.edition_type === "NFT_Only" && (
                <span className="nft">nft</span>
              )}
              {item.edition_type === "Print_Only" && (
                <span className="print">print</span>
              )}
            </>
          )}
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
                {item.editions[0]?.price} ETH)
              </p>
            </div>
          )}
        </>
      </Animate>
    </div>
  );
};

export default TwoBlockItem;
