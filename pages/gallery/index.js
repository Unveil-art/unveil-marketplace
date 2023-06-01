import React, { useState, useEffect } from "react";

import OneLiner from "../../components/reusable/Oneliner";
import Title from "../../components/reusable/Title";
import Filter from "../../components/section/Filter";
import SortAndSearch from "../../components/section/SortAndSearch";
import PageHead from "../../components/general/Head";
import SearchBlockItems from "../../components/section/SearchBlockItems";
import GalleryBlockItems from "../../components/section/GalleryBlockItems";
import { getArtworks, getCollections } from "lib/backend";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import LoadMore from "@/components/section/gallery-page/LoadMore";
import Loader from "@/components/svg/Loader";

export default function Gallery({ artworks }) {
  const [artworkSplit, setArtworkSplit] = useState([]);
  const [collectionSplit, setCollectionSplit] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [variant, setVariant] = useState(1);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState(0);
  const [artist, setArtist] = useState(0);
  const [medium, setMedium] = useState(0);

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

  const fetchFirstCollections = async () => {
    const more = await getCollections(0, 9);
    const variant = Math.floor(Math.random() * 2) + 1;
    const result = splitArrayByPattern(more, variant);
    setVariant(1);
    setPagination(0);
    setCollectionSplit(result);
  };

  const fetchFirstArtworks = async () => {
    const more = await getArtworks(0, 9);
    const variant = Math.floor(Math.random() * 2) + 1;
    const result = splitArrayByPattern(more, variant);
    setVariant(1);
    setPagination(0);
    setArtworkSplit(result);
  };

  const fetchItems = async (p, setItems, getItems) => {
    setLoading(true);
    const more = await getItems(9 * p, 9);
    let newVariant;

    if (variant === 1 || variant === 2) {
      newVariant = Math.floor(Math.random() * 4) + 1; // random number between 1 and 4
    } else if (variant === 3 || variant === 4) {
      newVariant = Math.floor(Math.random() * 2) + 1; // random number between 1 and 2
    }

    const result = splitArrayByPattern(more, newVariant);
    setVariant(newVariant);
    setItems((prevSplit) => prevSplit.concat(result));
    setLoading(false);
  };

  useEffect(() => {
    const variant = Math.floor(Math.random() * 2) + 1;
    setVariant(variant);
    const result = splitArrayByPattern(artworks, variant);
    setArtworkSplit(result);

    fetchFirstCollections();
  }, []);

  useEffect(() => {
    setPagination(0);
    if (category === 0) {
      fetchFirstArtworks();
    }
    if (category === 1) {
      fetchFirstCollections();
    }
  }, [category]);

  useEffect(() => {
    if (pagination > 0 && category === 0) {
      fetchItems(pagination, setArtworkSplit, getArtworks);
    }
    if (pagination > 0 && category === 1) {
      fetchItems(pagination, setCollectionSplit, getCollections);
    }
  }, [pagination]);

  return (
    <>
      <PageHead />
      <main className="mt-24 md:mt-[130px]">
        <Title title="Gallery" />
        <OneLiner
          text="Art photographers recognized for unique vision, skill, and exhibitions."
          info={true}
          gallery={true}
        />

        <Filter
          category={category}
          setCategory={setCategory}
          artist={artist}
          setArtist={setArtist}
          medium={medium}
          setMedium={setMedium}
        />

        {category === 0 && <GalleryBlockItems items={artworkSplit} />}
        {category === 1 && <GalleryBlockItems items={collectionSplit} />}

        {/* For searching */}
        {/* <SearchBlockItems /> */}

        <button
          onClick={() => setPagination(pagination + 1)}
          className="mx-auto btn btn-secondary w-[128px] block mb-[100px] cursor-pointer"
        >
          {loading && (
            <div className="h-[25px] justify-center flex items-center">
              <Loader />
            </div>
          )}

          {!loading && <p>Load more</p>}
        </button>

        <SortAndSearch />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const artworks = await getArtworks(0, 9);

  return {
    props: {
      artworks,
    },
  };
}
