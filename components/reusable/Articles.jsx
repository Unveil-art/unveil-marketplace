import { gsap } from "gsap";
import { useRef } from "react";
import { useRect } from "@/hooks/useRect";
import { useWindowSize } from '@/hooks/useWindowSize'
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useIntersection } from "@/hooks/useIntersection";
import { useLenis } from "@studio-freight/react-lenis";
import Image from "next/image";
import Animate from "../reusable/Animate";
import Link from "next/link";

const Articles = ({ data, homePage = false }) => {
  const el = useRef();
  const [setRef, rect] = useRect();
  const size = useWindowSize();
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { isIntersecting } = useIntersection(el);
  const query = gsap.utils.selector(el);

  useLenis(({ scroll }) => {
    if (isIntersecting) {
      const parallax = query(".gsap-parallax");
      const top = rect.top - (scroll + size.height * 0.5);
      parallax.forEach(el => {
        const attr = el.getAttribute('data-speed')
        const entries = attr.split(' ');
        let speed = entries[0]
        if (entries.length > 1) {
          const current = entries.find(entry => entry.startsWith(isDesktop ? 'md:' : ''))
          speed = Number(current.substring(current.indexOf(':') + 1))
        }
        gsap.set(el, {
          y: top * speed
        });
      });
    }
  }, [rect, isDesktop, isIntersecting], 1);

  return (
    <div
      ref={(node) => {
        setRef(node)
        el.current = node
      }}
      className="relative grid grid-cols-2 gap-[15px] md:gap-10 md:grid-cols-4"
    >
      {data[0] && (
        <Animate
          options={{
            y: 175,
            alpha: true,
            delay: "random",
          }}
          className={`relative md:col-span-2 mt-[50px] ${!homePage ? "col-span-2" : ""}`}
        >
          <Link href={`/editorial/${data[0].attributes.slug}`}>
            <div
              className={`gsap-parallax ${!homePage ? "md:sticky md:top-[90px]" : ""}`}
              data-speed="0.1 md:0.0"
            >
              <div
                className={`w-full aspect-[3/4] md:aspect-[10/11] relative ${
                  !homePage ? "!aspect-[10/11]" : ""
                }`}
              >
                {data[0].attributes.Image && (
                  <Image
                    src={data[0].attributes.Image.data.attributes.url}
                    alt={data[0].attributes.Image.data.attributes.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="md:text-center md:max-w-[400px] md:mx-auto mt-2 md:mt-10">
                <p className="b3 md:h2">{data[0].attributes.Title}</p>
                <p className="b3 opacity-60 md:max-w-[280px] mt-5 md:mx-auto">
                  {data[0].attributes.Description}
                </p>
              </div>
            </div>
          </Link>
        </Animate>
      )}
      <div className="absolute top-0 hidden w-px h-full -translate-x-[150%] md:block bg-unveilDrakGray left-1/2"></div>
      {data[1] && (
        <div
          className="gsap-parallax"
          data-speed="-0.1 md:-0.15"
        >
          <Link href={`/editorial/${data[1].attributes.slug}`}>
            <Animate
              options={{
                y: 175,
                alpha: true,
                delay: "random",
              }}
              className="mt-[100px] md:mt-[200px] h-fit"
            >
              <div className="aspect-[3/4] md:rounded-none rounded-t-full relative">
                {data[1].attributes.Image && (
                  <Image
                    src={data[1].attributes.Image.data.attributes.url}
                    alt={data[1].attributes.Image.data.attributes.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="mx-auto mt-2">
                <p className=" b3">{data[1].attributes.Title}</p>
                <p className="mt-1 b3 opacity-60">
                  {data[1].attributes.Description}
                </p>
              </div>
            </Animate>
          </Link>
        </div>
      )}

      <div className="md:block hidden absolute top-0 w-px h-full -translate-x-1/2 bg-unveilDrakGray right-[24%]"></div>
      <div>
        {data[2] && (
          <Link href={`/editorial/${data[2].attributes.slug}`}>
            <Animate
              options={{
                y: 175,
                alpha: true,
                delay: "random",
              }}
            >
              <div
                className="gsap-parallax"
                data-speed="0.1"
              >
                <div className="aspect-[3/4] md:rounded-t-full md:mt-[50px] relative overflow-hidden">
                  {data[2].attributes.Image && (
                    <Image
                      src={data[2].attributes.Image.data.attributes.url}
                      alt={data[2].attributes.Image.data.attributes.alt}
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </div>
                <div className="mx-auto mt-2">
                  <p className="b3">{data[2].attributes.Title}</p>
                  <p className="mt-1 b3 opacity-60">
                    {data[2].attributes.Description}
                  </p>
                </div>
              </div>
            </Animate>
          </Link>
        )}
        {data[3] && (
          <Link href={`/editorial/${data[3].attributes.slug}`}>
            <Animate
              options={{
                y: 175,
                alpha: true,
                delay: "random",
              }}
              className="md:block hidden mt-[100px]"
            >
              <div
                className="gsap-parallax"
                data-speed="0.1"
              >
                <div className="aspect-[3/4] relative">
                  {data[3].attributes.Image && (
                    <Image
                      src={data[3].attributes.Image.data.attributes.url}
                      alt={data[3].attributes.Image.data.attributes.alt}
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </div>
                <div className="mx-auto mt-2">
                  <p className="b3">{data[3].attributes.Title}</p>
                  <p className="mt-1 b3 opacity-60">
                    {data[3].attributes.Description}
                  </p>
                </div>
              </div>
            </Animate>
          </Link>
        )}
        {!homePage && data[4] && (
          <Link href={`/editorial/${data[4].attributes.slug}`}>
            <Animate
              options={{
                y: 175,
                alpha: true,
                delay: "random",
              }}
              className="md:block hidden mt-[100px]"
            >
              <div
                className="gsap-parallax"
                data-speed="0.1"
              >
                <div className="aspect-[3/4] relative">
                  {data[4].attributes.Image && (
                    <Image
                      src={data[4].attributes.Image.data.attributes.url}
                      alt={data[4].attributes.Image.data.attributes.alt}
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </div>
                <div className="mx-auto mt-2">
                  <p className="b3">{data[4].attributes.Title}</p>
                  <p className="mt-1 b3 opacity-60">
                    {data[4].attributes.Description}
                  </p>
                </div>
              </div>
            </Animate>
          </Link>
        )}
      </div>
      {data[3] && (
        <Link href={`/editorial/${data[3].attributes.slug}`}>
          <Animate
            options={{
              y: 175,
              alpha: true,
              delay: "random",
            }}
            className="md:hidden block mt-[50px] mb-[150px]"
          >
            <div
              className="gsap-parallax"
              data-speed="-0.1"
            >
              <div className="aspect-[3/4] relative">
                {data[3].attributes.Image && (
                  <Image
                    src={data[3].attributes.Image.data.attributes.url}
                    alt={data[3].attributes.Image.data.attributes.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="mx-auto mt-2">
                <p className="b3">{data[3].attributes.Title}</p>
                <p className="mt-1 b3 opacity-60">
                  {data[3].attributes.Description}
                </p>
              </div>
            </div>
          </Animate>
        </Link>
      )}
      {!homePage && data[4] && (
        <Link href={`/editorial/${data[4].attributes.slug}`}>
          <Animate
            options={{
              y: 175,
              alpha: true,
              delay: "random",
            }}
            className="block md:hidden"
          >
            <div
              className="gsap-parallax"
              data-speed="0.1"
            >
              <div className="aspect-[3/4] relative">
                {data[4].attributes.Image && (
                  <Image
                    src={data[4].attributes.Image.data.attributes.url}
                    alt={data[4].attributes.Image.data.attributes.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="mx-auto mt-2">
                <p className="b3">{data[4].attributes.Title}</p>
                <p className="mt-1 b3 opacity-60">
                  {data[4].attributes.Description}
                </p>
              </div>
            </div>
          </Animate>
        </Link>
      )}
    </div>
  );
};

export default Articles;
