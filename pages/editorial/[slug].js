import React from "react";

import TextImageOne from "../../components/section/editorial-page/TextImageOne";
import Title from "../../components/reusable/Title";
import Upcoming from "../../components/section/editorial-page/Upcoming";
import AboutDrop from "../../components/section/editorial-page/AboutDrop";
import TextImageTwo from "@/components/section/editorial-page/TextImageTwo";
import Link from "@/components/section/editorial-page/Link";
import Newsletter from "@/components/section/editorial-page/Newsletter";
import TwoArticles from "@/components/reusable/TwoArticles";
import Media from "@/components/section/editorial-page/Media";
import { getEditorialDetails, getEditorials } from "lib/strapi";
import Close from "@/components/reusable/Close";

const Details = ({ data }) => {
  console.log(data.data[0].attributes);
  return (
    <main className="md:mt-[120px] relative">
      <div className="hidden md:block">
        <Title title={data.data[0].attributes.title} />
      </div>
      {data.data[0].attributes.Content.map((item, i) => (
        <div key={i}>
          {item.__component === "content-blocks.image-text-1" && (
            <TextImageOne data={item} title={data.data[0].attributes.title} />
          )}
          {item.__component === "content-blocks.image-text-2" && (
            <TextImageTwo data={item} />
          )}
          {item.__component === "content-blocks.link" && <Link data={item} />}
          {item.__component === "content-blocks.about-drop" && (
            <AboutDrop data={item} />
          )}
          {item.__component === "content-blocks.full-width-media" && (
            <Media data={item} />
          )}
          {item.__component === "content-blocks.upcoming" && (
            <Upcoming data={item} />
          )}
        </div>
      ))}

      <TwoArticles />
      <Newsletter />
      <Close />
    </main>
  );
};

export default Details;

export async function getStaticPaths() {
  const data = await getEditorials();

  const paths = data.data.map((post) => {
    return {
      params: {
        slug: `${post.attributes.slug}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getEditorialDetails(params.slug);

  return {
    props: {
      data,
    },
    revalidate: 60,
  };
}
