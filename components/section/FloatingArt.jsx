import { gsap } from "gsap";
import { useRef, useEffect, useState, useCallback } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useFontLoaded } from "../../hooks/useFontLoaded";
import { useHistory } from "../../contexts/History";
import { useLenis } from "@studio-freight/react-lenis";
import Image from "next/image";
import AccessPopIn2 from "../pop-in/AccessPopIn2";
import Link from "next/link";

const FloatingArt = ({ data }) => {
  const [open, setOpen] = useState(false);
  const el = useRef();
  const once = useRef(false);
  const size = useWindowSize();
  const loaded = useFontLoaded(["Graphik", "Teodor"]);
  const heading = data.heading.split(/\r?\n|\r|\n/g);
  const query = gsap.utils.selector(el);

  const { previous } = useHistory();

  const animateIn = useCallback(() => {
    const align = query(".gsap-align");
    const words = query(".gsap-word");
    const title = query(".gsap-title");
    const line = query(".gsap-line");
    const stagger = query(".gsap-stagger");
    const thumbnails = query(".gsap-thumbnail");
    const images = thumbnails.map((el) => el.getBoundingClientRect());
    const padding = parseInt(
      getComputedStyle(el.current).getPropertyValue("padding-left")
    );
    const tl = gsap.timeline({ paused: true });
    tl.timeScale(1.25);
    tl.to(
      el.current,
      {
        autoAlpha: 1,
        duration: 0.4,
        ease: "none",
      },
      0
    );
    if (!previous) {
      const cache = words.map((el) => el.getBoundingClientRect());
      tl.set(
        align,
        {
          y: cache[0].height * 0.5,
        },
        0
      );
      words.forEach((word, index) => {
        const width = cache.reduce(
          (sum, entry, loop) => (loop <= index ? sum + entry.width : sum),
          0
        );
        const translate = size.width * 0.5 - width * 0.5 - padding;
        tl.to(
          title,
          {
            x: translate,
            duration: index === 0 ? 0 : 0.5,
            ease: "expo.out",
          },
          0.75 * index
        ).fromTo(
          word,
          {
            y: 20,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.75,
            ease: "expo.out",
          },
          0.75 * index
        );
      });
      tl.to(title, {
        x: 0,
        duration: 1,
        ease: "expo.inOut",
      }).fromTo(
        line,
        {
          x: 40,
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.45,
          ease: "expo.out",
        },
        "-=0.65"
      );
    }
    tl.fromTo(
      stagger,
      {
        x: 10,
        autoAlpha: 0,
      },
      {
        x: 0,
        autoAlpha: 1,
        duration: 0.75,
        stagger: 0.07,
        ease: "expo.out",
      },
      "-=0.25"
    );
    thumbnails.forEach((el, index) => {
      const { top, height } = images[index];
      const sign = Math.sign(top + height * 0.5 - size.height * 0.5);
      const margin = sign === -1 ? top : size.height - (top + height * 0.5);
      const value = (height + margin) * sign;
      tl.fromTo(
        el,
        {
          autoAlpha: 1,
          y: value,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.25,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=1.1"
      );
    });
    tl.restart();
  });

  useEffect(() => {
    if (!once.current) {
      window.scrollTo(0, 0);
    }
    if (!once.current && loaded && size.width && size.height) {
      once.current = true;
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          requestAnimationFrame(() => {
            animateIn();
          });
        });
      } else {
        requestAnimationFrame(() => {
          animateIn();
        });
      }
    }
  }, [loaded, size]);

  useLenis(({ scroll }) => {
    const parallax = query(".gsap-parallax");
    parallax.forEach((el, index) => {
      const speed = el.getAttribute("data-speed");
      const direction = index % 2 === 0 ? 1 : -1;
      gsap.set(el, {
        y: scroll * speed * direction,
      });
    });
  }, []);

  return (
    <>
      <section
        ref={el}
        className="h-[100svh] flex justify-center flex-col p-[15px] sm:p-10 relative overflow-hidden opacity-0"
      >
        <div
          data-cursor="Coming soon"
          data-cursor-color={data.topleft_color}
          className="gsap-thumbnail absolute block top-[5%] left-[20%] z-10 invisible"
        >
          <div className="gsap-parallax " data-speed="0.1">
            <div className="w-[85px] bubble-wrap overflow-hidden h-[108px] sm:w-[140px] sm:h-[180px] relative">
              {data.topleft && (
                <Image
                  src={data.topleft.data.attributes.url}
                  alt={data.topleft.data.attributes.alt}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              )}

              {data.topleft_bubblewrap && (
                <Image
                  src="/images/bubble-wrap.png"
                  alt="Bubble wrap - coming soon"
                  fill={true}
                  style={{ objectFit: "cover" }}
                  className="gsap-bubblewrap"
                />
              )}
            </div>

            <small className="block l2 text-[8px] md:text-[12px]">
              {data.topleft_name}
            </small>
          </div>
        </div>

        <div
          data-cursor="Coming soon"
          data-cursor-color={data.bottomleft_color}
          className="gsap-thumbnail absolute block bottom-[20%] sm:bottom-[5%] right-[10%] left-auto sm:left-[40%] sm:right-auto z-10 invisible"
        >
          <div className="gsap-parallax" data-speed="-0.075">
            <div className="relative w-[81px] h-[96px] sm:w-[140px] sm:h-[180px]">
              {data.bottomleft && (
                <Image
                  src={data.bottomleft.data.attributes.url}
                  alt={data.bottomleft.data.attributes.alt}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              )}
              {data.bottomleft_bubblewrap && (
                <Image
                  src="/images/bubble-wrap.png"
                  alt="Bubble wrap - coming soon"
                  fill={true}
                  style={{ objectFit: "cover" }}
                  className="gsap-bubblewrap"
                />
              )}
            </div>
            <small className=" block l2 text-[8px] md:text-[12px]">
              {data.bottomleft_name}
            </small>
          </div>
        </div>

        <div
          data-cursor="Coming soon"
          data-cursor-color={data.topright_color}
          className="gsap-thumbnail absolute block top-[10%] sm:top-0 right-[4%] sm:right-auto sm:left-1/2 z-10 invisible"
        >
          <div className="gsap-parallax" data-speed="0.1">
            <div className="relative w-[136px] h-[184px] sm:w-[410px] sm:h-[500px]">
              {data.topright && (
                <Image
                  src={data.topright.data.attributes.url}
                  alt={data.topright.data.attributes.alt}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              )}
              {data.topright_bubblewrap && (
                <Image
                  src="/images/bubble-wrap.png"
                  alt="Bubble wrap - coming soon"
                  fill={true}
                  style={{ objectFit: "cover" }}
                  className="gsap-bubblewrap"
                />
              )}
            </div>
            <small className="block l2 text-[8px] md:text-[12px]">
              {data.topright_name}
            </small>
          </div>
        </div>

        <div
          data-cursor="Coming soon"
          data-cursor-color={data.centerright_color}
          className="gsap-thumbnail absolute block bottom-[0] sm:bottom-[30%] left-0 sm:left-auto sm:right-0 sm:translate-y-1/2 translate-y-0 z-10 invisible"
        >
          <div className="gsap-parallax" data-speed="0.0">
            <div className="relative w-[164px] h-[229px] sm:w-[320px] sm:h-[422px]">
              {data.centerright && (
                <Image
                  src={data.centerright.data.attributes.url}
                  alt={data.centerright.data.attributes.alt}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              )}
              {data.centerright_bubblewrap && (
                <Image
                  src="/images/bubble-wrap.png"
                  alt="Bubble wrap - coming soon"
                  fill={true}
                  style={{ objectFit: "cover" }}
                  className="gsap-bubblewrap"
                />
              )}
            </div>
            <small className="block l2 md:ml-0 ml-1 text-[8px] md:text-[12px]">
              {data.centerright_name}
            </small>
          </div>
        </div>

        <div className="gsap-align relative max-w-[700px] z-20">
          <h1 className="gsap-title h3">
            <span className="flex gap-2 md:gap-4">
              {heading[0].split(" ").map((word, index) => (
                <span className="gsap-word" key={index}>
                  {word}
                </span>
              ))}
            </span>
            <span className="flex gap-2 md:gap-4 gsap-line">
              <span>{heading[1]}</span>
            </span>
          </h1>
          <div className="flex gap-[10px] mt-5">
            <div className="gsap-stagger">
              <Link href="/gallery">
                {data.button_1_cursor_text && (
                  <button
                    data-cursor={data.button_1_cursor_text}
                    data-cursor-color={data.button_1_cursor_color}
                    className="bg-opacity-90 btn btn-primary"
                  >
                    {data.button_1_text}
                  </button>
                )}
                {!data.button_1_cursor_text && (
                  <button className="bg-opacity-90 btn btn-primary">
                    {data.button_1_text}
                  </button>
                )}
              </Link>
            </div>
            {/* Going to be a link */}
            <div className="gsap-stagger">
              {data.button_2_cursor_text && (
                <button
                  data-cursor={data.button_2_cursor_text}
                  data-cursor-color={data.button_2_cursor_color}
                  className="btn btn-secondary"
                >
                  {data.button_2_text}
                </button>
              )}
              {!data.button_2_cursor_text && (
                <button
                  onClick={() => setOpen(true)}
                  className="btn btn-secondary"
                >
                  {data.button_2_text}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <AccessPopIn2
        accessOpen={open}
        setAccessOpen={setOpen}
        i={1}
        data={data.request_access}
      />
    </>
  );
};

export default FloatingArt;
