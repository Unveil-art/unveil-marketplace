import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import Animate from "../reusable/Animate";
import Link from "next/link";
import CountdownTimer from "../reusable/CountdownTimer";

import { useIntersection } from "../../hooks/useIntersection";
import { gsap } from "gsap";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const CollectionDetails = ({ imageMargin, color, backgroundColor, data }) => {
  const el = useRef();
  const query = gsap.utils.selector(el);
  const { isIntersecting } = useIntersection(el);

  const releaseDate = new Date(data.date);

  const animateIn = useCallback(() => {
    const transforms = query(".gsap-transform");
    gsap.killTweensOf(transforms);
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
    <div
      ref={el}
      className="md:flex-row flex-col flex gap-[30px] md:gap-[0px] relative"
    >
      <div
        className={`${
          imageMargin ? "md:mb-10 md:ml-10" : ""
        } w-full md:w-[65svw] pr-10 md:pr-0`}
      >
        {data.image.data.attributes.mime.includes("video") && (
          <Animate
            options={{ y: 0, image: true }}
            className="relative z-10 block w-full overflow-hidden"
          >
            <ReactPlayer
              url={data.image.data.attributes.url}
              width="100%"
              height="100%"
              playing
              loop
              muted
              className="object-cover"
              style={{ objectFit: "cover" }}
            />
          </Animate>
        )}
        {data.image.data.attributes.mime.includes("image") && (
          <Animate
            options={{ y: 0, image: true }}
            className="relative z-10 block w-full overflow-hidden aspect-square"
          >
            <img
              src={data.image.data.attributes.url}
              alt={data.image.data.attributes.alt}
              className="w-full gsap-image"
            />

            {data.bubblewrap && (
              <Image
                src="/images/bubble-wrap.png"
                alt="Bubble wrap - coming soon"
                fill={true}
                style={{ objectFit: "cover" }}
                className="gsap-bubblewrap"
                priority
              />
            )}
          </Animate>
        )}
      </div>
      <Animate
        options={{
          stagger: {
            y: 20,
            value: 0.07,
          },
        }}
        className="pl-10 md:pl-[30px] md:mb-0 mb-[55px] sticky top-10 pb-10 left-0 h-fit overflow-hidden"
      >
        <div className="block gsap-transform">
          <h6
            className="w-fit rounded-full px-2 l2 mb-[10px] md:mb-[15px]"
            style={{ border: `solid 1px ${color}` }}
          >
            {data.status}
          </h6>
          <div className="s2 md:mb-[2px]">
            <CountdownTimer targetDate={releaseDate} />
          </div>
          <h3 className="h4 mb-[5px]">{data.name}</h3>
          <small className="block mt-2 leading-[1.5] b5">
            {data.price_heading}
          </small>
          <div className="flex items-center  mb-[15px]">
            <p className="md:b3 b4">
              {data.europrice} {data.price}
            </p>
          </div>
        </div>
        <div className="block gsap-transform">
          {data.link && (
            <a
              className={`${
                data.is_button_blocked ? "cursor-not-allowed" : ""
              } btn btn-primary cursor-pointer text-center hover:!bg-[#292928] pt-3.5 pb-3.5`}
              style={{ backgroundColor: color, color: backgroundColor }}
              href={data.is_button_blocked ? "" : data.link}
            >
              {data.button_name}
            </a>
          )}
          {!data.link && (
            <Link href="/gallery">
              <p
                className={`${
                  data.is_button_blocked ? "cursor-not-allowed" : ""
                } btn btn-primary cursor-pointer text-center hover:!bg-[#292928] pt-3.5 pb-3.5`}
                style={{ backgroundColor: color, color: backgroundColor }}
              >
                {data.button_name}
              </p>
            </Link>
          )}
        </div>
      </Animate>
    </div>
  );
};

export default CollectionDetails;
