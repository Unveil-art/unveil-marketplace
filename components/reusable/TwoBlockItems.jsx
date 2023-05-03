import { gsap } from "gsap";
import { useRef } from "react";
import { useRect } from "@/hooks/useRect";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useIntersection } from "@/hooks/useIntersection";
import { useLenis } from "@studio-freight/react-lenis";
import Image from "next/image";
import Animate from "./Animate";
import Currency from "../svg/Currency";

const TwoBlockItems = ({ homePage = false, data }) => {
  const el = useRef();
  const rectRef = useRef();
  const [setRef, rect] = useRect();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { isIntersecting } = useIntersection(el);

  useLenis(({ scroll }) => {
    if (isIntersecting) {
      const top = rect.top - scroll;
      gsap.set(rectRef.current, {
        y: isDesktop ? 0 : top * 0.1
      });
    }
  }, [rect, isDesktop, isIntersecting], 1);

  return (
    <div
      ref={el}
      className={`${
        homePage ? "grid-cols-2" : "grid-cols-1 mb-[60px]"
      } grid grid-cols-1 gap-[15px] mx-[15px] md:mx-10 md:grid-cols-2 relative`}
    >
      <Animate options={{ alpha: !homePage, y: 100, image: true }}>
        <div
          className={`${
            homePage ? "aspect-[3/4]" : "aspect-square"
          }  bg-bgColor`}
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={data[0].banner.data.attributes.url}
              alt={data[0].banner.data.attributes.alt}
              layout="fill"
              objectFit="cover"
              className="gsap-image"
            />
            {data[0].bubblewrap && (
              <Image
                src="/images/bubble-wrap.png"
                alt="Bubble wrap - coming soon"
                layout="fill"
                objectFit="cover"
                className="gsap-bubblewrap"
              />
            )}
          </div>
        </div>
        <span className="nft-print">{data[0].type}</span>
        <h5 className="pt-1 b3">{data[0].name}</h5>
        <p className="b3 opacity-60">{data[0].user_name}</p>
        <div className="flex items-center gap-1">
          <p className="b3 opacity-60">{data[0].price} (</p>
          <div className="scale-[1.3]">
            <Currency />
          </div>
          <p className="b3 opacity-60">1.2)</p>
        </div>
      </Animate>
      {homePage && (
        <div className="absolute top-0 block w-px h-full -translate-x-1/2 md:hidden bg-bgColorHover left-1/2"></div>
      )}
      <Animate
        options={{ alpha: !homePage, y: 50, image: true }}
        className={`${homePage ? "md:mt-0 mt-[120px]" : ""}`}
      >
        <div
          ref={(node) => {
            setRef(node)
            rectRef.current = node
          }}
        >
          <div
            className={`${
              homePage
                ? "aspect-[3/4] md:rounded-none rounded-t-full"
                : "aspect-square"
            }  bg-bgColor`}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={data[1].banner.data.attributes.url}
                alt={data[1].banner.data.attributes.alt}
                layout="fill"
                objectFit="cover"
                className="gsap-image"
              />
              {data[1].bubblewrap && (
                <Image
                  src="/images/bubble-wrap.png"
                  alt="Bubble wrap - coming soon"
                  layout="fill"
                  objectFit="cover"
                  className="gsap-bubblewrap"
                />
              )}
            </div>
          </div>
          <span className="nft-print">{data[1].type}</span>
          <h5 className="pt-1 b3">{data[1].name}</h5>
          <p className="b3 opacity-60">{data[1].user_name}</p>
          <div className="flex items-center gap-1">
            <p className="b3 opacity-60">{data[1].europrice} (</p>
            <div className="scale-[1.3]">
              <Currency />
            </div>
            <p className="b3 opacity-60">{data[1].price})</p>
          </div>
        </div>
      </Animate>
    </div>
  );
};

export default TwoBlockItems;
