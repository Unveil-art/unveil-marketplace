import OneLiner from "@/components/reusable/Oneliner";
import Title from "@/components/reusable/Title";
import React from "react";

import { getEditorials, getHomePage } from "../../lib/strapi";
import Articles from "../../components/reusable/Articles";
import FeaturedIn from "../../components/section/editorial-page/FeaturedIn";
import ArtistAnnouncement from "../../components/section/editorial-page/ArtistAnnouncement";
import Newsletter from "../../components/section/editorial-page/Newsletter";
import UpcomingDrop from "../../components/section/editorial-page/UpcomingDrop";
import ArtistHighlights from "@/components/section/editorial-page/ArtistHighlights";

export default function EditorialPage({ data }) {
  const editorialData = data.data;
  const editorial1to5 = editorialData.slice(0, 5);
  const editorial5to9 = editorialData.slice(5, 9);
  console.log(editorial5to9);

  return (
    <main className="mt-[120px]">
      <Title title="Editorial" />
      <OneLiner text="Top art photography projects for their excellence and stunning visuals." />
      {editorial1to5.length > 2 && (
        <section className="px-[15px] md:px-10">
          <Articles data={editorial1to5} />
        </section>
      )}
      {/* <FeaturedIn data={homeData.page4} /> */}
      <ArtistAnnouncement />
      <Newsletter />
      <UpcomingDrop />
      <ArtistHighlights />
      <ArtistAnnouncement />
      {editorial5to9.length > 2 && (
        <section className="px-[15px] md:px-10">
          <Articles data={editorial5to9} homePage />
        </section>
      )}
      <ArtistAnnouncement />
    </main>
  );
}

export async function getServerSideProps() {
  const data = await getEditorials();

  return {
    props: {
      data,
    },
  };
}
