import { useRef, useEffect, useCallback } from "react";

import Animate from "../reusable/Animate";
import Currency from "../svg/Currency";
import CountdownTimer from "../reusable/CountdownTimer";

import { useIntersection } from "../../hooks/useIntersection";
import { gsap } from "gsap";

const CollectionDetails = ({ imageMargin, color, backgroundColor, data }) => {
  const el = useRef();
  const query = gsap.utils.selector(el);
  const { isIntersecting } = useIntersection(el);

  const releaseDate = new Date(data.date);

  const animateIn = useCallback(() => {
    const transforms = query(".gsap-transform")
    gsap.killTweensOf(transforms)
    // prettier-ignore
    gsap.timeline({
      paused: true,
    }).timeScale(1.75).fromTo(transforms, {
      autoAlpha: 0,
      xPercent: -100,
      x: -40,
    }, {
      autoAlpha: 1,
      xPercent: 0,
      x: 0,
      duration: 2.5,
      stagger: 0.1,
      ease: "power3.out",
    }, 0).restart()
  });

  useEffect(() => {
    if (isIntersecting) {
      animateIn();
    }
  }, [isIntersecting]);

  return (
    <div ref={el} className="md:flex-row flex-col flex gap-[30px] md:gap-[0px] relative">
      <div
        className={`${
          imageMargin ? "md:mb-10 md:ml-10" : ""
        } w-full md:w-[65svw] pr-10 md:pr-0`}
      >
        <Animate options={{ y: 0, image: true }} className="relative z-10 block w-full aspect-square overflow-hidden">
          <img
            src={data.image.data.attributes.url}
            alt={data.image.data.attributes.alt}
            className="gsap-image w-full"
          />
        </Animate>
      </div>
      <Animate
        options={{
          stagger: {
            y: 20,
            value: 0.07,
          },
        }}
        className="ml-10 md:ml-0 md:pl-[30px] md:mb-0 mb-[55px] sticky top-10 pb-10 left-0 h-fit overflow-hidden"
      >
        <div className="gsap-transform block">
          <h6
            className="w-fit rounded-full px-2 l2 mb-[10px] md:mb-[15px]"
            style={{ border: `solid 1px ${color}` }}
          >
            {data.status}
          </h6>
          <div className="s2 mb-[6px] md:mb-[15px]">
            <CountdownTimer targetDate={releaseDate} />
          </div>
          <h3 className="h4">{data.name}</h3>
          <small className="block b5">{data.price_heading}</small>
          <div className="flex items-center  mb-[15px]">
            <p className="b3">{data.europrice} (</p>
            <Currency color={color} />
            <p className="b3">{data.price})</p>
          </div>
        </div>
        <div className="gsap-transform block">
          <button
            className="cursor-not-allowed btn btn-primary"
            style={{ backgroundColor: color, color: backgroundColor }}
          >
            Coming soon
          </button>
        </div>
      </Animate>
    </div>
  );
};

export default CollectionDetails;
