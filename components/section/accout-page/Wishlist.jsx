import React from "react";
import ArtworkListItem from "../../reusable/ArtworkListItem";

const Wishlist = () => {
  return (
    <div className="ml-[40px] pt-[160px] md:ml-[35svw] pr-[15px] md:pr-10 pb-10">
      <h3 className="b3 text-[17px] mb-[10px]">Artists</h3>
      <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
      {/* {[1].map((item, i) => (
        <ArtworkListItem key={i} />
      ))} */}
    </div>
  );
};

export default Wishlist;
