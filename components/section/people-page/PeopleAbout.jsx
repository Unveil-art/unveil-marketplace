import React from "react";
import Animate from "@/components/reusable/Animate";
const PeopleAbout = (collection) => {
  console.log("DETAILS", collection);
  const instagram = () => {
    collection.details.instagram? window.open(collection.details.instagram) : '';
  }
  const website = () => {
    collection.details.website ? window.open(collection.details.website) : '';
  }
  return (
    <section className="relative grid grid-cols-1 mb-10 md:my-10 md:grid-cols-5">
      <div className="order-2 w-full md:col-span-3 md:order-1">
        <Animate
          options={{ y: 0, image: true }}
          className="w-full sticky top-0  overflow-hidden h-fit bg-bgColor aspect-[10/11]"
        >
          {/* <Image
            src={data.Image.data.attributes.url}
            alt={data.Image.data.attributes.alt}
            layout="fill"
            objectFit="cover"
            className="gsap-image"
          /> */}
        </Animate>
      </div>
      <Animate
        options={{ alpha: true }}
        className="order-1 md:col-span-2 md:order-2"
      >
        <div className="md:max-w-[350px] md:mt-0 mt-5 sticky top-[32px] leading-[110%] pr-[15px] ml-[40px] md:ml-[60px] justify-between flex flex-col">
          <p className=" s2 drop-cap">
            {collection.details.description}
          </p>
          <button className="mt-20 btn btn-secondary btn-full" onClick={()=>instagram()}>
            {collection.details.instagram ? "Instagram" : "No Instagram available"}
          </button>
          <button className="mt-[10px] btn btn-secondary btn-full md:mb-0 mb-10" onClick={()=> website()}>
          {collection.details.website ? "Website" : "No Website available"}
          </button>
        </div>
      </Animate>
    </section>
  );
};

export default PeopleAbout;
