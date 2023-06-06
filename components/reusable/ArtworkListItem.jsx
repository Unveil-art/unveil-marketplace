import React, { useEffect, useState } from "react";
import Link from "next/link";

import Router from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { listArtwork } from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";

const ArtworkListItem = ({ i, item }) => {
  const [list, setList] = useState(item);
  const { value } = useLocalStorage("token");

  useEffect(() => {
    setList(item);
  }, [item]);

  const handleListing = async (e) => {
    e.preventDefault();
    try {
      const data = await listArtwork(value, item.id, !list.listed);

      setList(data.data);
      toast.success("Successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      key={i}
      className="flex items-center justify-between border-b last:border-none border-bgBlackOpacity"
    >
      <div className="flex items-center gap-4 md:gap-10">
        <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]">
          <div className="flex items-center justify-center h-full p-5">
            <img
              className="object-contain frame-1"
              src={item.media_url}
              alt={item.name}
            />
          </div>
        </div>
        <div>
          <h4 className="mb-2 md:mb-0 s1">{item.name}</h4>
          {item.is_draft && (
            <Link href={`/artworks/${item.id}`}>
              <button className="block btn btn-secondary btn-lg md:hidden">
                View
              </button>
            </Link>
          )}
        </div>
      </div>
      {item.is_draft && (
        <Link href={`/artworks/${item.id}`}>
          <button className="hidden btn btn-secondary md:block">View</button>
        </Link>
      )}
      {item.is_draft === false && (
        <button
          onClick={(e) => handleListing(e)}
          className="hidden btn btn-secondary md:block"
        >
          {!list.listed && <p> List for sale</p>}
          {list.listed && <p> Unlist for sale</p>}
        </button>
      )}
    </div>
  );
};

export default ArtworkListItem;
