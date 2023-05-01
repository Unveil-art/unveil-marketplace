import React, { useState } from "react";

import Browse from "@/components/section/people-page/Browse";
import Title from "@/components/reusable/Title";
import OneLiner from "@/components/reusable/Oneliner";

const People = () => {
  const [filter, setFilter] = useState(0);
  return (
    <main className="pt-[120px] min-h-screen">
      <Title title="People" />
      <OneLiner
        text="Top art photography projects for their excellence and stunning visuals."
        info
      />
      <Browse filter={filter} setFilter={setFilter} />
    </main>
  );
};

export default People;
