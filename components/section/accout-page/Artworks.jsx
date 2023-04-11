import React from "react";
import ArtworkListItem from "../../reusable/ArtworkListItem";

const Artworks = () => {
  return (
    <>
      <button className="absolute md:block hidden top-[150px] right-10 btn btn-secondary">
        View gallery
      </button>
      <div className="ml-[40px] md:ml-[35svw] mb-6 pr-[15px]">
        <button className="mt-4 mb-20 md:my-20 btn btn-secondary md:btn-fit md:btn-wide btn-full ">
          Add new artwork
        </button>
        <div className="flex gap-2 pb-4 overflow-auto flex-nowrap whitespace-nowrap">
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
      <div className="ml-[40px] md:ml-[35svw] pr-[15px] md:pr-10">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <ArtworkListItem key={i} />
        ))}
      </div>
    </>
  );
};

export default Artworks;
