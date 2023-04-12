import { gsap } from "gsap";
import { useRef, useState, useEffect } from "react";
import { useIntersection } from "../../hooks/useIntersection";
// import { useWindowSize } from "@/hooks/useWindowSize";

const Animate = ({ options = {}, className, children }) => {
  const el = useRef();
  // const size = useWindowSize()
  const query = gsap.utils.selector(el);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const { isIntersecting, boundingClientRect } = useIntersection(el);

  const defaults = Object.assign(
    {
      y: 50,
      alpha: false,
      delay: 0,
      stagger: {
        y: 0,
        value: 0.07,
      },
    },
    options
  );

  const animateIn = () => {
    // const isInViewRendered = isIntersecting && boundingClientRect.top >= 0 && boundingClientRect.bottom <= size.height
    const direction = boundingClientRect.top <= 0 ? -1 : 1;
    const stagger = query(".gsap-stagger");
    const delay = defaults.delay === "random" ? Math.random() * 1.0 : defaults.delay;
    const tl = gsap
      .timeline({
        paused: true
      })
      .set(
        el.current,
        {
          autoAlpha: 1,
        },
        delay
      )
      .fromTo(
        el.current,
        {
          autoAlpha: defaults.alpha ? 0 : 1,
        },
        {
          autoAlpha: 1,
          duration: 0.75,
          ease: "none",
        },
        delay
      )
      .fromTo(
        el.current,
        {
          y: defaults.y ? defaults.y * direction : 0,
        },
        {
          y: 0,
          duration: 0.75,
          ease: "expo.out",
          clearProps: "transform",
        },
        delay
      );
    if (stagger && stagger.length > 0) {
      tl.fromTo(
        stagger,
        {
          y: defaults?.stagger?.y || 0,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          stagger: defaults?.stagger?.value,
          ease: "expo.out",
          clearProps: "transform",
        },
        delay
      );
    }
    tl.restart();
    setIsAnimated(true)
  };

  const animateOut = () => {
    gsap.set(el.current, {
      autoAlpha: 0,
    });
    setIsAnimated(false);
  };

  useEffect(() => {
    if (isAnimating) return;
    if (isIntersecting && !isAnimated) {
      setIsAnimating(true);
      animateIn();
    } else if (!isIntersecting && isAnimated) {
      setIsAnimating(false);
      animateOut();
    }
  }, [isIntersecting, isAnimating, isAnimated]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
};

export default Animate;
