import React, { useEffect, useState } from "react";
import ArtworkListItem from "../../reusable/ArtworkListItem";
import Animate from "@/components/reusable/Animate";
import { getFollowing } from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";
import FollowItem from "./FollowItem";

const Following = () => {
  const [following, setFollowing] = useState(null);
  const { value } = useLocalStorage("token");

  useEffect(() => {
    if (value) {
      getFollowing(value).then((result) => setFollowing(result.data));
    }
  }, [value]);

  useEffect(() => {
    console.log(following);
    console.log(following);
    console.log(following);
    console.log(following);
  }, [following]);

  return (
    <Animate options={{ alpha: true }}>
      <div className="ml-[40px] pt-[80px] md:pt-[160px] md:ml-[35svw] pr-[15px] md:pr-10 pb-10">
        <h3 className="b3 text-[17px] mb-[10px]">Artists</h3>
        <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
        {following && following.length > 0 && (
          <div className="mb-20">
            {following.map((item, i) => (
              <FollowItem
                key={i}
                item={item}
                artist={true}
                setFollowing={setFollowing}
              />
            ))}
          </div>
        )}

        {following && following.length === 0 && (
          <div className="flex items-center gap-4 mb-20 md:gap-10">
            <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
            <h5 className="s1 opacity-40 ">No followed artists yet</h5>
          </div>
        )}

        {/* <h3 className="b3 text-[17px] mb-[10px]">Artwork</h3>
        <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
        {/* {[1].map((item, i) => (
        <ArtworkListItem key={i} />
      ))} 
        <div className="flex items-center gap-4 mb-20 md:gap-10">
          <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
          <h5 className="s1 opacity-60 ">No followed artworks yet</h5>
        </div> */}
      </div>
    </Animate>
  );
};

export default Following;
