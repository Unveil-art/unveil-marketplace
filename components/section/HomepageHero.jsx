import { useRef, useEffect, useState, useCallback } from "react";

const HomepageHero = ({ data }) => {
  const el = useRef();

  return (
    <section className="flex" ref={el}>
      <div className="max-w-5xl"></div>
      <div className="w-full"></div>
    </section>
  );
};

export default HomepageHero;
