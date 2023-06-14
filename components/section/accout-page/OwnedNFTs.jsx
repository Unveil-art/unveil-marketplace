import React from "react";
import NFTsListItem from "../../reusable/NFTsListItem";

const OwnedNFTs = () => {
  return (
    // TODO: buttons eroner in mobile
    <div className="ml-[40px] md:ml-[35svw] mb-10 pr-[15px] md:pr-10">
      <div>
        <div>
          <h3 className="b3 mb-[15px] mt-10 text-[17px]">
            Owned early access NFTs
          </h3>
          <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
          {[1, 1].map((item, i) => (
            <NFTsListItem key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnedNFTs;
