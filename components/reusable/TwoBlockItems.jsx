import React from "react";
import Image from "next/image";
import Link from "next/link";

const TwoBlockItems = ({ items }) => {
  return (
    <div className="px-[15px] my-5 md:my-10 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-[15px] md:gap-5">
      {items.map((item) => (
        <div>
          <Link href={`/gallery/${item.id}`}>
            <div className="relative w-full bg-bgColor aspect-square">
              <Image
                src={item.media_url}
                alt={item.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Link>
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
          <Link href={`/gallery/${item.id}`}>
            {item.name && <h5 className="b3">{item.name}</h5>}
            {item.title && <h5 className="b3">{item.title}</h5>}
          </Link>
          <Link href={`/people/${items.owner_id}`}>
            <p className="b3 opacity-60">{item.owner_id}</p>
          </Link>
          {item.editions && (
            <div className="flex items-center gap-1">
              <p className="b3 opacity-60">€ {item.editions[0]?.price}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TwoBlockItems;
