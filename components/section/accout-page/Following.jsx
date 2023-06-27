import React, { useEffect, useState } from "react";
import ArtworkListItem from "../../reusable/ArtworkListItem";
import Animate from "@/components/reusable/Animate";
import { getFollowingList, unfollowArtist } from "lib/backend";
import ArtistCard from "@/components/reusable/ArtistCard";

const Following = () => {
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(false)
  const [render, setRender] = useState(false)

  const fetchFollowing = async (token, skip, limit) => {
    setLoading(true)
    try {
      const _following = await getFollowingList(token, skip, limit)
      setFollowing(_following)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const unfollowUser = async (userId) => {
    if(!userId) return
    try {
      const data = {
        user_id: userId
      }
      const token = localStorage.getItem("token")
      if(!token) throw Error("User not logged in!")

      const res = await unfollowArtist(token, data)
      setRender(prev => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const value = localStorage.getItem("token")
    if(value) {
      fetchFollowing(value, 0, 10)
    } else {
      console.log(`User not logged in`)
    }
  }, [render])

  return (
    <Animate options={{ alpha: true }}>
      <div className="ml-[40px] pt-[80px] md:pt-[160px] md:ml-[35svw] pr-[15px] md:pr-10 pb-10">
        <h3 className="b3 text-[17px] mb-[10px]">Artists</h3>
        <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
        {/* {[1].map((item, i) => (
        <ArtworkListItem key={i} />
        ))} */console.log(following)}
        {
          following?.length <= 0 ? (
            <div className="flex items-center gap-4 mb-20 md:gap-10">
              <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
              <h5 className="s1 opacity-60 ">No followed artists yet</h5>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-start">
              {
                following.map(({ user }, index) => (
                  <ArtistCard key={index} user={user} handleUnFollow={() => unfollowUser(user?.id)} />
                ))
              }
            </div>
          )
        }
        {/* <h3 className="b3 text-[17px] mb-[10px]">Artwork</h3>
        <hr className="mb-[15px] h-[2px] bg-unveilGreen" /> */}
        {/* {[1].map((item, i) => (
        <ArtworkListItem key={i} />
        ))} */}
        {/* <div className="flex items-center gap-4 mb-20 md:gap-10">
          <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
          <h5 className="s1 opacity-60 ">No followed artworks yet</h5>
        </div> */}
      </div>
    </Animate>
  );
};

export default Following;
