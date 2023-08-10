import React from "react";

import FloatingArt from "../components/section/FloatingArt";
import GridColThree from "../components/section/GridColThree";
import Collection from "../components/section/Collection";
import TrustedPartners from "../components/section/TrustedPartners";
import Socials from "../components/section/Socials";
import RequestAccess from "../components/section/RequestAccess";
import FAQ from "../components/section/FAQ";
import WhyCollect from "../components/section/WhyCollect";
import NewlyCurated from "../components/section/NewlyCurated";
import Editorial from "../components/section/Editorial";
import HomepageHero from "@/components/section/HomepageHero";

import { getFAQ, getHomePage, getEditorials } from "../lib/strapi";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import { getFeaturedArtworks, getLatestArtworks } from "lib/backend";
import * as Vibrant from "node-vibrant";

export default function Home({
  data,
  faq,
  editorials,
  artworks,
  featuredArtworks,
}) {
  const homeData = data.data[0].attributes;
  const faqData = faq.data[0].attributes.faq;
  const editorialData = editorials.data;
  const { authenticated } = useIsAuthenticated();

  return (
    <>
      <HomepageHero data={homeData.page1} featuredArtworks={featuredArtworks} />
      {/* <FloatingArt data={homeData.page1} /> */}
      <GridColThree data={homeData.page1.blocks} />
      <NewlyCurated data={homeData.page3} artworks={artworks} />
      <Collection
        data={homeData.page5}
        oneLiner={homeData.page5.oneliner}
        title={homeData.page5.heading}
        backgroundColor={homeData.page5.backgroundcolor}
        color={homeData.page5.fontcolor}
        imageMargin={homeData.page5.margin}
      />
      <Socials title={homeData.page6.heading} data={homeData.page6.block} />
      <Collection
        data={homeData.page2}
        title={homeData.page2.heading}
        backgroundColor={homeData.page2.backgroundcolor}
        color={homeData.page2.fontcolor}
        imageMargin={homeData.page2.margin}
      />
      <TrustedPartners data={homeData.page4} />
      <RequestAccess
        data={homeData.page6}
        request={homeData.page1.request_access}
      />
      <WhyCollect data={homeData.page7} />
      <Editorial data={homeData.page8} editorial={editorialData} />
      <FAQ data={faqData.block} />
    </>
  );
}

export async function getServerSideProps() {
  const data = await getHomePage();
  const faq = await getFAQ();
  const editorials = await getEditorials();
  const artworks = await getLatestArtworks();
  const featuredArtworks = await getFeaturedArtworks();

  const modifiedFeaturedArtworks = await Promise.all(
    featuredArtworks.map(async (artwork) => {
      let v = new Vibrant(artwork.media_url, {
        colorCount: 1,
      });
      const palette = await Vibrant.from(artwork.media_url).getPalette();

      return {
        ...artwork,
        vibrant_color: palette.Vibrant.hex,
      };
    })
  );

  return {
    props: {
      data,
      faq,
      editorials,
      artworks,
      featuredArtworks: modifiedFeaturedArtworks,
    },
  };
}
