import React from "react";

import OneLiner from "../../components/reusable/Oneliner";
import Title from "../../components/reusable/Title";
import Filter from "../../components/section/Filter";
import TwoBlockItems from "../../components/reusable/TwoBlockItems";

export default function Home() {
  return (
    <main className="mt-[130px]">
      <Title title="Gallery" />
      <OneLiner text="Art photographers recognized for unique vision, skill, and exhibitions." />
      <Filter />

      <TwoBlockItems />
    </main>
  );
}
