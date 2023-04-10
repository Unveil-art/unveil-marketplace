import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import { useIntersection } from "@/hooks/useIntersection";
import Animate from "@/components/reusable/Animate";
import Currency from "@/components/svg/Currency";

const CollectionDetails = ({ imageMargin, color, backgroundColor }) => {
  const el = useRef()
  const query = gsap.utils.selector(el)
  const { isIntersecting } = useIntersection(el)

  const animateIn = () => {
    gsap.timeline({
      paused: true
    }).timeScale(1.75).fromTo(query('.gsap-transform'), {
      xPercent: -100,
      x: -40
    }, {
      xPercent: 0,
      x: 0,
      duration: 2.5,
      stagger: 0.1,
      ease: 'power3.out'
    }, 0.25).restart()
  }

  useEffect(() => {
    if (isIntersecting) {
      animateIn()
    }
  }, [isIntersecting])

  return (
    <div ref={el} className="md:flex-row flex-col flex gap-[30px] relative">
      <div
        className={`${
          imageMargin ? "md:mb-10 md:ml-10" : ""
        } relative w-full md:w-[65svw] aspect-square pr-10 md:pr-0 z-10`}
      >
        <div className="block w-full h-full bg-unveilGreen"></div>
      </div>
      <Animate options={{
        stagger: {
          y: 20,
          value: 0.07
        }
      }} className="md:ml-0 ml-10 md:mb-0 mb-[55px] sticky top-10 pb-10 left-0 h-fit">
        <h6
          className="gsap-transform w-fit rounded-full px-2 l2 mb-[10px] md:mb-[15px]"
          style={{ border: `solid 1px ${color}` }}
        >
          Live Drop
        </h6>
        <p className="gsap-transform s2 mb-[6px] md:mb-[15px]">03:02:22</p>
        <h3 className="gsap-transform h4">Collection name</h3>
        <div className="gsap-transform">
          <small className="b5">Starting price (edition of 10)</small>
          <div className="flex items-center  mb-[15px]">
            <p className="b3">€1200 (</p>
            <Currency color={color} />
            <p className="b3">1.2)</p>
          </div>
        </div>
        <button
          className="gsap-transform btn btn-primary"
          style={{ backgroundColor: color, color: backgroundColor }}
        >
          View collection
        </button>
      </Animate>
    </div>
  );
};

export default CollectionDetails;
