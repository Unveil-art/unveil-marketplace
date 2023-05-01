import React from "react";
import CountdownTimer from "./CountdownTimer";

const Collections = ({ color = "#F9F7F2", bgColor = "#141414" }) => {
  return (
    <section className="grid grid-cols-1 md:h-screen md:m-0 m-[15px] md:grid-cols-2">
      <div
        className="flex flex-col justify-between order-2 p-10 aspect-square md:aspect-auto md:order-1"
        style={{ backgroundColor: bgColor, color: color }}
      >
        <div>
          <h2 className="h1">Rustle Of The Morning Stars</h2>
          <div className="mt-5 s2">
            <CountdownTimer targetDate={new Date(2023, 4, 30)} />
          </div>
        </div>
        <div className="max-w-[60%]   ml-auto">
          <p className="mb-5 l2">Curated by Sephora Elders</p>
          <p className="b3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus corporis mollitia nobis labore tempora laudantium
            libero eveniet fugit corrupti quibusdam?
          </p>
        </div>
      </div>
      <div className="order-1 bg-bgColor md:order-2 aspect-square md:aspect-auto"></div>
    </section>
  );
};

export default Collections;
