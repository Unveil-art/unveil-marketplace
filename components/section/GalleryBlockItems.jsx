import React from "react";

import TwoBlockItems from "../../components/reusable/TwoBlockItems";
import ThreeBlockItems from "../../components/reusable/ThreeBlockItems";
import About from "../../components/reusable/About";

const GalleryBlockItems = () => {
  return (
    <>
      {/* Random van deze 3 blokken maar nooit dubbelen */}
      <ThreeBlockItems />
      {/* <TwoBlockItems /> */}
      <ThreeBlockItems />
      <About
        bg="#54382F"
        name="Artist name"
        title="A unique talent amed ipsum"
        price="1200"
        subheading="Curated by Sephora Elders"
        text="In the realm of photography, I dance on the threshold between fact and fiction – where emotions and life's fragments merge into something both tangible."
      />
      <About
        bg="#0C1B2E"
        name="Artist name"
        title="A unique talent amed ipsum"
        price="1200"
        subheading="Curated by Sephora Elders"
        releaseDate="3:11:22"
        text="In the realm of photography, I dance on the threshold between fact and fiction – where emotions and life's fragments merge into something both tangible."
      />
    </>
  );
};

export default GalleryBlockItems;
