import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import Title from "@/components/reusable/Title";
import PeopleHeader from "@/components/section/people-page/PeopleHeader";
import PageSelector from "@/components/section/people-page/PageSelector";
import PeopleArtworks from "@/components/section/people-page/PeopleArtworks";
import PeopleCollections from "@/components/section/people-page/PeopleCollections";
import PeopleAbout from "@/components/section/people-page/PeopleAbout";
import FAQ from "@/components/section/FAQ";
import {
  getUserInfo,
  getArtistsArtwork,
  getArtistCollections,
} from "lib/backend";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import { Web3Context } from "@/contexts/Web3AuthContext";

const PeopleDetails = ({ userId, user }) => {
  const [page, setPage] = useState(0);
  const [artworks, setArtworks] = useState(null);
  const [collections, setCollections] = useState();
  const { authenticated } = useIsAuthenticated();

  useEffect(() => {
    getArtistsArtwork(userId).then((result) => setArtworks(result.data));
    getArtistCollections(userId).then((result) => setCollections(result.data));
  }, []);

  let displayName = "";
  if (user) {
    if (user.firstName && user.lastName) {
      displayName = user.firstName + " " + user.lastName;
    } else if (user.email) {
      displayName = user.email.split("@")[0].replace(".", " ");
    }
  }

  return (
    <main className="mt-[120px] ">
      <Title
        title={displayName}
        account={user !== undefined ? user.role : ""}
      />
      <PeopleHeader people={user} />
      <PageSelector setPage={setPage} page={page} role={user.role} />
      {page === 0 && <PeopleArtworks artworks={artworks} role={user.role} />}
      {page === 1 && <PeopleCollections collections={collections} />}
      {page === 2 && (
        <PeopleAbout
          details={user}
          displayName={displayName}
          collections={collections}
        />
      )}
    </main>
  );
};

export default PeopleDetails;

export async function getServerSideProps({ params: { slug } }) {
  const data = await getUserInfo(slug);

  return {
    props: {
      user: data,
      userId: slug,
    },
  };
}
