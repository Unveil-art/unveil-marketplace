import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Browse from "@/components/section/people-page/Browse";
import Title from "@/components/reusable/Title";
import OneLiner from "@/components/reusable/Oneliner";
import SortPeople from "@/components/section/people-page/SortPeople";
import PeopleList from "@/components/section/people-page/PeopleList";

const People = () => {
  const [filter, setFilter] = useState(0);

  return (
    <main className="pt-[120px] min-h-screen overflow-y-hidden">
      <Title title="People" />
      <OneLiner
        text="Top art photography projects for their excellence and stunning visuals."
        info
        gallery
      />
      <Browse filter={filter} setFilter={setFilter} />
      <section className="md:flex">
        <SortPeople filter={filter} />
        <PeopleList />
      </section>
    </main>
  );
};

export default People;

// export async function getServerSideProps() {
//   const people = await getPeople();

//   return {
//     props: {
//       people,
//     },
//   };
// }
