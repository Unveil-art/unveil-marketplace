import React from "react";

import OneLiner from "../reusable/Oneliner";
import Title from "../reusable/Title";
import ProductCard from "../reusable/ProductCard";

const HomepageSlider = () => {
  return (
    <section className="relative">
      <div className="h-screen w-full bg-unveilYellow z-10 relative gsap-scroll-item"></div>
      <div className="h-screen w-full bg-transparent gsap-scroll-transparent pointer-events-none"></div>
    </section>
  );
};

export default HomepageSlider;
