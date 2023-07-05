import React from "react";

const Browse = ({ filter, setFilter }) => {
  return (
    <section className=" flex gap-2 ml-[40px] md:ml-[35vw] md:pr-[40px] overflow-hidden">
      <p>Browse</p>{" "}
      <div className="flex items-center gap-1">
        <span
          onClick={() => setFilter("artist")}
          className={`${
            filter === "artist"
              ? "border-unveilBlack"
              : "border-bgColorHover hover:border-[rgba(0,0,0,0.3)]"
          } px-2 border rounded-full cursor-pointer unveilTransition md:px-4 l2`}
        >
          Artists
        </span>
        <span
          onClick={() => setFilter("curator")}
          className={`${
            filter === "curator"
              ? "border-unveilBlack"
              : "border-bgColorHover hover:border-[rgba(0,0,0,0.3)]"
          } px-2 border rounded-full cursor-pointer unveilTransition md:px-4 l2 `}
        >
          Curators
        </span>
        <span
          onClick={() => setFilter("collector")}
          className={`${
            filter === "collector"
              ? "border-unveilBlack"
              : "border-bgColorHover hover:border-[rgba(0,0,0,0.3)]"
          } px-2 border rounded-full cursor-pointer unveilTransition md:px-4 l2 `}
        >
          Collectors
        </span>
      </div>
    </section>
  );
};

export default Browse;
