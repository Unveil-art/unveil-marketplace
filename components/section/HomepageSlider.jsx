import React, { useCallback, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useLenis } from "@studio-freight/react-lenis";

const HomepageSlider = ({ data }) => {
  const el = useRef();
  const query = gsap.utils.selector(el);

  const animateSlider = useCallback(() => {
    let sliderTl = gsap.timeline({ paused: true });
    const progressTl = gsap.timeline();
    const sliderItems = query(".gsap-slider-item");
    const sliderItemsInner = query(".gsap-slider-item-inner");
    const sliderDuplicateTexts = query(".homepage-slider-duplicate-text");
    let currentIndex = 0;
    let previousIndex = 0;
    const timeToNextSlide = 8;
    let delay;
    const length = sliderItems.length;

    gsap.set(sliderItems, {
      xPercent: 100,
    });

    gsap.set(sliderItems[currentIndex], {
      xPercent: 0,
    });

    const progressAnimation = () => {
      progressTl.clear();

      gsap.set(sliderDuplicateTexts, {
        backgroundSize: "0% 100%",
      });

      progressTl.to(sliderDuplicateTexts[currentIndex], {
        duration: timeToNextSlide,
        backgroundSize: "100% 100%",
        ease: "none",
      });
    };

    const slideArtworkin = () => {
      sliderTl.clear();

      gsap.set(sliderItems, {
        zIndex: 0,
      });

      gsap.set(sliderItems[previousIndex], {
        zIndex: 1,
      });

      gsap.set(sliderItems[currentIndex], {
        zIndex: 2,
      });

      sliderTl.to(sliderItems[previousIndex], {
        duration: 1,
        xPercent: -90,
        ease: "power2.inOut",
      });

      sliderTl.fromTo(
        sliderItems[currentIndex],
        {
          xPercent: 100,
        },
        {
          duration: 1,
          xPercent: 0,
          ease: "power2.inOut",
        },
        "-=1"
      );
      sliderTl.fromTo(
        sliderItemsInner[currentIndex],
        {
          scale: 1.3,
        },
        {
          duration: 1,
          ease: "power2.inOut",
          scale: 1,
        },
        "-=1"
      );
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

    delay = gsap.delayedCall(timeToNextSlide, () => {
      currentIndex++;
      if (currentIndex === length) {
        currentIndex = 0;
      }
      slideArtworkin();
      sliderTl.play();
    });

    sliderDuplicateTexts.forEach((item, i) => {
      item.addEventListener("click", () => {
        // kill all animations
        if (i !== currentIndex) {
          previousIndex = currentIndex;
          sliderTl.kill();
          progressTl.kill();
          delay.kill();

          gsap.killTweensOf(sliderItems);
          gsap.killTweensOf(sliderDuplicateTexts);

          gsap.set(sliderDuplicateTexts, {
            backgroundSize: "0% 100%",
          });

          currentIndex = i;
          slideArtworkin();
          sliderTl.play();
        }
      });
    });

    progressAnimation();
  });

  useEffect(() => {
    animateSlider();
  }, []);

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
    <section className="relative" ref={el}>
      <div className="h-screen w-ful z-10 relative gsap-scroll-item">
        <div className="sticky h-60 w-full top-0 left-0 md:block pointer-events-none z-20 homepage-slider-top-gradient" />
        <div className="absolute h-full w-full top-0 left-0 flex items-center md:px-16 px-6 z-10">
          <div className="flex items-center relative py-10 md:py-40">
            <div className="homepage-slider-content-gradient absolute w-full h-full top-0 -left-1 md:-left-40 -z-10 opacity-25 md:opacity-30" />
            <div className="mr-6 md:mr-14 vertical backwards s3 text-unveilWhite">
              {data?.vertical_text}
            </div>
            <div className="">
              <div className="flex mb-2.5">
                <span className="nft-print mr-0.5 text-white border-unveilWhite">
                  {data?.artwork_type}
                </span>
                <span className="nft bg-white border-0">
                  {data?.edition_type}
                </span>
              </div>
              <div className="mb-4 text-white">
                {data.titles.map((data) => (
                  <div className="relative" key={data.id}>
                    <div
                      className="h1-5 relative homepage-slider-duplicate-text"
                      aria-hidden
                    >
                      {data?.title}
                    </div>
                    <h1 className="h1-5 opacity-50 absolute top-0 transition-opacity">
                      {data?.title}
                    </h1>
                  </div>
                ))}
              </div>
              <div className="flex">
                <Link
                  target="_blank"
                  className="btn btn-primary-white inline-block mr-2"
                  href={data?.collection_link}
                >
                  See Collection
                </Link>
                <Link
                  target="_blank"
                  className="btn btn-white hidden md:inline-block"
                  href={data?.ticket_link}
                >
                  Win tickets to Unseen
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
          <div
            className="absolute w-full h-[110%] top-0 left-0 gsap-parallax"
            data-speed="-0.1"
          >
            {data.images.map((image) => (
              <div
                className="absolute w-full h-full top-0 left-0 gsap-slider-item overflow-hidden"
                key={image.id}
              >
                <div className="absolute w-full h-full top-0 left-0 gsap-slider-item-inner">
                  <img
                    src={image?.image?.data[0]?.attributes.url}
                    alt={image?.image?.data[0]?.attributes.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-screen w-full bg-transparent gsap-scroll-transparent pointer-events-none"></div>
    </section>
  );
};

export default HomepageSlider;
