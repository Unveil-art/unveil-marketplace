import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import { useIntersection } from "@/hooks/useIntersection";

const Animate = ({
  options = {
    y: 50,
    alpha: false,
    stagger: {
      y: 0,
      value: 0.07
    }
  },
  className,
  children
}) => {
  const el = useRef()
  const query = gsap.utils.selector(el)
  const { isIntersecting, boundingClientRect } = useIntersection(el)

  const animateIn = () => {
    const direction = boundingClientRect.top <= 0 ? -1 : 1
    const stagger = query('.gsap-stagger')
    const tl = gsap.timeline({
      paused: true
    }).set(el.current, {
      autoAlpha: 1
    }, 0).fromTo(el.current, {
      autoAlpha: options.alpha ? 0 : 1
    }, {
      autoAlpha: 1,
      duration: 0.75,
      ease: 'none'
    }, 0).fromTo(el.current, {
      y: options.y ? (options.y * direction) : 0
    }, {
      y: 0,
      duration: 0.75,
      ease: 'expo.out',
      clearProps: 'transform'
    }, 0)
    if (stagger && stagger.length > 0) {
      tl.fromTo(stagger, {
        y: options?.stagger?.y || 0,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        stagger: options?.stagger?.value,
        ease: 'expo.out',
        clearProps: 'transform'
      }, 0)
    }
    tl.restart()
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

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
};

export default Animate;
