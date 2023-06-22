import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getArtistRecognitions } from "lib/backend";

const AboutCurator = ({ owner }) => {

  const [recognitions, setRecognitions] = useState([]);

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

  const getRecognitions = async(artist_id)  => {
    const data = await getArtistRecognitions(artist_id);
    setRecognitions(data);
  }
  useEffect(() => {
    if(owner.id){
      getRecognitions(owner.id)
    }
  },[owner]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative w-full aspect-square bg-bgColor">
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
        <div className="w-[55%] pt-[100px] md:pt-0 pr-[15px] pb-10 ml-auto md:ml-0 md:absolute bottom-10 right-10  h-fit">
          <div className="flex items-end gap-2 flex-nowrap">
            <p className="b3">By</p>
            <p className="truncate l2">{displayName}</p>
          </div>

          <h4 className="mt-5 mb-10 b2 md:h2">{owner.description}</h4>
          <div className="mb-5">
            {
              recognitions.map(({id, recognition_type, description}) => (
                <p key={id} className="py-1 border-b cursor-pointer b3 md:b4 border-unveilWhite">
              x {description} ({recognition_type})
            </p>
              ))
            }
            
            <p className="py-1 truncate w-[100px] cursor-pointer b3 md:b4 border-unveilWhite">
              {owner?.walletAddress?.slice(0,4).toLowerCase()}...{owner?.walletAddress?.slice(-4).toLowerCase()}
            </p>
          </div>
          <Link href={`/people/${owner.id}`}>
            <button className="btn btn-secondary hover:bg-[#292928] btn-full border-unveilWhite">
              Follow artist
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCurator;
