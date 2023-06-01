import React, { useEffect } from "react";
import { useRouter } from "next/router";

import GalleryHero from "../../components/section/gallery-page/GalleryHero";
import GalleryAbout from "../../components/section/gallery-page/GalleryAbout";
import AboutCurator from "../../components/reusable/AboutCurator";
import ContinueBrowsing from "../../components/section/gallery-page/ContinueBrowsing";
import Provenance from "../../components/section/gallery-page/Provenance";

const Details = () => {
  const router = useRouter();

  return (
    <main>
      <GalleryHero />
      <GalleryAbout />
      <Provenance />
      <AboutCurator />
      <ContinueBrowsing />
    </main>
  );
};

export default Details;
