import React, { useState, useEffect } from "react";
import ArtworkListItem from "../../reusable/ArtworkListItem";
import Animate from "@/components/reusable/Animate";

import { getWishlist } from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";

const Wishlist = () => {
  const [artworks, setArtworks] = useState();
  const { value } = useLocalStorage("token");

  useEffect(() => {
    if (value) {
      getWishlist(value).then((result) => setArtworks(result.data));
    }
  }, [value]);

  return (
    <Animate options={{ alpha: true }}>
      <div className="ml-[40px] pt-[80px] md:pt-[160px] md:ml-[35svw] pr-[15px] md:pr-10 pb-10">
        <h3 className="b3 text-[17px] mb-[10px]">Artworks</h3>
        <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
        {artworks?.length < 1 && (
          <div className="flex items-center gap-4 md:gap-10">
            <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
            <h5 className="s1 opacity-60 ">No wished artworks yet</h5>
          </div>
        )}
        {artworks?.length > 0 && (
          <>
            {artworks.map((item, i) => (
              <ArtworkListItem key={i} item={item.artwork} wishlist={true} />
            ))}
          </>
        )}
      </div>
    </Animate>
  );
};

export default Wishlist;
