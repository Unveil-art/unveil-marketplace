import React from "react";
import Animate from "@/components/reusable/animate";
import Currency from "../svg/Currency";

const TwoBlockItems = () => {
  return (
    <div className="grid grid-cols-1 gap-[15px] mx-[15px] md:mx-10 md:grid-cols-2">
      <Animate options={{ y: 50 }}>
        <div className="aspect-square bg-unveilGreen"></div>
        <span className="gsap-stagger nft-print">nft + print</span>
        <h5 className="gsap-stagger pt-1 b3">Artwork Name</h5>
        <p className="gsap-stagger b3 opacity-60">Alexander Sporre</p>
        <div className="gsap-stagger flex items-center gap-1">
          <p className="b3 opacity-60">€1200 (</p>
          <div className="scale-[1.3]">
            <Currency />
          </div>
          <p className="b3 opacity-60">1.2)</p>
        </div>
      </Animate>
      <Animate options={{ y: 50 }}>
        <div className="aspect-square bg-unveilGreen"></div>
        <span className="gsap-stagger nft-print">nft + print</span>
        <h5 className="gsap-stagger pt-1 b3">Artwork Name</h5>
        <p className="gsap-stagger b3 opacity-60">Alexander Sporre</p>
        <div className="gsap-stagger flex items-center gap-1">
          <p className="b3 opacity-60">€1200 (</p>
          <div className="scale-[1.3]">
            <Currency />
          </div>
          <p className="b3 opacity-60">1.2)</p>
        </div>
      </Animate>
    </div>
  );
};

export default TwoBlockItems;
