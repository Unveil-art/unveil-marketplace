import { gsap } from "gsap";
import { useEffect, useCallback } from "react";
import { useIntersection } from "../useIntersection";

export function useLineMaskingAnimation(el) {
  const query = gsap.utils.selector(el);
  const { isIntersecting } = useIntersection(el);

  const animateIn = useCallback(() => {
    const line = query(".gsap-line")
    const transform = query(".gsap-transform")
    gsap.killTweensOf([line, transform])
    // prettier-ignore
    gsap.timeline({
      paused: true,
    }).timeScale(1.75).set(el.current, {
      autoAlpha: 1,
    }, 0).fromTo(line, {
      scaleX: 0,
      transformOrigin: "left center",
    }, {
      scale: 1,
      duration: 1.75,
      ease: "power3.out",
    }, 0).fromTo(transform, {
      yPercent: -100,
      y: -40,
    }, {
      yPercent: 0,
      y: 0,
      duration: 2.5,
      stagger: 0.2,
      ease: "power3.out",
    }, 0.25).restart();
  });

  const animateOut = useCallback(() => {
    gsap.set(el.current, {
      autoAlpha: 0,
    });
  });

  useEffect(() => {
    if (isIntersecting) {
      animateIn();
    } else {
      animateOut();
    }
  }, [isIntersecting]);
}
