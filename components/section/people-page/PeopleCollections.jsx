import Collections from "@/components/reusable/Collections";
import React from "react";

const PeopleCollections = () => {
  return (
    <section className="my-10">
      <Collections />
      <Collections color="#141414" bgColor="#91B0CC" />
      <Collections color="#141414" bgColor="#F8D9AD" />
    </section>
  );
};

export default PeopleCollections;
