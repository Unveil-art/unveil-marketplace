import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import GalleryHero from "../../../components/section/gallery-page/GalleryHero";
import GalleryAbout from "../../../components/section/gallery-page/GalleryAbout";
import AboutCurator from "../../../components/reusable/AboutCurator";
import ContinueBrowsing from "../../../components/section/gallery-page/ContinueBrowsing";
import Provenance from "../../../components/section/gallery-page/Provenance";
import { getArtworkById, getArtworks } from "lib/backend";
import { ToastContainer } from "react-toastify";

const Details = ({ artwork, browse }) => {
  const [image, setImage] = useState();
  const imgEl = useRef(null);

  const getAverageColor = (imageElement, ratio) => {
    const canvas = document.createElement("canvas");

    const height = (canvas.height = imageElement.naturalHeight);
    const width = (canvas.width = imageElement.naturalWidth);

    const context = canvas.getContext("2d");
    context.drawImage(imageElement, 0, 0);

    let data, length;
    let i = -4,
      count = 0;

    try {
      data = context.getImageData(0, 0, width, height);
      length = data.data.length;
    } catch (err) {
      console.error(err);
      return {
        R: 0,
        G: 0,
        B: 0,
      };
    }

    let R, G, B;
    R = G = B = 0;

    while ((i += ratio * 4) < length) {
      ++count;

      R += data.data[i];
      G += data.data[i + 1];
      B += data.data[i + 2];
    }
    R = ~~(R / count);
    G = ~~(G / count);
    B = ~~(B / count);

    return { R, G, B };
  };

  const fetchImage = async () => {
    try {
      const response = await fetch(artwork.media_url);
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchBlob(url) {
    let blob = await fetch(url).then((r) => r.blob());
    return blob;
  }

  const [imageSourceUrl, setImageSourceUrl] = useState("");

  // const downloadImageAndSetSource = async (imageUrl) => {
  //   const image = await fetchBlob(imageUrl);
  //   setImageSourceUrl(URL.createObjectURL(image));
  // };

  useEffect(() => {
    imgEl.onload = () => {
      const { R, G, B } = getAverageColor(imgEl, 4);
      console.log(R, G, B);
      console.log(R, G, B);
      console.log(R, G, B);
      console.log(R, G, B);
      console.log(R, G, B);
    };
  }, []);

  useEffect(() => {
    fetchImage();
  }, []);

  // useEffect(() => {
  //   fetchBlob(artwork.media_url);
  // }, []);

  return (
    <main>
      <ToastContainer />
      <GalleryHero imgRef={imgEl} artwork={artwork} />
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
