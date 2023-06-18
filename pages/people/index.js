import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Browse from "@/components/section/people-page/Browse";
import Title from "@/components/reusable/Title";
import OneLiner from "@/components/reusable/Oneliner";
import SortPeople from "@/components/section/people-page/SortPeople";
import PeopleList from "@/components/section/people-page/PeopleList";
import { getUsers } from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";

const People = () => {
  const [filter, setFilter] = useState("artist");
  const { value } = useLocalStorage("token");
  const [people, setPeople] = useState();

  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const data = await getUsers(value, filter);

      setPeople(data);

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (value) {
      fetchUsers();
    }
  }, [value, filter]);

  useEffect(() => {
    if ("curators" in router.query) {
      setFilter("curator");
    } else {
      setFilter("artist");
    }
  }, [router.query]);

  return (
    <main className="pt-[120px] min-h-screen overflow-y-hidden">
      <Title title="People" />
      <OneLiner
        text="Top art photography projects for their excellence and stunning visuals."
        gallery
      />
      <Browse filter={filter} setFilter={setFilter} />
      <section className="md:flex">
        <SortPeople filter={filter} />
        <PeopleList people={people} />
      </section>
    </main>
  );
};

export default People;
