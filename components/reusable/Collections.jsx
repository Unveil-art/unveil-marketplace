import React from "react";
import CountdownTimer from "./CountdownTimer";
import Image from "next/image";

const Collections = ({ color = "#F9F7F2", bgColor = "#141414", item }) => {
  console.log(item);
  return (
    <section className="grid grid-cols-1 md:h-screen md:m-0 m-[15px] md:grid-cols-2">
      <div
        className="flex flex-col justify-between order-2 p-10 aspect-square md:aspect-auto md:order-1"
        style={{ backgroundColor: bgColor, color: color }}
      >
        <div>
          <h2 className="h1">{item.title}</h2>
          <div className="mt-5 s2">
            <CountdownTimer targetDate={new Date(item.live_time)} />
          </div>
        </div>
        <div className="max-w-[60%]   ml-auto">
          {item.curator_id && (
            <p className="mb-5 l2">Curated by {item.curator_id}</p>
          )}
          <p className="b3">{item.description}</p>
        </div>
      </div>
      <div className="relative order-1 bg-bgColor md:order-2 aspect-square md:aspect-auto">
        <Image
          src={item.media_url}
          alt={item.title}
          fill={true}
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </section>
  );
};

export default Collections;
