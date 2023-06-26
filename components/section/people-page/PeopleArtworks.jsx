import ThreeBlockItems from "@/components/reusable/ThreeBlockItems";
import React, { useEffect, useState } from "react";
import AboutStats from "../../reusable/AboutStats";
import { getArtworkByArtistId } from "lib/backend"
import GalleryBlockItems from "../GalleryBlockItems";
import Loader from "@/components/svg/Loader";

const getPattern = (length) => {
  switch (length) {
    case 9:
      return [3, 2, 3, 1];
    case 8:
      return [3, 2, 3];
    case 7:
      return [3, 1, 2, 1];
    case 6:
      return [3, 1, 2];
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
      return [length];
  }
};

const splitArrayByPattern = (arr, variant) => {
  let pattern;

  if (arr.length < 9) {
    // If the array length is less than 9, always use pattern 1
    pattern = getPattern(arr.length);
  } else {
    // Otherwise, select the pattern based on the variant
    const patterns = [
      getPattern(arr.length),
      [3, 1, 3, 2],
      [1, 3, 2, 3],
      [2, 3, 1, 3],
    ];
    pattern = patterns[variant - 1];
  }

  let subArrays = [];
  let currentIndex = 0;

  for (const count of pattern) {
    const slice = arr.slice(currentIndex, currentIndex + count);
    subArrays.push(slice);
    currentIndex += count;
  }

  return subArrays;
};

const PeopleArtworks = ({ userId }) => {

  const [artwork, setArtwork] = useState([])
  const [variant, setVariant] = useState(1)
  const [loading, setLoading] = useState(false)
  // state for pagination in future
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    fetchArtworks(userId)
  }, [userId])

  const fetchArtworks = async (userId) => {
    setLoading(true)
    try {
      const arts = await getArtworkByArtistId(userId)
      const _variant = Math.floor(Math.random() * 2) + 1;
      setVariant(_variant)
      const artResult = splitArrayByPattern(arts, _variant)
      console.log(artResult)
      setArtwork(artResult)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

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
      {
        loading ? (
          <div className="h-[25px] animate-spin justify-center flex items-center">
            <Loader />
          </div>
        ) : (
          <GalleryBlockItems items={artwork} />
        )
      }
    </section>
  );
};

export default PeopleArtworks;
