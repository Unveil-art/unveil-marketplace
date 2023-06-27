import React, { useEffect, useState } from "react";
import AboutStats from "../../reusable/AboutStats";
import { getArtworkByArtistId } from "lib/backend"
import GalleryBlockItems from "../GalleryBlockItems";
import Loader from "@/components/svg/Loader";
import { splitArrayByPattern } from 'lib/utils'



const PeopleArtworks = ({ userId }) => {

  const [artwork, setArtwork] = useState([])
  const [totalArts, setTotalArts] = useState(0);
  const [variant, setVariant] = useState(1)
  const [loading, setLoading] = useState(false)
  // state for pagination in future
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    fetchArtworks(userId)
  }, [userId])

  const fetchArtworks = async (userId) => {
    setLoading(true)
    try {
      const arts = await getArtworkByArtistId(userId)
      setTotalArts(arts.length ?? 0)
      const _variant = Math.floor(Math.random() * 2) + 1;
      setVariant(_variant)
      const artResult = splitArrayByPattern(arts, _variant)
      setArtwork(artResult)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <section className="my-10">
      {/* <ThreeBlockItems /> */}
      <AboutStats
        bigLetters
        h1="artworks"
        b1={totalArts}
        h2="New works this year"
        b2={totalArts}
        h3="Highest sale"
        b3="$0"
        h4="Average increase"
        b4="0%"
      />
      {/* <ThreeBlockItems /> */}
      {
        loading ? (
          <div className="h-[25px] animate-spin justify-center flex items-center">
            <Loader />
          </div>
        ) : (
          <GalleryBlockItems items={artwork} />
        )
      }
    </section>
  );
};

export default PeopleArtworks;
