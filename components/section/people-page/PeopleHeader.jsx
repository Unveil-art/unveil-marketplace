import React from "react";

const PeopleHeader = ({ collection }) => {
  console.log(collection);

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

  return (
    <section className="ml-[40px] md:ml-[35svw] pr-[15px] md:mt-0 mt-[20px] md:pr-[40px]">
      {collection && (
        <p className="s2 my-[60px] md:block hidden ">
          {collection.description}
        </p>
      )}
      <div className="justify-between md:flex">
        <div>
          <div className="flex gap-[15px] w-full justify-between md:justify-start">
            <div className="min-w-[90px]">
              <p className="b4">{collection ? "Artworks" : "Followers"}</p>
              <p className="text-[27px]">
                {collection ? collection.artworks.length : "0"}
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
          <p className="py-[2px]  my-1 border-b border-unveilGreen b3 md:b4">
            {collection ? `By: ${displayName}` : ""}
          </p>
          {collection && (
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
            {collection
              ? `Release date: ${formatDate(collection.live_time)}`
              : ``}
          </p>
          <p className="py-[2px]  my-1 b4 md:b5 truncate w-[120px]">
            {collection ? collection.owner.walletAddress : ""}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PeopleHeader;
