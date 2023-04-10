import { gsap } from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

const Cursor = () => {
  const router = useRouter()
  const el = useRef()

  const [text, setText] = useState('')
  const [color, setColor] = useState('')

  const [isPointer, setIsPointer] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)

  const onMouseMove = useCallback(({ clientX, clientY }) => {
    gsap.to(el.current, {
      x: clientX,
      y: clientY,
      duration: hasMoved ? 0.4 : 0,
      ease: 'expo.out',
    })
    setHasMoved(true)
  }, [hasMoved])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, false)

    return () => {
      window.removeEventListener('mousemove', onMouseMove, false)
    }
  }, [hasMoved, onMouseMove])

  useEffect(() => {
    document.documentElement.classList.add('has-custom-cursor')

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  useEffect(() => {
    let elements = []

    const onMouseEnter = (event) => {
      const { currentTarget } = event
      const text = currentTarget.getAttribute('data-cursor')
      const color = currentTarget.getAttribute('data-cursor-color') || '#C1C1C1'
      setText(text)
      setColor(color)
      setIsPointer(true)
    }
    
    const onMouseLeave = (event) => {
      setIsPointer(false)
      setText('')
      setColor('')
    }

    const attachElements = () => {
      elements = [...document.querySelectorAll("[data-cursor")]

      elements.forEach((element) => {
        element.addEventListener('mouseenter', onMouseEnter, false)
        element.addEventListener('mouseleave', onMouseLeave, false)
      })
    }

    const removeElements = () => {
      elements.forEach((element) => {
        element.removeEventListener('mouseenter', onMouseEnter, false)
        element.removeEventListener('mouseleave', onMouseLeave, false)
      })
    }
    
    router.events.on('routeChangeStart', removeElements)
    router.events.on('routeChangeComplete', attachElements)

    attachElements()

    return () => {
      router.events.off('routeChangeStart', removeElements)
      router.events.off('routeChangeComplete', attachElements)
      
      removeElements()
    }
  }, [])

  return (
    <div ref={el} className="fixed top-0 left-0 pointer-events-none z-10" style={{ opacity: hasMoved && isPointer ? 1 : 0 }}>
      <span className="inline-flex justify-items-center items-center l2 h-[33px] rounded-[5px] border border-solid border-black px-[10px] py-[7px] mt-4 ml-4" style={{ backgroundColor: color }}>
        { text }
      </span>
    </div>
  )
}

export default Cursor;
