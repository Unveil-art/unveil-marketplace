import React from "react";

import TextImageOne from "../../components/section/editorial-page/TextImageOne";
import Title from "../../components/reusable/Title";
import Upcoming from "../../components/section/editorial-page/Upcoming";
import AboutStats from "../../components/reusable/AboutStats";
import TextImageTwo from "@/components/section/editorial-page/TextImageTwo";
import Link from "@/components/section/editorial-page/Link";
import Newsletter from "@/components/section/editorial-page/Newsletter";
import TwoArticles from "@/components/reusable/TwoArticles";
import Media from "@/components/section/editorial-page/Media";
import {
  getEditorialDetails,
  getEditorials,
  getTwoEditorials,
} from "lib/strapi";
import Close from "@/components/reusable/Close";
import OneLiner from "@/components/reusable/Oneliner";

const Details = ({ data, recent }) => {
  return (
    <main className="md:mt-[120px] relative">
      <div className="hidden md:block">
        <Title title={data.data[0].attributes.Title} />
      </div>
      {data.data[0].attributes.Content.map((item, i) => (
        <div key={i}>
          {item.__component === "content-blocks.one-liner" && (
            <OneLiner text={item.description} nmb />
          )}
          {item.__component === "content-blocks.image-text-1" && (
            <TextImageOne data={item} title={data.data[0].attributes.title} />
          )}
          {item.__component === "content-blocks.image-text-2" && (
            <TextImageTwo data={item} />
          )}
          {item.__component === "content-blocks.link" && <Link data={item} />}
          {item.__component === "content-blocks.about-drop" && (
            <AboutStats
              title={item.Title}
              h1="Release date"
              b1={item.Release_date}
              h2="Edition size"
              b2={item.Edition_size}
              h3="Early access NFTs"
              b3={item.Early_acces_NFTs}
              h4="NFTs"
              b4={item.NFTs}
            />
          )}
          {item.__component === "content-blocks.full-width-media" && (
            <Media data={item} />
          )}
          {item.__component === "content-blocks.upcoming" && (
            <Upcoming data={item} />
          )}
        </div>
      ))}

      <TwoArticles data={recent.data} />
      <Newsletter />
      <Close />
    </main>
  );
};

export default Details;

export async function getStaticPaths() {
  const data = await getEditorials();

  if (!data) {
    return { paths: [], fallback: false };
  }

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
  const recent = await getTwoEditorials();

  return {
    props: {
      data,
      recent,
      edit,
    },
    revalidate: 60,
  };
}
