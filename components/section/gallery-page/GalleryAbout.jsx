import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import { useRect } from "@/hooks/useRect";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useLenis } from "@studio-freight/react-lenis";

import AboutIntro from "@/components/section/gallery-page/AboutIntro";
import AboutItem from "@/components/section/gallery-page/AboutItem";
import ItemStatistics from "@/components/section/gallery-page/ItemStatistics";

const GalleryAbout = ({ artwork }) => {
  const el = useRef();
  const tl = useRef();
  const size = useWindowSize();
  const [setRef, rect] = useRect();

  const _detail_shots = artwork?.detail_shots?.filter(({ image_url }) => !!image_url);
  const stickyEnabled = _detail_shots.length > 0

  useEffect(() => {
    const query = gsap.utils.selector(el);
    const ctx = gsap.matchMedia();
    ctx.add(
      "(min-width: 768px)",
      () => {
        tl.current = gsap
          .timeline({
            paused: true,
          })
          .to(query(".gsap-scroll"), {
            xPercent: -100,
            x: size.width,
            ease: "power2.inOut",
          });
        return () => {
          tl.current = null;
        };
      },
      el
    );
  }, [size.width]);

  useLenis(
    ({ scroll }) => {
      if (tl.current) {
        const top = rect.top - scroll;
        const progress = gsap.utils.clamp(
          0,
          1,
          top / (rect.top - rect.height + size.width)
        );
        tl.current.progress(progress);
      }
    },
    [rect],
    1
  );
  
  return (
    <>
      <AboutIntro collection={artwork.collection} />
      <section ref={el} className="relative w-full">
        <div className={`block w-full ${stickyEnabled ? `md:h-[500vh]` : 'md:h-auto'}`} ref={(node) => setRef(node)}>
          <div className="block w-full md:sticky md:top-0">
            {stickyEnabled && (
              <AboutItem
                owner={artwork.owner}
                detail_shots={_detail_shots}
              />
            )}
            <ItemStatistics artwork={artwork} />
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryAbout;
