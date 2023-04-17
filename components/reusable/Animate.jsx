import { gsap } from "gsap";
import { useRef, useState, useEffect, useCallback } from "react";
import { useIntersection } from "../../hooks/useIntersection";

const Animate = ({ options = {}, className, children }) => {
  const el = useRef();
  const query = gsap.utils.selector(el);

  const [isAnimated, setIsAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isIntersecting, boundingClientRect } = useIntersection(el);

  const defaults = Object.assign(
    {
      y: 50,
      alpha: false,
      image: false,
      delay: 0,
      stagger: {
        y: 0,
        value: 0.07,
      },
    },
    options
  );

  const animateIn = useCallback(() => {
    const direction = boundingClientRect.top <= 0 ? -1 : 1;
    const stagger = query(".gsap-stagger");
    const image = query(".gsap-image");
    const delay = defaults.delay === "random" ? Math.random() * 1.0 : defaults.delay;
    // prettier-ignore
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => setIsAnimating(false)
    }).set(el.current, {
      autoAlpha: 1,
    }, delay).fromTo(el.current, {
      autoAlpha: defaults.alpha ? 0 : 1,
    }, {
      autoAlpha: 1,
      duration: 0.75,
      ease: "none",
    }, delay).fromTo(el.current, {
      y: defaults.y ? defaults.y * direction : 0,
    }, {
      y: 0,
      duration: 0.75,
      ease: "expo.out",
      clearProps: "transform",
    }, delay);
    if (stagger && stagger.length > 0) {
      // prettier-ignore
      tl.fromTo(stagger, {
        y: defaults?.stagger?.y || 0,
        autoAlpha: 0,
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        stagger: defaults?.stagger?.value,
        ease: "expo.out",
        clearProps: "transform",
      }, delay);
    }
    if (defaults.image && image) {
      // prettier-ignore
      tl.fromTo(image, {
        autoAlpha: 0,
        scale: 1.2
      }, {
        autoAlpha: 1,
        scale: 1,
        duration: 2.0,
        ease: 'expo.out'
      }, delay)
    }
    tl.restart();
    setIsAnimated(true);
  });

  const animateOut = useCallback(() => {
    const stagger = query(".gsap-stagger");
    setIsAnimated(false);
    gsap.set(el.current, {
      autoAlpha: 0,
    });
    if (stagger) {
      gsap.set(stagger, {
        autoAlpha: 0,
      })
    }
  });

  useEffect(() => {
    if (isAnimating) return;
    if (isIntersecting && !isAnimated) {
      setIsAnimating(true);
      animateIn();
    } else if (!isIntersecting && isAnimated) {
      setIsAnimating(false);
      animateOut();
    }
  }, [isIntersecting, isAnimated, isAnimating]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
};

export default Animate;
