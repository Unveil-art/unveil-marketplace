import React from "react";

import Collection from "../svg/Collection";
import Nft from "../svg/Nft";
import Tag from "../svg/Tag";

const GridColThree = () => {
  return (
    <section className="grid md:grid-cols-3 pl-10 pr-[15px] py-10 md:p-10 md:mb-[60px] group">
      <div className="relative pl-[56px] border-t pt-3 mt-3 md:pt-0 md:border-t-0 md:border-r border-unveilGrey pr-[10px] md:mr-[30px]">
        <div className="absolute left-0 scale-75 top-3 md:top-0 md:scale-100">
          <Collection />
        </div>
        <h3 className="s1">Enrich your art collection</h3>
        <p className="mt-3 b3 md:h5">
          Add NFTs and printed works of world’s renowed photography artists.
          Loren ipsum
        </p>
      </div>
      <div className="relative pl-[56px] border-t pt-3 mt-3 md:pt-0 md:border-t-0 md:border-r border-unveilGrey pr-[10px] md:mr-[30px]">
        <div className="absolute left-0 scale-75 top-3 md:top-0 md:scale-100">
          <Nft />
        </div>
        <h3 className="s1">Enrich your art collection</h3>
        <p className="mt-3 b3 md:h5">
          Add NFTs and printed works of world’s renowed photography artists.
          Loren ipsum
        </p>
      </div>
      <div className="relative pl-[56px] border-t pt-3 mt-3 md:pt-0 md:border-t-0  border-unveilGrey pr-[10px] md:mr-[30px]">
        <div className="absolute left-0 scale-75 top-3 md:top-0 md:scale-100">
          <Tag />
        </div>
        <h3 className="s1">Enrich your art collection</h3>
        <p className="mt-3 b3 md:h5">
          Add NFTs and printed works of world’s renowed photography artists.
          Loren ipsum
        </p>
      </div>
    </section>
  );
};

export default GridColThree;
