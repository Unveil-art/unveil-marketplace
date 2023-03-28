import { gsap } from "gsap";
import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useFontLoaded } from "@/hooks/useFontLoaded";

const FloatingArt = () => {
  const el = useRef()
  const once = useRef(false)
  const size = useWindowSize()
  const loaded = useFontLoaded('Graphik')
  const query = gsap.utils.selector(el)

  const copy = [
    'Discover,',
    'collect',
    'and learn'
  ]

  const animateIn = useCallback(() => {
    const align = query('.gsap-align')
    const words = query('.gsap-word')
    const title = query('.gsap-title')
    const line = query('.gsap-line')
    const stagger = query('.gsap-stagger')
    const thumbnails = query('.gsap-thumbnail')
    const cache = words.map((el) => el.getBoundingClientRect())
    const images = thumbnails.map((el) => el.getBoundingClientRect())
    const padding = parseInt(getComputedStyle(el.current).getPropertyValue('padding-left'))
    const tl = gsap.timeline({
      paused: true
    }).timeScale(1.25).set(el.current, {
      autoAlpha: 1
    }, 0).set(align, {
      y: cache[0].height * 0.5
    }, 0)
    words.forEach((word, index) => {
      const width = cache.reduce((sum, entry, loop) => loop <= index ? sum + entry.width : sum, 0)
      const translate = (size.width * 0.5) - (width * 0.5) - padding
      tl.to(title, {
        x: translate,
        duration: index === 0 ? 0 : 0.5,
        ease: 'expo.out'
      }, 0.75 * index).fromTo(word, {
        y: 20,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.75,
        ease: 'expo.out'
      }, 0.75 * index)
    })
    tl.to(title, {
      x: 0,
      duration: 1,
      ease: 'expo.inOut'
    }).fromTo(line, {
      x: 40,
      autoAlpha: 0
    }, {
      x: 0,
      autoAlpha: 1,
      duration: 0.45,
      ease: 'expo.out'
    }, '-=0.65').fromTo(stagger, {
      x: 10,
      autoAlpha: 0
    }, {
      x: 0,
      autoAlpha: 1,
      duration: 0.75,
      stagger: 0.07,
      ease: 'expo.out'
    }, '-=0.25')
    thumbnails.forEach((el, index) => {
      const { top, height } = images[index]
      const sign = Math.sign((top + (height * 0.5)) - (size.height * 0.5))
      const margin = sign === -1 ? top : (size.height - (top + (height * 0.5)))
      const value = (height + margin) * sign
      console.log({ index, value })
      tl.fromTo(el, {
        autoAlpha: 1,
        y: value
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 1.25,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=1.1')
    })
    tl.restart()
  }, [size])

  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.set(el.current, {
      autoAlpha: 0
    })
    if (!once.value && loaded && size.width && size.height) {
      once.value = true
      animateIn()
    }
  }, [loaded, size])

  // (https://greensock.com/react)
  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     // gsap.to(".box", {...})
  //   }, el)
  //   return () => ctx.revert()
  // }, [])

  return (
    <>
      <section ref={el} className="h-[100svh] flex justify-center flex-col p-[15px] sm:p-10 relative overflow-hidden">
        {/* <div className="fixed width-[1px] h-screen left-[50%] border border-rose-600"></div> */}
        <div data-cursor="View Artist" data-cursor-color="#8A8E7B" className="gsap-thumbnail absolute block top-[5%] left-[20%] z-10">
          <div className="bg-unveilGreen w-[70px] h-[89px] sm:w-[140px] sm:h-[180px]"></div>
          <small className="sm:block hidden l2">Batiaan Woudt</small>
        </div>

        <div data-cursor="View Artist" data-cursor-color="#5B91AC" className="gsap-thumbnail absolute block bottom-[20%] sm:bottom-[5%] right-[10%] left-auto sm:left-[40%] sm:right-auto z-10">
          <div className="bg-unveilGreen w-[70px] h-[89px] sm:w-[140px] sm:h-[180px]"></div>
          <small className="sm:block hidden l2">Batiaan Woudt</small>
        </div>

        <div data-cursor="View Artist" data-cursor-color="#C1C1C1" className="gsap-thumbnail absolute block top-[10%] sm:top-0 right-[4%] sm:right-auto sm:left-1/2 z-10">
          <div className="bg-unveilGreen w-[136px] h-[184px] sm:w-[410px] sm:h-[500px]"></div>
          <small className="sm:block hidden l2">Batiaan Woudt</small>
        </div>

        <div data-cursor="View Artist" data-cursor-color="#B6B0A4" className="gsap-thumbnail absolute block bottom-[0] sm:bottom-[30%] left-0 sm:left-auto sm:right-0 sm:translate-y-1/2 translate-y-0 z-10">
          <div className="bg-unveilGreen w-[164px] h-[229px] sm:w-[320px] sm:h-[422px]"></div>
          <small className="sm:block hidden l2">Batiaan Woudt</small>
        </div>

        <div className="gsap-align relative max-w-[700px] z-20">
          <h1 className="gsap-title h3">
            <span className="flex gap-4">
              {copy.map((word, index) => <span className="gsap-word" key={index}>{ word }</span>)}
            </span>
            <span className="gsap-line flex gap-4">
              <span>all</span> <span>about</span> <span>photography.</span>
            </span>
          </h1>
          <div className="flex gap-[10px] mt-10">
            <Link href="" className="gsap-stagger">
              <button className="btn btn-primary">Start collecting</button>
            </Link>
            <Link href="" className="gsap-stagger">
              <button className="btn btn-secondary">Request access</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FloatingArt;
