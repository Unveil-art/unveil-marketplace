import { gsap } from "gsap";
import { useRef, useEffect, useCallback } from "react";
import { useIntersection } from "@/hooks/useIntersection";

const Animate = ({
  options = {},
  className,
  children
}) => {
  const el = useRef()
  const query = gsap.utils.selector(el)
  const { isIntersecting, boundingClientRect } = useIntersection(el)

  const defaults = {...options, ...{
    y: 50,
    alpha: false,
    delay: 'none',
    stagger: {
      y: 0,
      value: 0.07
    }
  }}

  const animateIn = () => {
    const direction = boundingClientRect.top <= 0 ? -1 : 1
    const stagger = query('.gsap-stagger')
    const delay = defaults.delay === 'random' ? Math.random() * 1.0 : 0
    const tl = gsap.timeline({
      paused: true
    }).set(el.current, {
      autoAlpha: 1
    }, delay).fromTo(el.current, {
      autoAlpha: defaults.alpha ? 0 : 1
    }, {
      autoAlpha: 1,
      duration: 0.75,
      ease: 'none'
    }, delay).fromTo(el.current, {
      y: defaults.y ? (defaults.y * direction) : 0
    }, {
      y: 0,
      duration: 0.75,
      ease: 'expo.out',
      clearProps: 'transform'
    }, delay)
    if (stagger && stagger.length > 0) {
      tl.fromTo(stagger, {
        y: defaults?.stagger?.y || 0,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        stagger: defaults?.stagger?.value,
        ease: 'expo.out',
        clearProps: 'transform'
      }, delay)
    }
    tl.restart()
  }

  const animateOut = useCallback(() => {
    gsap.set(el.current, {
      autoAlpha: 0
    })
  }, [])

  useEffect(() => {
    if (isIntersecting) {
      animateIn()
    } else {
      animateOut()
    }
  }, [isIntersecting])

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
};

export default Animate;
