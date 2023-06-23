import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Animate from "./Animate";
import { getUserName } from "lib/utils";
import { getCurrentExchangeRateETHUSD } from "lib/backend";

const TwoBlockItems = ({ items }) => {
  const [frameObj, setFrameObj] = useState([]);

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

  // useEffect(() => {
  //   items.forEach((item) => {
  //     let arr = item.frame[0].split(", ");

  //     let frameObject = {
  //       frame: "",
  //       size: "",
  //       color: "",
  //       border: "",
  //     };
  //     if (artwork.edition_type !== "NFT_Only") {
  //       setFrameObj() = {
  //         frame: arr[0],
  //         size: arr[1],
  //         color: arr[2].split(" ")[0],
  //         border: arr[3].split(" ")[2],
  //       };
  //   })
  // })

  return (
    <div className="px-[15px] my-5 md:my-10 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-[15px] md:gap-5">
      {items.map((item, i) => {
        const [orientation, setOrientation] = useState(false);

        useEffect(() => {
          const img = document.createElement("img");

          img.onload = function () {
            if (this.width > this.height) {
              setOrientation(true);
            } else if (this.width < this.height) {
              setOrientation(false);
            } else {
              setOrientation(false);
            }
          };

          img.src = item.media_url;
        }, [item.media_url]);

        return (
          <div key={i}>
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
                <Link href={`/people/${items.owner_id}`}>
                  <p className="b3 opacity-60">{getUserName(item.owner)}</p>
                </Link>
                {item.editions && (
                  <div className="flex items-center gap-1">
                    <p className="b3 opacity-60">
                      $ {getUSD(item.editions[0]?.price)}
                    </p>
                  </div>
                )}
              </>
            </Animate>
          </div>
        );
      })}
    </div>
  );
};

export default TwoBlockItems;
