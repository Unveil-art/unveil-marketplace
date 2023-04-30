import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useRef, useLayoutEffect } from "react";
import { useFontLoaded } from "@/hooks/useFontLoaded";

import AboutIntro from "@/components/section/gallery-page/AboutIntro";
import AboutItem from "@/components/section/gallery-page/AboutItem";
import ItemStatistics from "@/components/section/gallery-page/ItemStatistics";

const GalleryAbout = () => {
  const el = useRef();
  const fontsLoaded = useFontLoaded(["Graphik", "Teodor"]);
  const query = gsap.utils.selector(el);

  useLayoutEffect(() => {
    if (fontsLoaded) {
      const ctx = gsap.matchMedia();
      ctx.add('(min-width: 768px)', () => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(query('.gsap-scroll'), {
          xPercent: -100,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: el.current,
            pin: el.current,
            scrub: 1,
            markers: false,
            start: 'top top',
            invalidateOnRefresh: true
          }
        })
      }, el)
      return () => ctx.revert()
    }
  }, [fontsLoaded]);

  return (
    <>
      <AboutIntro />
      <section ref={el} className="relative w-full py-10 md:py-[90px]">
        <AboutItem />
        <ItemStatistics />
      </section>
    </>
  );
};

export default GalleryAbout;
