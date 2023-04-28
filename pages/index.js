import React from "react";
import Head from "../components/general/Head";

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

import { getFAQ, getHomePage, getEditorials } from "../lib/strapi";

export default function Home({ data, faq, editorials }) {
  const homeData = data.data[0].attributes;
  const faqData = faq.data[0].attributes.faq;
  const editorialData = editorials.data;

  return (
    <>
      <Head />
      <FloatingArt data={homeData.page1} />
      <GridColThree data={homeData.page1.blocks} />
      <RequestAccess data={homeData.page6} />
      <Socials title={homeData.page6.heading} data={homeData.page6.block} />
      <Collection
        data={homeData.page2}
        title={homeData.page2.heading}
        backgroundColor={homeData.page2.backgroundcolor}
        color={homeData.page2.fontcolor}
        imageMargin={homeData.page2.margin}
      />
      <NewlyCurated data={homeData.page3} />
      <TrustedPartners data={homeData.page4} />
      <Collection
        data={homeData.page5}
        oneLiner="New works, freshtalent. Discover the unseen."
        title={homeData.page5.heading}
        backgroundColor={homeData.page5.backgroundcolor}
        color={homeData.page5.fontcolor}
        imageMargin={homeData.page5.margin}
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

  return {
    props: {
      data,
      faq,
      editorials,
    },
  };
}
