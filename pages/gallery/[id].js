import React from "react";
import GalleryHero from "../../components/section/gallery-page/GalleryHero";
import AboutItem from "../../components/section/gallery-page/AboutItem";
import ItemStatistics from "../../components/section/gallery-page/ItemStatistics";
import AboutCurator from "../../components/reusable/AboutCurator";
import ContinueBrowsing from "../../components/section/gallery-page/ContinueBrowsing";
import Provenance from "../../components/section/gallery-page/Provenance";

const Details = () => {
  return (
    <main>
      <GalleryHero />
      <AboutItem />
      <ItemStatistics />
      <Provenance />
      <AboutCurator />
      <ContinueBrowsing />
    </main>
  );
};

export default Details;
