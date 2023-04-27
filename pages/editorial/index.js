import OneLiner from "@/components/reusable/Oneliner";
import Title from "@/components/reusable/Title";
import React from "react";

import { getHomePage } from "../../lib/strapi";
import Articles from "../../components/reusable/Articles";
import FeaturedIn from "../../components/section/editorial-page/FeaturedIn";
import ArtistAnnouncement from "../../components/section/editorial-page/ArtistAnnouncement";
import Newsletter from "../../components/section/editorial-page/Newsletter";
import UpcomingDrop from "../../components/section/editorial-page/UpcomingDrop";
import ArtistHighlights from "@/components/section/editorial-page/ArtistHighlights";

export default function EditorialPage({ data }) {
  const homeData = data.data[0].attributes;

  return (
    <main className="mt-[120px]">
      <Title title="Editorial" />
      <OneLiner text="Top art photography projects for their excellence and stunning visuals." />
      <section className="px-[15px] md:px-10">
        <Articles data={homeData.page8} />
      </section>
      <FeaturedIn data={homeData.page4} />
      <ArtistAnnouncement />
      <Newsletter />
      <UpcomingDrop />
      <ArtistHighlights />
      <ArtistAnnouncement />
      <section className="px-[15px] md:px-10">
        <Articles data={homeData.page8} />
      </section>
      <ArtistAnnouncement />
    </main>
  );
}

export async function getServerSideProps() {
  const data = await getHomePage();

  return {
    props: {
      data,
    },
  };
}
