import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getArtistRecognitions,
  unfollowArtist,
  isFollowed,
  postFollower,
  getUserMe,
} from "lib/backend";
import Loader from "../svg/Loader";

const AboutCurator = ({ owner }) => {
  const [recognitions, setRecognitions] = useState([]);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState({});
  const [more, setMore] = useState(false);

  // Owner name to string
  let displayName;
  if (owner.firstName && owner.lastName) {
    displayName = `${owner.firstName} ${owner.lastName}`;
  } else if (owner.firstName) {
    displayName = owner.firstName;
  } else if (owner.lastName) {
    displayName = owner.lastName;
  } else {
    displayName = owner.email;
  }

  const handleFollowUnfollow = (isFollow) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (isFollow) {
      //unfollow code
      unfollowArtist(token, { user_id: owner.id })
        .then((res) => setFollowing(false))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      // follow code
      postFollower(token, { user_id: owner.id })
        .then((res) => setFollowing(true))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  const getRecognitions = async (artist_id) => {
    const data = await getArtistRecognitions(artist_id);
    setRecognitions(data);
  };

  useEffect(() => {
    if (owner.id) {
      getRecognitions(owner.id);
      const token = localStorage.getItem("token");
      setLoading(true);
      isFollowed(token, owner.id)
        .then((res) => setFollowing(res.data))
        .catch((err) => {
          console.log(err);
          setFollowing(false);
        })
        .finally(() => setLoading(false));

      getUserMe(token)
        .then((res) => setAuthUser(res))
        .catch((err) => console.log(err));
    }
  }, [owner]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative w-full h-screen bg-bgColor">
        {owner.profileUrl && (
          <Image
            src={owner.profileUrl}
            alt={owner.displayName}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div className="relative bg-unveilBlack text-unveilWhite">
        <h3 className="pr-10 -rotate-90 -translate-x-[25%] translate-y-full h1 w-fit ">
          About
        </h3>
        <div className="w-[55%] mt-auto md:pt-0 pr-[15px] pb-10 ml-auto md:ml-[35%] h-fit">
          <div className="flex items-end gap-2 flex-nowrap">
            <p className="b3">By</p>
            <Link href={`/people/${owner.id}`}>
              <p className="md:max-w-[300px] max-w-[150px] truncate l2">
                {displayName}
              </p>
            </Link>
          </div>

          <h4
            onClick={() => setMore((prev) => !prev)}
            className={`${
              more ? "md:line-clamp-6" : "line-clamp-[10] md:line-clamp-6"
            } mt-5 mb-10 overflow-hidden b2 cursor-pointer md:h2`}
          >
            {owner.description}
          </h4>
          <div className="mb-5">
            {recognitions.map(({ id, recognition_type, description }) => (
              <p
                key={id}
                className="py-1 border-b cursor-pointer b3 md:b4 border-unveilWhite"
              >
                x {description} ({recognition_type})
              </p>
            ))}

            <p className="py-1 truncate w-[100px] cursor-pointer b3 md:b4 border-unveilWhite">
              {owner?.walletAddress?.slice(0, 4).toLowerCase()}...
              {owner?.walletAddress?.slice(-4).toLowerCase()}
            </p>
          </div>
          {owner.id !== authUser.id && (
            <button
              className="btn btn-secondary hover:bg-[#292928] btn-full border-unveilWhite"
              onClick={() => handleFollowUnfollow(following)}
            >
              {loading ? (
                <div className="h-[25px] animate-spin justify-center flex items-center">
                  <Loader color="#F7F4ED" />
                </div>
              ) : following ? (
                `Following`
              ) : (
                `Follow artist`
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutCurator;
