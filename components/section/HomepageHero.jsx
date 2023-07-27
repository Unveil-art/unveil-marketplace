import { useHistory } from "@/contexts/History";
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import AccessPopIn2 from "../pop-in/AccessPopIn2";
import Link from "next/link";
import AccessPopIn3 from "../pop-in/AccessPopIn3";
import { useFontLoaded } from "@/hooks/useFontLoaded";
import { useWindowSize } from "@/hooks/useWindowSize";
import Image from "next/image";

const HomepageHero = ({ data }) => {
  const el = useRef();
  const once = useRef(false);
  const { previous } = useHistory();
  const query = gsap.utils.selector(el);
  const loaded = useFontLoaded(["Graphik", "Teodor"]);
  const size = useWindowSize();

  const [open, setOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [background, setBackground] = useState(data.topleft_color);

  const animateIn = useCallback(() => {
    const tl = gsap.timeline({ paused: true, repeat: -1 });
    let sliderTl = gsap.timeline();
    const progressTl = gsap.timeline();
    const stagger = query(".gsap-stagger");
    const artworks = query(".gsap-artwork");
    const artworkContainers = query(".gsap-artwork-container");
    const indicators = query(".gsap-indicator");
    const progress = query(".gsap-progress");
    const background = query(".gsap-background");
    const artworkDetails = query(".gsap-fade");

    const length = artworkContainers.length;
    let currentIndex = 0;
    const timeToNextSlide = 5;
    let delay;

    const slideArtworkin = () => {
      sliderTl.clear();
      sliderTl.set(artworkContainers, {
        zIndex: 0,
      });
      sliderTl.set(artworkContainers[currentIndex], {
        zIndex: 1,
        opacity: 1,
      });
      gsap.to(background, {
        backgroundColor: artworkContainers[currentIndex].dataset.cursorColor,
        duration: 0.5,
        delay: 0.1,
      });
      sliderTl
        .from(artworkContainers[currentIndex], {
          duration: 2,
          xPercent: 100,
          ease: "Expo.easeInOut",
        })
        .from(artworks[currentIndex], {
          duration: 2,
          xPercent: -100,
          delay: -2,
          ease: "Expo.easeInOut",
        })
        .from(artworkDetails[currentIndex], {
          duration: 0.3,
          opacity: 0,
          ease: "linear",
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

    slideArtworkin();

    sliderTl.eventCallback("onComplete", () => {
      progressAnimation();

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
        }
      });
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

  return (
    <>
      <section
        className="h-[100vh] relative grid grid-cols-1 md:grid-cols-3"
        ref={el}
      >
        <div
          className="md:col-span-2 flex items-center justify-center relative gsap-background"
          style={{ backgroundColor: background }}
        >
          <div className="max-w-[446px] w-full overflow-hidden aspect-[4/5]">
            <div className="relative w-full h-full grid-area-1/1">
              {/* {[1, 1, 1, 1].map((_, i) => ( */}
              <Link
                className="gsap-artwork-container opacity-0 overflow-hidden relative w-full h-full inline-block"
                data-cursor="View Artwork"
                data-cursor-color={data.topleft_color}
                href={`/people/${data.topleft_id}`}
              >
                <div className="w-full h-full gsap-artwork">
                  <Image
                    src={data.topleft.data.attributes.url}
                    alt={data.topleft.data.attributes.alt}
                    fill={true}
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div className="absolute left-0 top-0 w-full h-full pointer-events-none black-gradient-2">
                  <div className="absolute bottom-6 left-5 pointer-events-auto gsap-fade">
                    <div className="flex">
                      <span className="print">print</span>
                      <div className="b5 text-unveilWhite ml-1.5">
                        Edition of 5
                      </div>
                    </div>
                    <small className=" block text-white l2 text-[8px] md:text-[12px]">
                      {data.topleft_name}
                    </small>
                    <div className="text-unveilWhite b4">
                      €2920 <span className="b5">(1,02 ETH)</span>
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                className="gsap-artwork-container opacity-0 overflow-hidden relative w-full h-full inline-block"
                data-cursor="View Artwork"
                data-cursor-color={data.bottomleft_color}
                href={`/people/${data.bottomleft_id}`}
              >
                <div className="w-full h-full gsap-artwork">
                  <Image
                    src={data.bottomleft.data.attributes.url}
                    alt={data.bottomleft.data.attributes.alt}
                    fill={true}
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div className="absolute left-0 top-0 w-full h-full pointer-events-none black-gradient-2">
                  <div className="absolute bottom-6 left-5 pointer-events-auto gsap-fade">
                    <div className="flex">
                      <span className="print">print</span>
                      <div className="b5 text-unveilWhite ml-1.5">
                        Edition of 5
                      </div>
                    </div>
                    <small className=" block text-white l2 text-[8px] md:text-[12px]">
                      {data.bottomleft_name}
                    </small>
                    <div className="text-unveilWhite b4">
                      €2920 <span className="b5">(1,02 ETH)</span>
                    </div>
                  </div>
                </div>
              </Link>
              {/* ))} */}
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-2 bottom-[13vh]">
            <button className="w-[84px] h-[3px] rounded-[31px] overflow-hidden grid-area-1/1 gsap-indicator">
              <span className="opacity-20 bg-unveilBlack block h-full w-full" />
              <span
                className="bg-unveilWhite relative gsap-progress opacity-0 block h-full w-full"
                style={{ zIndex: 1 }}
              />
            </button>

            <button className="w-[84px] h-[3px] rounded-[31px] overflow-hidden grid-area-1/1 gsap-indicator">
              <span className="opacity-20 bg-unveilBlack block h-full w-full" />
              <span
                className="bg-unveilWhite relative gsap-progress opacity-0 block h-full w-full"
                style={{ zIndex: 1 }}
              />
            </button>
          </div>
        </div>
        <div className="md:col-span-1 md:flex flex-col justify-center pl-9 pr-7">
          <h1 className="h3">{data.heading}</h1>
          <p className="h5 mt-5 mb-6 max-w-[386px]">
            Curated photography by renowned photographers, and icons of the
            future.
          </p>
          {/* 
          {artwork.edition_type && (
            <>
              {artwork.edition_type === "NFT_Backed_by_print" && (
                <span className="nft-print">nft + print</span>
              )}
              {artwork.edition_type === "NFT_Only" && (
                <span className="nft">nft</span>
              )}
              {artwork.edition_type === "Print_Only" && (
                <span className="print">print</span>
              )}
            </>
          )} */}

          <div className="flex gap-[10px] mt-5">
            <div className="gsap-stagger">
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
            <div className="gsap-stagger">
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
