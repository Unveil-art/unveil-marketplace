import OneLiner from "@/components/reusable/Oneliner";
import Title from "@/components/reusable/Title";
import React from "react";

import { getEditorials, getEditorialPage } from "../../lib/strapi";
import Articles from "../../components/reusable/Articles";
import FeaturedIn from "../../components/section/editorial-page/FeaturedIn";
import ArtistAnnouncement from "../../components/section/editorial-page/ArtistAnnouncement";
import Newsletter from "../../components/section/editorial-page/Newsletter";
import UpcomingDrop from "../../components/section/editorial-page/UpcomingDrop";
import ArtistHighlights from "@/components/section/editorial-page/ArtistHighlights";

export default function EditorialPage({ data, editorial }) {
  const editorialData = data.data;
  const editorialPageData = editorial.data[0].attributes;
  const editorial1to5 = editorialData.slice(0, 5);
  const editorial5to9 = editorialData.slice(5, 9);
  console.log(editorialPageData);

  return (
    <main className="mt-[120px]">
      <Title title="Editorial" />
      <OneLiner text="Top art photography projects for their excellence and stunning visuals." />
      {editorial1to5.length > 2 && (
        <section className="px-[15px] md:px-10">
          <Articles data={editorial1to5} />
        </section>
      )}
      <FeaturedIn data={editorialPageData.page1} />
      <ArtistAnnouncement data={editorialPageData.page2} />
      <Newsletter data={editorialPageData.page3} />
      <UpcomingDrop data={editorialPageData.page4} />
      <ArtistHighlights data={editorialPageData.page5} />
      <ArtistAnnouncement data={editorialPageData.page6} />
      {editorial5to9.length > 3 && (
        <>
          <section className="px-[15px] md:px-10">
            <Articles data={editorial5to9} homePage />
          </section>
          <ArtistAnnouncement data={editorialPageData.page7} />
        </>
      )}
    </main>
  );
}

export async function getServerSideProps() {
  const data = await getEditorials();
  const editorial = await getEditorialPage();

  return {
    props: {
      data,
      editorial,
    },
  };
}
