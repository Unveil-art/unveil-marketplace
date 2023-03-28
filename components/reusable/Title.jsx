import { gsap } from "gsap";
import { forwardRef, useRef, useEffect, useImperativeHandle } from "react";
import { useIntersection } from "@/hooks/useIntersection";

const Title = ({ title = "Title", color = "#141414" }, ref) => {
  const el = useRef()
  const query = gsap.utils.selector(el)
  const { isIntersecting } = useIntersection(el)

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
    }, 0).fromTo(query('.gsap-title'), {
      yPercent: -100,
      y: -40
    }, {
      yPercent: 0,
      y: 0,
      duration: 2.0,
      ease: 'expo.out'
    }, 0.25).restart()
  }

  const animateOut = () => {
    gsap.set(el.current, {
      autoAlpha: 0
    })
  }

  useImperativeHandle(ref, () => ({
    animateIn
  }))

  useEffect(() => {
    if (isIntersecting) {
      animateIn()
    } else {
      animateOut()
    }
  }, [isIntersecting])

  return (
    <div ref={el} className="ml-[40px] md:ml-[35svw] md:pr-[40px] overflow-hidden">
      <div style={{ backgroundColor: color }} className={`gsap-line h-[5px] mb-5`}></div>
      <h2 className="gsap-title h1 pb-2">{title}</h2>
    </div>
  );
};

export default forwardRef(Title);
