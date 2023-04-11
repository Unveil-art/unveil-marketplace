import { useEffect, useState } from "react"

export function useFontLoaded(...fonts) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!document || !document.fonts) {
      // eslint-disable-next-line no-console
      console.warn("Browser does not support document.fonts API")
      return
    }

    Promise.all(fonts.map((fontName) => document.fonts.load(`16px "${fontName}"`))).then(() => {
      setIsLoaded(true)
    })
  }, [fonts])

  return isLoaded
}
