import { useEffect, useState } from 'react'

export function useIntersection(el, {
  root = null,
  rootMargin = '100px',
  thresholds = [0.0, 1.0],
  once = false,
} = {}) {
  const [inView, setInView] = useState({
    isIntersecting: false,
    boundingClientRect: null
  })

  useEffect(() => {
    if (!el) return
    const intersection = new IntersectionObserver(([{ isIntersecting, boundingClientRect }]) => {
      setInView({
        isIntersecting,
        boundingClientRect
      })
      if (once) intersection.disconnect()
    }, {
      root,
      rootMargin,
      thresholds,
    })
    intersection.observe(el.current)

    return () => {
      intersection.disconnect()
    }
  }, [el, root, rootMargin, thresholds, once])

  return inView
}
