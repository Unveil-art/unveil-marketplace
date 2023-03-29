import { gsap } from "gsap";
import { useEffect } from "react";

export function useLineMaskingAnimation(el, isIntersecting) {
  const query = gsap.utils.selector(el)

  const animateIn = () => {
    gsap.timeline({
      paused: true
    }).timeScale(1.75).set(el.current, {
      autoAlpha: 1
    }, 0).fromTo(query('.gsap-line'), {
      scaleX: 0,
      transformOrigin: 'left center'
    }, {
      scale: 1,
      duration: 1.75,
      ease: 'power3.out'
    }, 0).fromTo(query('.gsap-transform'), {
      yPercent: -100,
      y: -40
    }, {
      yPercent: 0,
      y: 0,
      duration: 2.5,
      stagger: 0.2,
      ease: 'power3.out'
    }, 0.25).restart()
  }

  const animateOut = () => {
    gsap.set(el.current, {
      autoAlpha: 0
    })
  }

  useEffect(() => {
    if (isIntersecting) {
      animateIn()
    } else {
      animateOut()
    }
  }, [isIntersecting])
}
