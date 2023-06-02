import ThreeBlockItems from "@/components/reusable/ThreeBlockItems";
import React from "react";
import AboutStats from "../../reusable/AboutStats";

const PeopleArtworks = () => {
  return (
    <section className="my-10">
      {/* <ThreeBlockItems /> */}
      <AboutStats
        bigLetters
        h1="artworks"
        b1="21"
        h2="New works this year"
        b2="18"
        h3="Highest sale"
        b3="€2093"
        h4="Average increase"
        b4="53%"
      />
      {/* <ThreeBlockItems /> */}
    </section>
  );
};

export default PeopleArtworks;
