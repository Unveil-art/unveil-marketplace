import React, { useEffect } from "react";

import TwoBlockItems from "../../components/reusable/TwoBlockItems";
import ThreeBlockItems from "../../components/reusable/ThreeBlockItems";
import About from "../../components/reusable/About";

const GalleryBlockItems = () => {
  const splitArrayByPattern = (arr, variant) => {
    if (arr.length !== 9) {
      throw new Error("Input array must have exactly 9 elements");
    }

    if (variant < 1 || variant > 4) {
      throw new Error("Variant must be between 1 and 4");
    }

    const patterns = [
      [3, 2, 3, 1],
      [3, 1, 3, 2],
      [1, 3, 2, 3],
      [2, 3, 1, 3],
    ];

    const pattern = patterns[variant - 1];
    let subarrays = [];
    let currentIndex = 0;

    for (const count of pattern) {
      const slice = arr.slice(currentIndex, currentIndex + count);
      subarrays.push(slice);
      currentIndex += count;
    }

    return subarrays;
  };

  useEffect(() => {
    const inputArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    const variant = 1;
    const result = splitArrayByPattern(inputArray, variant);
    console.log(result);
  }, []);
  return (
    <>
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
