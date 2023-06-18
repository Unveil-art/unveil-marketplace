import React, { useEffect, useState } from "react";

import { getCollectionById } from "lib/backend";
import Title from "@/components/reusable/Title";
import GalleryBlockItems from "@/components/section/GalleryBlockItems";
import PeopleHeader from "@/components/section/people-page/PeopleHeader";
import SearchBlockItems from "@/components/section/SearchBlockItems";

const Details = ({ collection }) => {
  const [splitArray, setSplitArray] = useState([]);

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

  useEffect(() => {
    if (collection.length <= 9) {
      const variant = Math.floor(Math.random() * 2) + 1;
      const newSplitArray = splitArrayByPattern(collection, variant);
      setSplitArray(newSplitArray);
    }
  }, []);

  useEffect(() => {
    console.log(splitArray === false);
  }, [splitArray]);

  return (
    <main>
      <div className="md:mt-[120px] mt-[80px]">
        <Title title={collection.title} />
        <PeopleHeader collection={collection} />
        {splitArray && <GalleryBlockItems items={splitArray} />}
        {splitArray && (
          <div className="px-[15px] md:px-10 my-10 md:my-20">
            <SearchBlockItems items={collection.artworks} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Details;

export async function getServerSideProps({ params }) {
  const collection = await getCollectionById(params.id);

  return {
    props: {
      collection,
    },
  };
}
