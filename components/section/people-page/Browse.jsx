import React from "react";

const Browse = ({ filter, setFilter }) => {
  return (
    <section className=" flex gap-2 ml-[40px] md:ml-[35svw] md:pr-[40px] overflow-hidden">
      <p>Browse</p>{" "}
      <div className="flex items-center gap-1">
        <span
          onClick={() => setFilter(0)}
          className={`${
            filter === 0
              ? "border-unveilBlack"
              : "border-bgColorHover hover:border-[rgba(0,0,0,0.3)]"
          } px-2 border rounded-full cursor-pointer unveilTransition md:px-4 l2`}
        >
          Artists
        </span>
        <span
          onClick={() => setFilter(1)}
          className={`${
            filter === 1
              ? "border-unveilBlack"
              : "border-bgColorHover hover:border-[rgba(0,0,0,0.3)]"
          } px-2 border rounded-full cursor-pointer unveilTransition md:px-4 l2 `}
        >
          Curators
        </span>
        <span
          onClick={() => setFilter(2)}
          className={`${
            filter === 2
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
