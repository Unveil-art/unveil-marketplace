import React from "react";

import Collection from "../svg/Collection";
import Nft from "../svg/Nft";
import Tag from "../svg/Tag";

const GridColThree = ({ data }) => {
  return (
    <section className="grid md:grid-cols-3 pl-10 pr-[15px] py-10 md:p-10 md:mb-[60px] group">
      {data.map((item, i) => (
        <div
          key={item.id}
          className="relative border-t md:last:border-none pt-3 mt-3 md:pt-0 md:border-t-0 md:border-r border-unveilGrey pr-[20px] md:mr-[30px]"
        >
          {/* <div className="absolute left-0 scale-75 top-3 md:top-0 md:scale-100">
            {item.icon === "cards" && <Collection />}
            {item.icon === "nft" && <Nft />}
            {item.icon === "art" && <Tag />}
          </div> */}
          <div className="mb-2.5">
            {item.icon === "cards" && <span className="nft-print">print</span>}
            {item.icon === "nft" && (
              <span className="nft-print">print only</span>
            )}
            {item.icon === "art" && <span className="nft">Digital</span>}
          </div>
          <h3 className="s1">{item.title}</h3>
          <p className="mt-3 b3 md:h5">{item.description}</p>
        </div>
      ))}
    </section>
  );
};

export default GridColThree;
