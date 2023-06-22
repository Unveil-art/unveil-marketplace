import React, { useEffect } from "react";
import { useRouter } from "next/router";

import GalleryHero from "../../../components/section/gallery-page/GalleryHero";
import GalleryAbout from "../../../components/section/gallery-page/GalleryAbout";
import AboutCurator from "../../../components/reusable/AboutCurator";
import ContinueBrowsing from "../../../components/section/gallery-page/ContinueBrowsing";
import Provenance from "../../../components/section/gallery-page/Provenance";
import { getArtworkById, getArtworks } from "lib/backend";
import { ToastContainer } from "react-toastify";

const Details = ({ artwork, browse }) => {
  return (
    <main>
      <ToastContainer />
      <GalleryHero artwork={artwork} />
      <GalleryAbout artwork={artwork} />
      {/* <Provenance /> */}
      <AboutCurator owner={artwork.owner} />
      <ContinueBrowsing browse={browse} />
    </main>
  );
};

export default Details;

export async function getServerSideProps({ params }) {
  const artwork = await getArtworkById(params.id);
  const browse = await getArtworks(0, 3);

  return {
    props: {
      artwork,
      browse,
    },
  };
}
