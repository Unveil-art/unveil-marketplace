import React from "react";
import NFTsListItem from "../../reusable/NFTsListItem";
import Animate from "@/components/reusable/Animate";

const OwnedNFTs = () => {
  return (
    // TODO: buttons eroner in mobile
    <Animate options={{ alpha: true }}>
      <div className="ml-[40px] pt-[80px] md:pt-[160px] md:ml-[35svw] mb-10 pr-[15px] md:pr-10">
        <div>
          <h3 className="b3 mb-[15px] text-[17px]">Owned early access NFTs</h3>
          <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
          <div className="flex items-center gap-4 mb-20 md:gap-10">
            <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
            <h5 className="s1 opacity-60 ">No owned artworks yet</h5>
          </div>
          {/* {[1, 1].map((item, i) => (
              <NFTsListItem key={i} />
            ))} */}
        </div>
      </div>
    </Animate>
  );
};

export default OwnedNFTs;
