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

export default function Home() {
  return (
    <>
      <Head />
      <FloatingArt />
      <GridColThree />
      <Collection
        title="Rineke Dijkstra"
        backgroundColor="#B8AE92"
        imageMargin={true}
      />
      <NewlyCurated />
      <TrustedPartners />
      <Collection
        oneLiner="New works, freshtalent. Discover the unseen."
        oneLinerLink="View All"
        oneLinerHref="/"
        title="Latest collections"
        color="#F0EDE4"
        backgroundColor="#1C1110"
      />
      <Socials />
      <RequestAccess />
      <WhyCollect />
      <Editorial />
      <FAQ />
    </>
  );
}
