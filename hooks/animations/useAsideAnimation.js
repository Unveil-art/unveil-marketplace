import { gsap } from "gsap";
import { useEffect, useState } from "react";

export function useAsideAnimation(el, open) {
  const query = gsap.utils.selector(el);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    gsap.set(el.current, { autoAlpha: 0 });
    gsap.set(query(".gsap-el"), { xPercent: 110 });
    gsap.set(query(".gsap-layer"), { autoAlpha: 0 });
    setHasRendered(true);
  }, []);

  useEffect(() => {
    if (hasRendered) {
      gsap
        .timeline({
          paused: true,
        })
        .set(
          el.current,
          {
            autoAlpha: 1,
          },
          0
        )
        .to(
          query(".gsap-el"),
          {
            xPercent: open ? 0 : 110,
            duration: 1,
            ease: "expo.out",
          },
          0
        )
        .to(
          query(".gsap-layer"),
          {
            autoAlpha: open ? 1 : 0,
            duration: 0.4,
            ease: "none",
          },
          open ? 0 : 0.25
        )
        .set(el.current, {
          autoAlpha: open ? 1 : 0,
        })
        .restart();
    }
  }, [hasRendered, open]);
}
