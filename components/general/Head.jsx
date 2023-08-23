import React from "react";
import Head from "next/head";

const PageHead = () => {
  return (
    <Head>
      <title>
        Unveil - A curated platform for photography NFTs and prints.
      </title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="Collect your preferred format: print or digital artworks. Immutable proof of authenticity - immaculate provenance. Confidently know the value of your purchase."
      />
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
};

export default PageHead;
