import React from "react";
import ArtworkListItem from "../../reusable/ArtworkListItem";
import Animate from "@/components/reusable/Animate";

const Following = () => {
  return (
    <Animate options={{ alpha: true }}>
      <div className="ml-[40px] pt-[80px] md:pt-[160px] md:ml-[35svw] pr-[15px] md:pr-10 pb-10">
        <h3 className="b3 text-[17px] mb-[10px]">Artists</h3>
        <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
        {/* {[1].map((item, i) => (
        <ArtworkListItem key={i} />
      ))} */}
        <div className="flex items-center gap-4 mb-20 md:gap-10">
          <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
          <h5 className="s1 opacity-60 ">No followed artists yet</h5>
        </div>
        <h3 className="b3 text-[17px] mb-[10px]">Artwork</h3>
        <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
        {/* {[1].map((item, i) => (
        <ArtworkListItem key={i} />
      ))} */}
        <div className="flex items-center gap-4 mb-20 md:gap-10">
          <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
          <h5 className="s1 opacity-60 ">No followed artworks yet</h5>
        </div>
      </div>
    </Animate>
  );
};

export default Following;
