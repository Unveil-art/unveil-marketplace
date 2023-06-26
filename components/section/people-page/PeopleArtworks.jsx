import React, { useState, useEffect } from "react";
import ThreeBlockItems from "@/components/reusable/ThreeBlockItems";
import AboutStats from "../../reusable/AboutStats";

import About from "@/components/reusable/About";
import TwoBlockItems from "@/components/reusable/TwoBlockItems";
import GalleryBlockItems from "../GalleryBlockItems";

const PeopleArtworks = ({ artworks }) => {
  const [splitArtworks, setSplitArtworks] = useState(null);
  const [thisYear, setThisYear] = useState(null);
  const [splitted, setSplitted] = useState(null);

  const getPattern = (length) => {
    if (length <= 9) {
      switch (length) {
        case 9:
          return [3, 3, 3];
        case 8:
          return [3, 3, 2];
        case 7:
          return [3, 3, 1];
        case 6:
          return [3, 3];
        case 5:
          return [3, 2];
        case 4:
          return [3, 1];
        case 3:
          return [3];
        case 2:
          return [2];
        case 1:
          return [1];
        default:
          return [];
      }
    } else {
      let pattern = [];
      const cycle = [3, 3, 2, 3, 3, 1];
      while (length > 0) {
        for (let i = 0; i < cycle.length && length > 0; i++) {
          if (cycle[i] <= length) {
            pattern.push(cycle[i]);
            length -= cycle[i];
          } else {
            pattern.push(length);
            length = 0;
          }
        }
      }
      return pattern;
    }
  };

  const splitArrayByPattern = (arr) => {
    let pattern;

    pattern = getPattern(arr.length);

    let subArrays = [];
    let currentIndex = 0;

    for (const count of pattern) {
      const slice = arr.slice(currentIndex, currentIndex + count);
      subArrays.push(slice);
      currentIndex += count;
    }

    return subArrays;
  };

  useEffect(() => {
    if (artworks) {
      setSplitArtworks(splitArrayByPattern(artworks));
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      setThisYear(
        artworks.filter((artwork) => new Date(artwork.created_at) >= oneYearAgo)
          .length
      );
    }
  }, [artworks]);

  useEffect(() => {
    if (splitArtworks && splitArtworks.length > 1) {
      setSplitted(splitArtworks.slice(1));
    }
  }, [splitArtworks]);

  return (
    <section className="my-10">
      {splitArtworks && splitArtworks.length > 0 && (
        <>
          {splitArtworks[0].length === 1 ? (
            <About item={splitArtworks[0][0]} bg="#54382F" />
          ) : null}
          {splitArtworks[0].length === 2 ? (
            <TwoBlockItems items={splitArtworks[0]} />
          ) : null}
          {splitArtworks[0].length === 3 ? (
            <ThreeBlockItems items={splitArtworks[0]} />
          ) : null}
        </>
      )}

      <AboutStats
        bigLetters
        h1="artworks"
        b1={artworks ? artworks.length : "0"}
        h2="New works this year"
        b2={thisYear ? thisYear : "0"}
        h3="Highest sale"
        b3="$0"
        h4="Average increase"
        b4="0%"
      />
      {splitted && splitted.length > 0 && (
        <GalleryBlockItems items={splitted} />
      )}
    </section>
  );
};

export default PeopleArtworks;
