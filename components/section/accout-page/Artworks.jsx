import React, { useState, useEffect } from "react";
import ArtworkListItem from "../../reusable/ArtworkListItem";
import { getArtworksMe } from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";
import Link from "next/link";

const Artworks = () => {
  const { value } = useLocalStorage("token");
  const [artworksUnlist, setArtworksUnlist] = useState([]);
  const [artworksList, setArtworksList] = useState([]);
  const [filter, setFilter] = useState(0);

  const fetchUser = async (listed, setState) => {
    const artworkData = await getArtworksMe(value, listed);
    setState(artworkData);
  };

  useEffect(() => {
    if (value) {
      fetchUser(false, setArtworksUnlist);
      fetchUser(true, setArtworksList);
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      if (filter === 0) {
        fetchUser(false, setArtworksUnlist);
      } else if (filter === 1) {
        fetchUser(true, setArtworksList);
      } else {
        console.log(3);
      }
    }
  }, [filter]);

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
          <span
            onClick={() => setFilter(0)}
            className={`${
              filter === 0 ? "border-unveilBlack" : "border-unveilDrakGray"
            } px-2 cursor-pointer border rounded-full  l2`}
          >
            Unlisted {artworksUnlist.length}
          </span>
          <span
            onClick={() => setFilter(1)}
            className={`${
              filter === 1 ? "border-unveilBlack" : "border-unveilDrakGray"
            } px-2 cursor-pointer border rounded-full  l2`}
          >
            Listed for sale {artworksList.length}
          </span>
          <span
            onClick={() => setFilter(2)}
            className={`${
              filter === 2 ? "border-unveilBlack" : "border-unveilDrakGray"
            } px-2 cursor-pointer border rounded-full  l2`}
          >
            To be printed x
          </span>
        </div>
      </div>
      <div className="ml-[40px] md:ml-[35svw] pr-[15px] md:pr-10 mb-10">
        {filter === 0 && (
          <>
            {artworksUnlist.length > 0 && (
              <>
                {artworksUnlist.map((item, i) => (
                  <ArtworkListItem key={i} item={item} />
                ))}
              </>
            )}
          </>
        )}
        {filter === 1 && (
          <>
            {artworksList.length > 0 && (
              <>
                {artworksList.map((item, i) => (
                  <ArtworkListItem key={i} item={item} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Artworks;
