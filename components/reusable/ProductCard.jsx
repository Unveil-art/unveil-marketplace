import React, { useEffect, useState } from "react";
import Animate from "@/components/reusable/Animate";
import Currency from "../svg/Currency";
import Image from "next/image";
import Link from "next/link";
import { getUserName } from "lib/utils";
import { getCurrentExchangeRateETHUSD } from "lib/backend";

const ProductCard = ({ rounded = false, item }) => {
  const [exchangeRate, setExchangeRate] = useState(1900);
  const [uniqueEditionTypes, setUniqueEditionTypes] = useState([]);

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

  useEffect(() => {
    console.log(uniqueEditionTypes);
  }, [uniqueEditionTypes]);

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
    <Animate
      options={{
        y: 175,
        alpha: true,
        delay: "random",
      }}
      className="[&:nth-child(3)]:mt-[120px]"
    >
      {item?.title && (
        <Link href={`/gallery/collection/${item.id}`}>
          <div
            className={`${
              rounded && !item?.title ? "rounded-t-full" : ""
            } bg-bgColor overflow-hidden aspect-[3/4] mb-1`}
          >
            <div
              className={`${
                rounded || item?.title
                  ? ""
                  : "mx-5 md:mx-10 w-[calc(100%-40px)] md:w-[calc(100%-80px)] shadow2"
              } relative  h-full `}
            >
              <Image
                src={item.media_url}
                alt={item.title}
                fill={true}
                style={{
                  objectFit: rounded || item?.title ? "cover" : "contain",
                }}
                priority
              />
            </div>
          </div>
        </Link>
      )}
      {item?.name && (
        <Link href={`/gallery/artwork/${item.id}`}>
          <div
            className={`${
              rounded ? "rounded-t-full" : ""
            } bg-bgColor overflow-hidden aspect-[3/4] mb-1`}
          >
            <div
              className={`${
                rounded
                  ? ""
                  : "mx-5 md:mx-10 w-[calc(100%-40px)] md:w-[calc(100%-80px)] shadow2"
              } relative  h-full `}
            >
              <Image
                src={item.media_url}
                alt={item.name}
                fill={true}
                style={{ objectFit: rounded ? "cover" : "contain" }}
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
              className={`${item === "NFT" ? "nft" : ""} ${
                item === "NFT + PRINT" ? "nft-print" : ""
              } ${item === "PRINT" ? "print" : ""} `}
            >
              {item}
            </span>
          ))}
        </>
      )}
      {item.edition_type && (
        <>
          {item.edition_type === "NFT_Backed_by_print" && (
            <span className="nft-print">nft + print</span>
          )}
          {item.edition_type === "NFT_Only" && <span className="nft">nft</span>}
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
        <p className="w-full truncate b3 opacity-60">
          {getUserName(item.owner)}
        </p>
      </Link>
      {item.editions && (
        <div className="flex items-center gap-1">
          <p className="b3 opacity-60">
            ${parseFloat(getUSD(item.editions[0]?.price)).toFixed()} (
            {item.editions[0]?.price?.toFixed(2)} ETH)
          </p>
        </div>
      )}
    </Animate>
  );
};

export default ProductCard;
