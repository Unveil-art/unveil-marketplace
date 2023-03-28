import React from "react";

import OneLiner from "../../components/reusable/Oneliner";
import Title from "../../components/reusable/Title";
import Filter from "../../components/section/Filter";
import SortAndSearch from "../../components/section/SortAndSearch";
import PageHead from "../../components/general/Head";
import SearchBlockItems from "../../components/section/SearchBlockItems";
import GalleryBlockItems from "../../components/section/GalleryBlockItems";

export default function Gallery() {
  return (
    <>
      <PageHead />
      <main className="mt-[130px]">
        <Title title="Gallery" />
        <OneLiner
          text="Art photographers recognized for unique vision, skill, and exhibitions."
          info={true}
        />

        <Filter />

        <GalleryBlockItems />

        {/* For searching */}
        {/* <SearchBlockItems /> */}

        <SortAndSearch />
      </main>
    </>
  );
}
