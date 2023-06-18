import React from "react";
import Animate from "@/components/reusable/Animate";
import Currency from "../svg/Currency";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ rounded = false, item }) => {
  console.log(item);
  return (
    <Animate
      options={{
        y: 175,
        alpha: true,
        delay: "random",
      }}
      className="[&:nth-child(3)]:mt-[120px]"
    >
      {item.title && (
        <Link href={`/gallery/collection/${item.id}`}>
          <div
            className={`${
              rounded ? "rounded-t-full" : ""
            } bg-bgColor relative overflow-hidden aspect-[3/4] mb-1`}
          >
            <Image
              src={item.media_url}
              alt={item.title}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>
      )}
      {item.name && (
        <Link href={`/gallery/artwork/${item.id}`}>
          <div
            className={`${
              rounded ? "rounded-t-full" : ""
            } bg-bgColor relative overflow-hidden aspect-[3/4] mb-1`}
          >
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
        <p className="b3 opacity-60 w-fit">{item.owner_id}</p>
      </Link>
      {item.editions && (
        <div className="flex items-center gap-1">
          <p className="b3 opacity-60">€ {item.editions[0]?.price}</p>
        </div>
      )}
    </Animate>
  );
};

export default ProductCard;
