import { forwardRef, useRef } from "react";
import { useIntersection } from "@/hooks/useIntersection";
import { useLineMaskingAnimation } from "@/hooks/animations/useLineMaskingAnimation";

const Title = ({ title = "Title", color = "#141414" }, ref) => {
  const el = useRef()
  const { isIntersecting } = useIntersection(el)
  
  useLineMaskingAnimation(el, isIntersecting)

  return (
    <div ref={el} className="ml-[40px] md:ml-[35svw] md:pr-[40px] overflow-hidden">
      <div style={{ backgroundColor: color }} className={`gsap-line h-[5px] mb-5`}></div>
      <h2 className="gsap-transform h1 pb-2">{title}</h2>
    </div>
  );
};

export default forwardRef(Title);
