import React, { useState, useEffect } from "react";
import ArtworkListItem from "../../reusable/ArtworkListItem";
import { getArtworksMe } from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";
import Link from "next/link";
import Invite from "@/components/reusable/Invite";
import Animate from "@/components/reusable/Animate";

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
    <Animate options={{ alpha: true }}>
      <div className="pt-[80px] md:pt-[160px] ">
        <Link href="/gallery">
          <button className="absolute md:block hidden top-[150px] right-10 btn btn-secondary">
            View gallery
          </button>
        </Link>
        <div className="ml-[40px] md:ml-[35svw] mb-6 md:pr-10 pr-[15px]">
          {/* <Invite /> */}
          <Link href="/artworks/add">
            <button className="mt-4 mb-20 btn btn-secondary btn-lg md:btn-fit md:btn-wide btn-full ">
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
                    <ArtworkListItem fetchUser={() => fetchUser(false, setArtworksUnlist)} key={i} item={item} />
                  ))}
                </>
              )}
              {artworksUnlist.length === 0 && (
                <div className="flex items-center gap-4 mb-20 md:gap-10">
                  <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
                  <h5 className="s1 opacity-60 ">No created artworks yet</h5>
                </div>
              )}
            </>
          )}
          {filter === 1 && (
            <>
              {artworksList.length > 0 && (
                <>
                  {artworksList.map((item, i) => (
                    <ArtworkListItem fetchUser={() => fetchUser(true,setArtworksList)} key={i} item={item} />
                  ))}
                </>
              )}
              {artworksList.length === 0 && (
                <div className="flex items-center gap-4 mb-20 md:gap-10">
                  <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
                  <h5 className="s1 opacity-60 ">No listed artworks yet</h5>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Animate>
  );
};

export default Artworks;
