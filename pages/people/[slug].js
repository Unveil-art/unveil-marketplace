import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Title from "@/components/reusable/Title";
import PeopleHeader from "@/components/section/people-page/PeopleHeader";
import PageSelector from "@/components/section/people-page/PageSelector";
import PeopleArtworks from "@/components/section/people-page/PeopleArtworks";
import PeopleCollections from "@/components/section/people-page/PeopleCollections";
import PeopleAbout from "@/components/section/people-page/PeopleAbout";
import FAQ from "@/components/section/FAQ";
import { getFAQ } from "lib/strapi";
import { getUserInfo } from "lib/backend";

const PeopleDetails = ({ faq, userId }) => {
  const faqData = faq.data[0].attributes.faq;
  const [page, setPage] = useState(0);
  
  useEffect(() => {
      fetchCollection(userId);
  }, []);
  console.log('userId', userId);
  const [collection, setCollections] = useState([]);
  const router = useRouter();

  const fetchCollection = async (userId) => {
    if(userId){
      try {
        let value = userId;
        const data = await getUserInfo(value);
        setCollections(data);
        return data;
      } catch (err) {
        console.error(err);
      }
    }
    
  };

  return (
    <main className="mt-[120px]">
      <Title title={collection? collection.firstName+" "+collection.lastName : ''} account={collection ? collection.role : ''} />
      <PeopleHeader />
      <PageSelector setPage={setPage} page={page} />
      {page === 0 && <PeopleArtworks />}
      {page === 1 && <PeopleCollections />}
      {page === 2 && <PeopleAbout />}
      <FAQ data={faqData.block} />
    </main>
  );
};

export default PeopleDetails;

export async function getServerSideProps({ params: { slug } }) {
  const faq = await getFAQ();
  return {
    props: {
      faq,
      userId: slug
    },
  };
}
