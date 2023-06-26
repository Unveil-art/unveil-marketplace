import React, { useEffect, useState } from "react";
import { unfollowArtist, getFollowing } from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";

const FollowItem = ({ item, artist = false, setFollowing }) => {
  const { value } = useLocalStorage("token");

  let displayName;
  if (artist) {
    if (item.user.firstName && item.user.lastName) {
      displayName = `${item.user.firstName} ${item.user.lastName}`;
    } else if (item.user.firstName) {
      displayName = item.user.firstName;
    } else if (item.user.lastName) {
      displayName = item.user.lastName;
    } else {
      displayName = item.user.email;
    }
  }

  const handleFollowUnfollow = async () => {
    try {
      await unfollowArtist(value, { user_id: item.user_id });

      const res = await getFollowing(value);
      setFollowing(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 md:gap-10">
        <div className="max-h-[136px] max-w-[106px] relative min-h-[136px] min-w-[106px] md:max-h-[140px] md:max-w-[120px] md:min-h-[140px] md:min-w-[120px] bg-bgColor my-[10px]">
          {artist && (
            <Image
              className="object-cover w-full h-full"
              src={item.user.profileUrl}
              alt={item.user.firstName}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <h4 className="mb-2 md:mb-0 s1">{artist ? displayName : ""}</h4>
      </div>
      <p
        className="cursor-pointer b3 underline-on-hover"
        onClick={() => handleFollowUnfollow()}
      >
        Unfollow
      </p>
    </div>
  );
};

export default FollowItem;
