import React from "react";

const Browse = ({ filter, setFilter }) => {
  return (
    <section>
      <p>Browse</p>{" "}
      <div className="flex items-center gap-1">
        <span
          onClick={() => setFilter(0)}
          className={`${
            filter === 0 ? "border-unveilBlack" : "border-bgColorHover"
          } px-2 border rounded-full cursor-pointer unveilTransition md:px-4 l2`}
        >
          Artworks
        </span>
        <span
          onClick={() => setFilter(1)}
          className={`${
            filter === 1 ? "border-unveilBlack" : "border-bgColorHover"
          } px-2 border rounded-full cursor-pointer unveilTransition md:px-4 l2 `}
        >
          Collections
        </span>
        <span
          onClick={() => setFilter(3)}
          className={`${
            filter === 3 ? "border-unveilBlack" : "border-bgColorHover"
          } px-2 border rounded-full cursor-pointer unveilTransition md:px-4 l2 `}
        >
          Collections
        </span>
      </div>
    </section>
  );
};

export default Browse;
