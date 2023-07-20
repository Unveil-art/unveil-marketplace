import { getArtworkById } from "lib/backend";
import { formatDate } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const OfferListItem = ({ offer, currentExchangeRate = 0 }) => {
  const router = useRouter();

  const [artwork, setArtwork] = useState();

  const init = async () => {
    try {
      const data = await getArtworkById(offer.edition.artwork_id);
      setArtwork(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex items-center justify-between border-b last:border-none border-bgBlackOpacity">
      <div className="flex items-center gap-4 md:gap-10">
        <Link
          href={`/gallery/artwork/${artwork?.id}`}
          className="relative h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"
        >
          {artwork && (
            <Image
              src={artwork?.media_url}
              alt={artwork?.name}
              fill={true}
              style={{ objectFit: "contain" }}
              priority
            />
          )}
        </Link>
        <div className="flex justify-between gap-2 md:block">
          <div>
            <p className="b4 text-unveilGrey">Name</p>
            <h4 className="mb-2 md:mb-0 s1">{artwork?.name}</h4>
          </div>
        </div>
      </div>
      <div>
        <p className="b4 text-unveilGrey">Offer date</p>
        <h4 className="mb-2 md:mb-0 s1 lowercase">
          {formatDate(offer.create_at).date} {formatDate(offer.create_at).month}{" "}
          {formatDate(offer.create_at).year}
        </h4>
      </div>
      <div className="flex flex-col gap-1 md:flex-row">
        {/* <button className=" btn btn-secondary">print</button> */}
        <button
          onClick={() => router.push(`/offer/${offer.id}`)}
          className=" btn btn-secondary"
        >
          Show info
        </button>
      </div>
    </div>
  );
};

export default OfferListItem;
