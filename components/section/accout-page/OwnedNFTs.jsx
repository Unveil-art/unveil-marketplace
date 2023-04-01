import React from "react";
import NFTsListItem from "../../reusable/NFTsListItem";

const OwnedNFTs = () => {
  return (
    <div className="ml-[40px] md:ml-[35svw] mb-10 pr-[15px] md:pr-10">
      <div className="flex items-center justify-between px-5 py-4 bg-bgColor rounded-[10px] mt-[100px]">
        <p>
          You’ve been invited as an artist by Bastiaan Woudt. Accept within 10
          days
        </p>
        <button className="btn btn-secondary">Accept</button>
      </div>
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
