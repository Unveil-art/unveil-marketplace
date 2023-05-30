import React, { useEffect } from "react";

import OneLiner from "../../components/reusable/Oneliner";
import Title from "../../components/reusable/Title";
import Filter from "../../components/section/Filter";
import SortAndSearch from "../../components/section/SortAndSearch";
import PageHead from "../../components/general/Head";
import SearchBlockItems from "../../components/section/SearchBlockItems";
import GalleryBlockItems from "../../components/section/GalleryBlockItems";
import { getArtworks } from "lib/backend";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Gallery() {
  const router = useRouter();

  const { value } = useLocalStorage("token");
  useEffect(() => {
    console.log(value);
  }, []);
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

        <Filter />

        <GalleryBlockItems />

        {/* For searching */}
        {/* <SearchBlockItems /> */}

        <SortAndSearch />
      </main>
    </>
  );
}
