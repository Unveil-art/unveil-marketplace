import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getFollowerInfo, postFollower, isFollowed, unfollowArtist, getUserMe } from "lib/backend";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { toast } from "react-toastify";
import { getUserName } from "lib/utils";
import { useRouter } from "next/router"
import Loader from "@/components/svg/Loader";
const PeopleHeader = ({ collection, people }) => {
  const [follower, setFollowers] = useState([]);
  const [loggedIn, setLoggedInUser] = useState({});
  const [followStatus, setFollowStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const [userId, setUserId] = useState(router.query.slug)

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
  if (people) {
    if (collection && typeof collection != "string") {
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
  }

  const fetchLoggedInUser = async (userId) => {
    if(userId && value) {
      try {
        const res = await getUserMe(value)
        setLoggedInUser(res)
      } catch (error) {
        console.error(error)
      }
    } else {
      toast.error("User not logged in");
    }
  }

  useEffect(() => {
    fetchCollection(userId);
    fetchLoggedInUser(userId);
  }, [value, followStatus]);

  const fetchCollection = async (userId) => {
    if (userId) {
      try {
        const data = await getFollowerInfo(userId);
        let response = data ? data.followers : 0;
        setFollowers(response);

        if (value) {
          const followStatus = await isFollowed(value, userId);
          setFollowStatus(followStatus.data);
        }

        return data;
      } catch (err) {
        setFollowers(0);
        console.error(err);
      }
    }
  };
  const followRequest = async (followStatus) => {
    setLoading(true)
    if(value && userId) {
      const data = {
        user_id: userId
      }
      try {
        if(followStatus) {
          // unfollow code
          const res = await unfollowArtist(value, data)
          setFollowStatus(false)
        } else {
          //follow code
          const res = await postFollower(value, data)
          setFollowStatus(true)
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error("User not logged in");
      toast.error("User not logged in");
    }
    setLoading(false)
  };

  return (
    <section className="ml-[40px] md:ml-[35svw] pr-[15px] md:mt-0 mt-[20px] md:pr-[40px]">
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
                {collection && typeof collection != "string"
                  ? collection.artworks.length
                  : "0"}
              </p>
            </div>
            <div className="w-px h-10 bg-unveilGreen"></div>
            <div className="min-w-[90px]">
              <p className="b4">Sold artworks</p>
              <p className="text-[27px]">0</p>
            </div>
            <div className="w-px h-10 bg-unveilGreen"></div>
            <div className="">
              <p className="b4">Unique collectors</p>
              <p className="text-[27px]">0</p>
            </div>
          </div>
          {
            userId !== loggedIn.id && (
              <button
                className="mt-[10px] btn btn-full btn-secondary"
                onClick={() => followRequest(followStatus)}
              >
                {
                  loading ? (
                    <div className="animate-spin justify-center flex items-center">
                      <Loader />
                    </div>
                  ) : (
                    followStatus ? `Following` :  `Follow`
                  )
                }
              </button>
            )
          }
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
