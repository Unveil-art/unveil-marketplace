import React, { useEffect, useState } from "react";

import { getCollectionById } from "lib/backend";
import Title from "@/components/reusable/Title";
import GalleryBlockItems from "@/components/section/GalleryBlockItems";
import PeopleHeader from "@/components/section/people-page/PeopleHeader";
import SearchBlockItems from "@/components/section/SearchBlockItems";
import About from "@/components/reusable/About";
import TwoBlockItems from "@/components/reusable/TwoBlockItems";
import ThreeBlockItems from "@/components/reusable/ThreeBlockItems";

const Details = ({ collection }) => {
  return (
    <main>
      <div id="top-sticky-notification-container" />
      <div className="md:mt-[120px] mt-[80px]">
        <Title title={collection.title} />
        <PeopleHeader collection={collection} />
        <div className=" my-10 md:mt-20 mb-[100px]">
          {collection && collection.artworks.length === 1 && (
            <>
              <About item={collection.artworks[0]} />
            </>
          )}
          {collection && collection.artworks.length === 2 && (
            <>
              <TwoBlockItems items={collection.artworks} />
            </>
          )}
          {collection && collection.artworks.length === 3 && (
            <>
              <ThreeBlockItems items={collection.artworks} />
            </>
          )}
          {collection && collection.artworks.length > 3 && (
            <div className="px-[15px] md:px-10">
              <SearchBlockItems items={collection.artworks} />
            </div>
          )}
        </div>
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
