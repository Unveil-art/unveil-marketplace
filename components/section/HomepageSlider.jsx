import React, { useCallback, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const HomepageSlider = () => {
  const el = useRef();
  const query = gsap.utils.selector(el);

  const animateSlider = useCallback(() => {
    let sliderTl = gsap.timeline({ paused: true });
    const progressTl = gsap.timeline();
    const sliderIems = query(".gsap-slider-item");
    const sliderDuplicateTexts = query(".homepage-slider-duplicate-text");

    let currentIndex = 0;
    let previousIndex = 0;
    const timeToNextSlide = 8;
    let delay;
    const length = sliderIems.length;

    gsap.set(sliderIems, {
      xPercent: 100,
    });

    gsap.set(sliderIems[currentIndex], {
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

      sliderTl.to(sliderIems[previousIndex], {
        duration: 1,
        xPercent: -100,
        ease: "power2.inOut",
      });

      sliderTl.fromTo(
        sliderIems[currentIndex],
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

          gsap.killTweensOf(sliderIems);
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

  return (
    <section className="relative" ref={el}>
      <div className="h-screen w-full bg-red-500 z-10 relative gsap-scroll-item">
        <div className="sticky h-60 w-full top-0 left-0 md:block pointer-events-none z-20 homepage-slider-top-gradient" />
        <div className="absolute h-full w-full top-0 left-0 flex items-center md:px-16 px-6 z-10">
          <div className="flex items-center relative py-10 md:py-40">
            <div className="homepage-slider-content-gradient absolute w-full h-full top-0 -left-1 md:-left-40 -z-10 opacity-25 md:opacity-30" />
            <div className="mr-6 md:mr-14 vertical backwards s3 text-unveilWhite">
              CHAPTER 01: UNSEEN
            </div>
            <div className="">
              <div className="flex mb-2.5">
                <span className="nft-print mr-0.5 text-white border-unveilWhite">
                  print
                </span>
                <span className="nft bg-white border-0">Extended EDITION</span>
              </div>
              <div className="mb-4 text-white">
                <div className="relative">
                  <h1 className="h1-5 opacity-50 absolute curso">
                    Thomas Albdorf
                  </h1>
                  <div
                    className="h1-5 relative homepage-slider-duplicate-text"
                    aria-hidden
                  >
                    Thomas Albdorf
                  </div>
                </div>
                <div className="relative">
                  <h1 className="h1-5 opacity-50 absolute">
                    Awoiska van der Molen
                  </h1>
                  <div
                    className="h1-5 relative homepage-slider-duplicate-text"
                    aria-hidden
                  >
                    Awoiska van der Molen
                  </div>
                </div>
                <div className="relative">
                  <h1 className="h1-5 opacity-50 absolute">Kim Boske</h1>
                  <div
                    className="h1-5 relative homepage-slider-duplicate-text"
                    aria-hidden
                  >
                    Kim Boske
                  </div>
                </div>
              </div>
              <div className="flex">
                <Link
                  className="btn btn-primary-white inline-block mr-2"
                  href="/"
                >
                  See Collection
                </Link>
                <Link className="btn btn-white hidden md:inline-block" href="/">
                  Win tickets to Unseen
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
          <div className="absolute w-full h-full top-0 left-0 gsap-slider-item">
            <img
              src="/images/bg-hero-image.jpg"
              alt="hero image"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute w-full h-full top-0 left-0 gsap-slider-item">
            <img
              src="https://fellowship.xyz/wp-content/uploads/Taysa-Jorge-Solitude-Mysteries-to-Discover-2022-%C2%A9-Taysa-Jorge-aspect-ratio-16-9.jpg"
              alt="hero image"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute w-full h-full top-0 left-0 gsap-slider-item">
            <img
              src="https://fellowship.xyz/wp-content/uploads/Tania-Franco-Klein-Our-Life-In-The-Shadows-Curtain-self-portrait-2016-Tania-Franco-Klein-Fellowship-drop-31-%C2%A9-Tania-Franco-Klein-2-aspect-ratio-16-9.jpg"
              alt="hero image"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="h-screen w-full bg-transparent gsap-scroll-transparent pointer-events-none"></div>
    </section>
  );
};

export default HomepageSlider;
