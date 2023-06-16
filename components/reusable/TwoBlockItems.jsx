import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Animate from "./Animate";

const TwoBlockItems = ({ items }) => {
  const [frameObj, setFrameObj] = useState([]);

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
      {items.map((item, i) => (
        <Animate options={{ alpha: true, delay: i * 0.1 }}>
          <div key={i}>
            {item.title && (
              <Link href={`/gallery/collection/${item.id}`}>
                <div
                  className={`shadow1 mx-auto bg-unveilWhite w-fit
            ${frameObject.size === "2mm" ? "border-[3px]" : ""}
            ${frameObject.size === "3mm" ? "border-[4px]" : ""}
            ${frameObject.size === "5mm" ? "border-[5px]" : ""}
            ${frameObject.colour === "Black" ? "border-unveilBlack" : ""}
            ${frameObject.colour === "Wood" ? "border-[#D8B589]" : ""}
            ${frameObject.colour === "White" ? "border-unveilCreme" : ""}
            ${frameObject.border === "None" ? "p-0" : ""}
            ${frameObject.border === "5x10" ? "p-2" : ""}
            ${frameObject.border === "10x20" ? "p-4" : ""}`}
                >
                  <img
                    className="object-contain h-full"
                    src={item.media_url}
                    alt={item.name}
                  />
                </div>
              </Link>
            )}
            {item.name && (
              <Link href={`/gallery/artwork/${item.id}`}>
                <div className="relative w-full bg-bgColor aspect-square">
                  <Image
                    src={item.media_url}
                    alt={item.name}
                    fill={true}
                    style={{ objectFit: "cover" }}
                  />
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
              <p className="b3 opacity-60">{item.owner_id}</p>
            </Link>
            {item.editions && (
              <div className="flex items-center gap-1">
                <p className="b3 opacity-60">€ {item.editions[0]?.price}</p>
              </div>
            )}
          </div>
        </Animate>
      ))}
    </div>
  );
};

export default TwoBlockItems;
