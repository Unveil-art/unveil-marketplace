import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getFollowerInfo,
  postFollower,
  isFollowed,
  unfollowArtist,
} from "lib/backend";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { toast } from "react-toastify";
import { getUserName } from "lib/utils";
import Loader from "@/components/svg/Loader";

const PeopleHeader = ({ collection, people }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(false);

  const { value } = useLocalStorage("token");

  function formatInstagramUrl(url) {
    url = url.endsWith("/") ? url.slice(0, -1) : url;

    var parts = url.split("/");

    var handle = parts[parts.length - 1];

    handle = "@" + handle;

    return handle;
  }

  function formatDate(inputString) {
    let date = new Date(inputString);
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1; // JavaScript months are 0-11
    let year = date.getUTCFullYear().toString().substr(2, 2); // Get last 2 digits of year

    // Return the formatted string
    return `${day}.${month}.${year}`;
  }

  let displayName;
  if (collection) {
    if (collection.owner.firstName && collection.owner.lastName) {
      displayName = `${collection.owner.firstName} ${collection.owner.lastName}`;
    } else if (collection.owner.firstName) {
      displayName = collection.owner.firstName;
    } else if (collection.owner.lastName) {
      displayName = collection.owner.lastName;
    } else {
      displayName = collection.owner.email;
    }
  }

  const fetchUser = async () => {
    const data = await getFollowerInfo(people.id);
    setFollowers(data.followers);
  };

  const handleFollowUnfollow = (isFollow) => {
    setLoading(true);
    if (isFollow) {
      unfollowArtist(value, { user_id: people.id })
        .then((res) => setFollowing(false))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      postFollower(value, { user_id: people.id })
        .then((res) => setFollowing(true))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (people && value) {
      fetchUser(people.id);
      setLoading(true);
      isFollowed(value, people.id)
        .then((res) => setFollowing(res.data))
        .catch((err) => {
          console.log(err);
          setFollowing(false);
        })
        .finally(() => setLoading(false));
    }
  }, [value]);

  return (
    <section className="ml-[40px] md:ml-[35svw] pt-20 pr-[15px] md:mt-0 md:pr-[40px]">
      {collection && typeof collection != "string" && (
        <p className="s2 my-[60px] md:block hidden ">
          {collection.description}
        </p>
      )}
      <div className="justify-between md:flex">
        <div>
          <div className="flex gap-[15px] w-full justify-between md:justify-start">
            <div className="min-w-[90px]">
              <p className="b4">
                {collection && typeof collection != "string"
                  ? "Artworks"
                  : "Followers"}
              </p>
              <p className="text-[27px]">
                {collection && typeof collection != "string" && (
                  <>{collection.artworks.length}</>
                )}
                {people && <>{followers ? followers : "0"}</>}
              </p>
            </div>
            <div className="w-px h-14 bg-unveilGreen"></div>
            <div className="min-w-[90px]">
              <p className="b4">Sold artworks</p>
              <p className="text-[27px]">0</p>
            </div>
            <div className="w-px h-14 bg-unveilGreen"></div>
            <div className="">
              <p className="b4">Unique collectors</p>
              <p className="text-[27px]">0</p>
            </div>
          </div>
          {people && (
            <button
              className="mt-[15px] btn btn-secondary btn-full"
              onClick={() => handleFollowUnfollow(following)}
            >
              {loading ? (
                <div className="h-[25px] animate-spin justify-center flex items-center">
                  <Loader />
                </div>
              ) : following ? (
                `Followed`
              ) : (
                `Follow`
              )}
            </button>
          )}
        </div>
        <div className="w-full md:w-[240px] xl:w-[300px] mt-[10px]">
          {collection && (
            <>
              <Link href={`/people/${collection.owner_id}`}>
                <p className="py-[2px]  my-1 border-b border-unveilGreen b3 md:b4">
                  {collection && typeof collection != "string"
                    ? `By: ${getUserName(collection.owner)}`
                    : ""}
                </p>
              </Link>
              {collection && typeof collection != "string" && (
                <>
                  {collection.curator_id && (
                    <p className="py-[2px]  my-1 border-b border-unveilGreen b3 md:b4">
                      {collection && collection.curator_id
                        ? `Curated by: ${collection.curator_id}`
                        : ""}
                    </p>
                  )}
                </>
              )}

              <p className="py-[2px]  my-1  b3 md:b4">
                {collection && typeof collection != "string"
                  ? `Release date: ${formatDate(collection.live_time)}`
                  : ``}
              </p>
              <p className="py-[2px]  my-1 b4 md:b5 truncate w-[120px]">
                {collection && typeof collection != "string"
                  ? collection.owner.walletAddress.slice(0, 4).toLowerCase() +
                    "..." +
                    collection.owner.walletAddress.slice(-4).toLowerCase()
                  : ""}
              </p>
            </>
          )}

          {people && (
            <>
              {people.instagram && (
                <a target="_blank" rel="noreferrer" href={people.instagram}>
                  <p className="py-[2px] truncate my-1 border-b border-unveilGreen b3 md:b4">
                    {formatInstagramUrl(people.instagram)}
                  </p>
                </a>
              )}

              {people.twitter && (
                <a target="_blank" rel="noreferrer" href={people.twitter}>
                  <p className="py-[2px] truncate my-1 border-b border-unveilGreen b3 md:b4">
                    {people.twitter}
                  </p>
                </a>
              )}
              {people.website && (
                <a target="_blank" rel="noreferrer" href={people.website}>
                  <p className="py-[2px] truncate my-1 border-b border-unveilGreen b3 md:b4">
                    {people.website}
                  </p>
                </a>
              )}
              <p className="py-[2px]  my-1 b4 md:b5 truncate w-[120px]">
                {people.walletAddress}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PeopleHeader;
