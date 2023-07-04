import ThreeBlockItems from "@/components/reusable/ThreeBlockItems";
import React from "react";

const ContinueBrowsing = ({ browse }) => {
  return (
    <section>
      <h2 className="text-center my-[100px]">Continue browsing</h2>
      <ThreeBlockItems items={browse} />
    </section>
  );
};

export default ContinueBrowsing;
