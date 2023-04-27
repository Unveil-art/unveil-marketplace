import React from "react";

import TextImageOne from "../../components/section/editorial-page/TextImageOne";
import Title from "../../components/reusable/Title";
import Close from "../../components/reusable/Close";
import AboutDrop from "../../components/section/editorial-page/AboutDrop";
import TextImageTwo from "@/components/section/editorial-page/TextImageTwo";
import Link from "@/components/section/editorial-page/Link";
import Newsletter from "@/components/section/editorial-page/Newsletter";
import TwoArticles from "@/components/reusable/TwoArticles";
import Media from "@/components/section/editorial-page/Media";

const Details = () => {
  return (
    <main className="md:mt-[120px] relative">
      <div className="hidden md:block">
        <Title title="Title" />
      </div>
      <TextImageOne />
      <AboutDrop />
      <TextImageTwo />
      <Link />
      <Media />

      <TwoArticles />
      <Newsletter />
      <Close />
    </main>
  );
};

export default Details;
