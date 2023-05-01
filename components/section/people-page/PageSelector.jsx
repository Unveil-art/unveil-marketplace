import React from "react";

const PageSelector = ({ page, setPage }) => {
  return (
    <section className="pl-10 mt-10 pr-[15px] md:px-10">
      <div className="flex items-center gap-1">
        <span
          onClick={() => setPage(0)}
          className={`${
            page === 0
              ? "border-unveilBlack"
              : "border-bgColorHover hover:border-[rgba(0,0,0,0.3)]"
          } px-2 border rounded-full cursor-pointer unveilTransition md:px-4 l2`}
        >
          Artworks
        </span>
        <span
          onClick={() => setPage(1)}
          className={`${
            page === 1
              ? "border-unveilBlack"
              : "border-bgColorHover hover:border-[rgba(0,0,0,0.3)]"
          } px-2 border rounded-full cursor-pointer unveilTransition md:px-4 l2 `}
        >
          Collections
        </span>
        <span
          onClick={() => setPage(2)}
          className={`${
            page === 2
              ? "border-unveilBlack"
              : "border-bgColorHover hover:border-[rgba(0,0,0,0.3)]"
          } px-2 border rounded-full cursor-pointer unveilTransition md:px-4 l2 `}
        >
          About
        </span>
      </div>
    </section>
  );
};

export default PageSelector;
