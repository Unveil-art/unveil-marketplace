import { useHistory } from "@/contexts/History";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import AccessPopIn2 from "../pop-in/AccessPopIn2";
import Link from "next/link";
import AccessPopIn3 from "../pop-in/AccessPopIn3";
import { useFontLoaded } from "@/hooks/useFontLoaded";
import { useWindowSize } from "@/hooks/useWindowSize";
import Image from "next/image";
import { useLenis } from "@studio-freight/react-lenis";

const HomepageHero = ({ data, featuredArtworks }) => {
  const el = useRef();
  const once = useRef(false);
  const { previous } = useHistory();
  const query = gsap.utils.selector(el);
  const loaded = useFontLoaded(["Graphik", "Teodor"]);
  const size = useWindowSize();
  const heading = data.heading.split(/\r?\n|\r|\n/g);

  const [open, setOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [background, setBackground] = useState("transparent");

  const animateIn = useCallback(() => {
    let sliderTl = gsap.timeline({ paused: true });
    const progressTl = gsap.timeline();
    const stagger = query(".gsap-stagger");
    const artworks = query(".gsap-artwork");
    const artworkContainers = query(".gsap-artwork-container");
    const indicators = query(".gsap-indicator");
    const progress = query(".gsap-progress");
    const background = query(".gsap-background");
    const artworkDetails = query(".gsap-fade");
    const words = query(".gsap-word");
    const overflowEl = query(".gsap-overflow");

    const length = artworkContainers.length;
    let currentIndex = 0;
    let previousIndex = 0;
    const timeToNextSlide = 5;
    let delay;

    const slideArtworkin = () => {
      sliderTl.clear();

      sliderTl.set(artworkContainers, {
        zIndex: 0,
      });

      sliderTl.set(artworkContainers[previousIndex], {
        zIndex: 1,
      });

      sliderTl.set(artworkContainers[currentIndex], {
        zIndex: 2,
        opacity: 1,
      });

      gsap.to(background, {
        backgroundColor: artworkContainers[currentIndex].dataset.cursorColor,
        duration: 0.5,
        delay: 0.2,
        ease: "power1.easeIn",
      });

      gsap.to(artworkDetails, {
        duration: 0.3,
        y: 8,
        opacity: 0,
        ease: "power1.easeIn",
      });

      // get other artwork containers
      const otherArtworkContainers = artworkContainers.filter(
        (_, index) => index !== currentIndex
      );

      gsap.to(otherArtworkContainers, {
        duration: 2,
        xPercent: -30,
        ease: "Expo.easeInOut",
      });

      sliderTl
        .fromTo(
          artworkContainers[currentIndex],
          {
            xPercent: 100,
          },
          {
            duration: 2,
            xPercent: 0,
            ease: "Expo.easeInOut",
          }
        )
        .fromTo(
          artworks[currentIndex],
          {
            xPercent: -100,
            scale: 1.4,
          },
          {
            duration: 2,
            delay: -2,
            xPercent: 0,
            scale: 1,
            ease: "Expo.easeInOut",
          }
        )
        .to(artworkDetails[currentIndex], {
          duration: 0.3,
          y: 0,
          opacity: 1,
          ease: "power1.easeIn",
        });
    };

    const progressAnimation = () => {
      progressTl.clear();
      gsap.to(progress, {
        opacity: 0,
        duration: 0.3,
      });

      gsap.to(progress[currentIndex], {
        opacity: 1,
        duration: 0.3,
      });

      progressTl.from(progress[currentIndex], {
        duration: timeToNextSlide,
        scaleX: 0,
        ease: "none",
        transformOrigin: "left",
      });
    };

    sliderTl.eventCallback("onComplete", () => {
      progressAnimation();
      previousIndex = currentIndex;

      delay = gsap.delayedCall(timeToNextSlide, () => {
        currentIndex++;
        if (currentIndex === length) {
          currentIndex = 0;
        }
        slideArtworkin();
      });
    });

    indicators.forEach((indicator, i) => {
      indicator.addEventListener("click", () => {
        // kill all animations
        if (i !== currentIndex) {
          previousIndex = currentIndex;
          sliderTl.kill();
          progressTl.kill();
          delay.kill();

          gsap.killTweensOf(artworkContainers);
          gsap.killTweensOf(artworks);
          gsap.killTweensOf(progress);

          gsap.set(progress, {
            scaleX: 1,
          });

          currentIndex = i;
          slideArtworkin();
          sliderTl.play();
        }
      });
    });

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        progressAnimation();

        gsap.set(overflowEl, {
          overflow: "hidden",
        });

        delay = gsap.delayedCall(timeToNextSlide, () => {
          currentIndex++;
          if (currentIndex === length) {
            currentIndex = 0;
          }

          slideArtworkin();
          sliderTl.play();
        });
      },
    });

    gsap.set(indicators, {
      opacity: 1,
    });

    tl.fromTo(
      [words, stagger],
      {
        xPercent: 150,
        autoAlpha: 1,
      },
      {
        xPercent: 0,
        autoAlpha: 1,
        duration: 2,
        stagger: 0.05,
        ease: "expo.out",
      }
    )
      .fromTo(
        background,
        {
          xPercent: -100,
        },
        {
          xPercent: 0,
          duration: 2,
          backgroundColor: artworkContainers[0].dataset.cursorColor,
          ease: "expo.out",
        },
        "-=2.1"
      )
      .fromTo(
        artworkContainers,
        {
          xPercent: -10,
          autoAlpha: 1,
        },
        {
          duration: 1,
          stagger: 0.2,
          xPercent: 0,
          autoAlpha: 1,
          ease: "expo.out",
        },
        "-=2"
      )
      .fromTo(
        artworkDetails,
        {
          yPercent: 200,
        },
        {
          duration: 0.75,
          yPercent: 0,
          ease: "expo.out",
        }
      );

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
        className="md:h-[100vh] relative flex flex-col-reverse md:grid grid-cols-1 md:grid-cols-3 overflow-hidden"
        ref={el}
      >
        <div
          className="md:col-span-2 flex flex-col md:flex-row md:pt-0 pt-12 md:pb-0 pb-10 items-center justify-center relative gsap-background"
          style={{ backgroundColor: background }}
        >
          <div
            className="max-w-[285px] md:max-w-[446px] w-full rounded aspect-[4/5] gsap-parallax gsap-overflow"
            data-speed="-0.05"
          >
            <div className="relative w-full h-full grid-area-1/1">
              {featuredArtworks.map((item, i) => (
                <Link
                  key={i}
                  className="gsap-artwork-container opacity-0 overflow-hidden relative w-full h-full inline-block"
                  data-cursor="View Artwork"
                  data-cursor-color={item.vibrant_color}
                  href={`/gallery/artwork/${item.id}`}
                  style={{ zIndex: -i }}
                >
                  <div className="w-full h-full gsap-artwork">
                    <Image
                      src={item.media_url}
                      alt={item.name}
                      fill={true}
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>
                  <div className="absolute left-0 top-0 w-full h-full pointer-events-none black-gradient-2 overflow-hidden">
                    <div className="absolute bottom-6 left-5 pointer-events-auto gsap-fade">
                      <div className="flex">
                        {item.edition_type && (
                          <>
                            {item.edition_type === "NFT_Backed_by_print" && (
                              <span className="nft">nft + print</span>
                            )}
                            {item.edition_type === "NFT_Only" && (
                              <span className="nft">nft</span>
                            )}
                            {item.edition_type === "Print_Only" && (
                              <span className="print">print</span>
                            )}
                          </>
                        )}
                        <div className="b5 text-unveilWhite ml-1.5">
                          Edition of {item.editions?.length}
                        </div>
                      </div>
                      <small className=" block text-white l2 text-[8px] md:text-[12px]">
                        {item.name}
                      </small>
                      <div className="text-unveilWhite b4">
                        €2920 <span className="b5">(1,02 ETH)</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:absolute md:mt-0 mt-4 left-1/2 transform md:-translate-x-1/2 flex gap-2 bottom-[13vh]">
            {featuredArtworks.map((_, i) => (
              <button
                className="w-[84px] h-[3px] rounded-[31px] overflow-hidden grid-area-1/1 gsap-indicator opacity-0"
                key={i}
              >
                <span className="opacity-20 bg-unveilBlack block h-full w-full" />
                <span
                  className="bg-unveilWhite relative gsap-progress opacity-0 block h-full w-full"
                  style={{ zIndex: 1 }}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-1 mt-[114px] mb-[69px] md:mb-0 md:mt-0 md:flex flex-col justify-center px-2 md:px-8">
          <h1 className="gsap-title h3">
            {heading[0].split(" ").map((word, index) => (
              <span
                className="flex gap-2 md:gap-4 gsap-line overflow-hidden"
                key={index}
              >
                <span className="gsap-word opacity-0">{word}</span>
              </span>
            ))}
            <span className="flex gap-2 md:gap-4 gsap-line overflow-hidden">
              <span className="gsap-word opacity-0">{heading[1]}</span>
            </span>
          </h1>
          <p className="h5 mt-2.5 mb-4 md:mt-5 md:mb-6 max-w-[386px] gsap-stagger opacity-0">
            Curated photography by renowned photographers, and icons of the
            future.
          </p>

          <div className="flex gap-[10px] mt-5 gsap-stagger opacity-0">
            <div>
              <Link href="/gallery">
                {data.button_1_cursor_text && (
                  <button
                    data-cursor={data.button_1_cursor_text}
                    data-cursor-color={data.button_1_cursor_color}
                    className="btn btn-primary"
                  >
                    {data.button_1_text}
                  </button>
                )}
                {!data.button_1_cursor_text && (
                  <button className="btn btn-primary">
                    {data.button_1_text}
                  </button>
                )}
              </Link>
            </div>
            {/* Going to be a link */}
            <div>
              {data.button_2_cursor_text && (
                <button
                  onClick={() => setOpen(true)}
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

      <AccessPopIn3 open={accessOpen} setOpen={setAccessOpen} />
      <AccessPopIn2
        accessOpen={open}
        setAccessOpen={setOpen}
        i={1}
        data={data.request_access}
      />
    </>
  );
};

export default HomepageHero;
