import React, { useEffect, useState } from "react";
import { getCollectionByArtistId } from "lib/backend";
import { splitArrayByPattern } from "lib/utils";
import GalleryBlockItems from "../GalleryBlockItems";
import Loader from "@/components/svg/Loader";

const PeopleCollections = ({ userId }) => {
  const [userCollection, setUserCollection] = useState([])
  const [variant, setVariant] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchUserCollection = async (userId) => {
    // API fetching code
    setLoading(true)
    try {
      const _collections = await getCollectionByArtistId(userId);
      const _variant = Math.floor(Math.random() * 2) + 1;
      setVariant(_variant)
      const _collectionResult = splitArrayByPattern(_collections, _variant);
      setUserCollection(_collectionResult)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUserCollection(userId)
  }, [userId])

  return (
    <section className="my-10">
      {
        loading ? (
          <div className="h-[25px] animate-spin justify-center flex items-center">
            <Loader />
          </div>
        ) : (
          <GalleryBlockItems items={userCollection} />
        )
      }
    </section>
  );
};

export default PeopleCollections;
