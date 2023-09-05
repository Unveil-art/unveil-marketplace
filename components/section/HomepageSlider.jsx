import React from "react";

import OneLiner from "../reusable/Oneliner";
import Title from "../reusable/Title";
import ProductCard from "../reusable/ProductCard";

const HomepageSlider = () => {
  return (
    <section className="relative z-10">
      <div className="h-screen w-full bg-unveilYellow"></div>
      <div className="h-screen w-full bg-transparent gsap-scroll-transparent"></div>
    </section>
  );
};

export default HomepageSlider;
