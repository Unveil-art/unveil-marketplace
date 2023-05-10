import { gsap } from "gsap";
import { useRef, useLayoutEffect } from "react";
import { useRect } from "@/hooks/useRect";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useLenis } from "@studio-freight/react-lenis";

import AboutIntro from "@/components/section/gallery-page/AboutIntro";
import AboutItem from "@/components/section/gallery-page/AboutItem";
import ItemStatistics from "@/components/section/gallery-page/ItemStatistics";

const GalleryAbout = () => {
  const el = useRef();
  const tl = useRef();
  const size = useWindowSize();
  const [setRef, rect] = useRect();

  useLayoutEffect(() => {
    const query = gsap.utils.selector(el);
    const ctx = gsap.matchMedia();
    ctx.add('(min-width: 768px)', () => {
      tl.current = gsap.timeline({
        paused: true
      }).to(query('.gsap-scroll'), {
        xPercent: -100,
        ease: 'power2.inOut'
      })
      return () => {
        tl.current = null
      }
    }, el)
  }, []);

  useLenis(({ scroll }) => {
    if (tl.current) {
      const top = rect.top - scroll
      const progress = gsap.utils.clamp(0, 1, top / (rect.top - rect.height + size.width))
      tl.current.progress(progress)
    }
  }, [rect], 1);

  return (
    <>
      <AboutIntro />
      <section ref={el} className="relative w-full">
        <div
          className="block w-full md:h-[500vh]"
          ref={(node) => setRef(node)}
        >
          <div className="block w-full md:sticky md:top-0">
            <AboutItem />
            <ItemStatistics />
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryAbout;
