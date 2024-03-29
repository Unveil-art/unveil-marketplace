import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const NFTsListItem = ({ edition, currentExchangeRate=0 }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between border-b last:border-none border-bgBlackOpacity">
      <div className="flex items-center gap-4 md:gap-10">
        {!edition.artwork.unveil ? <Link href={`/gallery/artwork/${edition?.artwork?.id}`} className="relative h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]">
        <Image
                src={edition?.artwork?.media_url}
                alt={edition?.artwork?.name}
                fill={true}
                style={{ objectFit: "contain" }}
                priority
              />
        </Link> :
        <div className="relative h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]">
        <Image
                src={edition?.artwork?.media_url}
                alt={edition?.artwork?.name}
                fill={true}
                style={{ objectFit: "contain" }}
                priority
              />
        </div>}
        <div className="flex justify-between gap-2 md:block">
          <div>
            <p className="b4 text-unveilGrey">Name</p>
            <h4 className="mb-2 md:mb-0 s1">{edition?.artwork?.name}</h4>
          </div>
        </div>
      </div>
      <div>
        <p className="b4 text-unveilGrey">Price</p>
        <h4 className="mb-2 md:mb-0 s1">${(edition.price*currentExchangeRate).toFixed(2)} ({edition.price.toFixed(2)} ETH)</h4>
      </div>
      <div className="flex flex-col gap-1 md:flex-row">
        {edition?.artwork?.edition_type=="NFT_Backed_by_print" && !edition.printed && <button  onClick={() => {
          if(edition.shipping_signature && !edition.artwork.unveil){
            router.push(`/print/${edition?.id}`)
          }else if(!edition.artwork.unveil){
            showTopStickyNotification("success","Edition is not Signed! Please Try after sometime.")
          }
        }} className=" btn btn-secondary">print</button>}
        <button disabled={edition.artwork.unveil} onClick={() => router.push(`/gallery/artwork/${edition?.artwork?.id}`)} className=" btn btn-secondary disabled:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed">Show info</button>
      </div>
    </div>
  );
};

export default NFTsListItem;
