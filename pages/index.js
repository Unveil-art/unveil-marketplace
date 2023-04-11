import React from "react";
import Head from "../components/general/Head";

import FloatingArt from "../components/section/FloatingArt";
import GridColThree from "../components/section/GridColThree";
import Collection from "../components/section/Collection";
import TrustedPartners from "../components/section/TrustedPratners";
import Socials from "../components/section/Socials";
import RequestAccess from "../components/section/RequestAccess";
import FAQ from "../components/section/FAQ";
import WhyCollect from "../components/section/WhyCollect";
import NewlyCurated from "../components/section/NewlyCurated";
import Editorial from "../components/section/Editorial";

import { getFAQ, getHomePage } from "../lib/strapi";

export default function Home({ data, faq }) {
  const homeData = data.data[0].attributes;
  console.log(faq);

  return (
    <>
      <Head />
      <FloatingArt data={homeData.page1} />
      <GridColThree data={homeData.page1.blocks} />
      <Collection
        data={homeData.page2}
        title={homeData.page2.heading}
        backgroundColor="#B8AE92"
        imageMargin={true}
      />
      <NewlyCurated data={homeData.page3} />
      <TrustedPartners data={homeData.page4} />
      <Collection
        data={homeData.page2}
        oneLiner="New works, freshtalent. Discover the unseen."
        title={homeData.page5.heading}
        color="#F0EDE4"
        backgroundColor="#1C1110"
      />
      <Socials title={homeData.page6.heading} data={homeData.page6.block} />
      <RequestAccess data={homeData.page6} />
      <WhyCollect data={homeData.page7} />
      <Editorial data={homeData.page8} />
      <FAQ data={faq.data[0].attributes.faq.block} />
    </>
  );
}

export async function getStaticProps() {
  const data = await getHomePage();
  const faq = await getFAQ();

  return {
    props: {
      data,
      faq,
    },
  };
}
