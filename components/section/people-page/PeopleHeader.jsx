import React, { useState, useEffect } from "react";
import { getFollowerInfo } from "lib/backend";
import Link from "next/link";
const PeopleHeader = ({ collection }) => {
  // console.log(collection);

  function formatDate(inputString) {
    let date = new Date(inputString);
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1; // JavaScript months are 0-11
    let year = date.getUTCFullYear().toString().substr(2, 2); // Get last 2 digits of year

    // Return the formatted string
    return `${day}.${month}.${year}`;
  }

  let displayName;
  let userId;
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
  } else {
    userId = collection;
  }
  const [follower, setFollowers] = useState([]);
  useEffect(() => {
    fetchCollection(userId);
}, []);
  const fetchCollection = async (userId) => {
    if(userId){
      try {
        const data = await getFollowerInfo(userId);
        let response = data ? data.followers : 0;
        setFollowers(response);
        return data;
      } catch (err) {
        setFollowers(0);
        console.error(err);
      }
    }
    
  };

  return (
    <section className="ml-[40px] md:ml-[35svw] pr-[15px] md:mt-0 mt-[20px] md:pr-[40px]">
      {(collection && typeof collection != "string") && (
        <p className="s2 my-[60px] md:block hidden ">
          {collection.description}
        </p>
      )}
      <div className="justify-between md:flex">
        <div>
          <div className="flex gap-[15px] w-full justify-between md:justify-start">
            <div className="min-w-[90px]">
              <p className="b4">{(collection && typeof collection != "string") ? "Artworks" : "Followers"}</p>
              <p className="text-[27px]">
                {(collection && typeof collection != "string") ? collection.artworks.length : follower}
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
          <button className="mt-[10px] btn btn-full btn-secondary">
            Follow
          </button>
        </div>
        <div className="w-full md:w-[240px] xl:w-[300px] mt-[10px]">
          <Link href={`/people/${collection.owner_id}`}>
          <p className="py-[2px]  my-1 border-b border-unveilGreen b3 md:b4">
            {(collection && typeof collection != "string") ? `By: ${displayName}` : ""}
          </p>
          </Link>
          {(collection && typeof collection != "string") && (
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
            {(collection && typeof collection != "string")
              ? `Release date: ${formatDate(collection.live_time)}`
              : ``}
          </p>
          <p className="py-[2px]  my-1 b4 md:b5 truncate w-[120px]">
            {(collection && typeof collection != "string") ? collection.owner.walletAddress.slice(0,4).toLowerCase()+"..."+collection.owner.walletAddress.slice(-4).toLowerCase() : ""}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PeopleHeader;
