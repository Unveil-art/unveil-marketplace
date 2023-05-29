import React, { useState, useEffect } from "react";
import ArtworkListItem from "../../reusable/ArtworkListItem";
import { getArtworksMe } from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";
import Link from "next/link";

const Artworks = () => {
  const { value } = useLocalStorage("token");
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const artworkData = await getArtworksMe(value);
      setArtworks(artworkData);
    };
    if (value) {
      fetchUser();
    }
  }, [value]);

  useEffect(() => {
    console.log("artworks", artworks);
  }, [artworks]);

  return (
    <>
      <Link href="/gallery">
        <button className="absolute md:block hidden top-[150px] right-10 btn btn-secondary">
          View gallery
        </button>
      </Link>
      <div className="ml-[40px] md:ml-[35svw] mb-6 pr-[15px]">
        <Link href="/artworks/add">
          <button className="mt-4 mb-20 md:my-20 btn btn-secondary btn-lg md:btn-fit md:btn-wide btn-full ">
            Add new artwork
          </button>
        </Link>
        <div className="flex gap-2 overflow-auto md:pb-4 flex-nowrap whitespace-nowrap">
          <span className="px-2 border rounded-full border-unveilDrakGray l2">
            Unlisted 1
          </span>
          <span className="px-2 border rounded-full border-unveilDrakGray l2">
            Listed for sale 0
          </span>
          <span className="px-2 border rounded-full border-unveilDrakGray l2">
            To be printed 3
          </span>
        </div>
      </div>
      <div className="ml-[40px] md:ml-[35svw] pr-[15px] md:pr-10 mb-10">
        {artworks.length > 0 && (
          <>
            {artworks.map((item, i) => (
              <ArtworkListItem key={i} item={item} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Artworks;
