import { useCallback, useEffect, useMemo, useState } from 'react'
import { useIsClient } from '@/hooks/useIsClient'

export function useMediaQuery(queryString) {
  const isClient = useIsClient()

  const mediaQuery = useMemo(() => {
    if (isClient) {
      try {
        return window.matchMedia(queryString)
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error)
        }
      }
    }

    return null
  }, [queryString, isClient])

  const [isMatch, setIsMatch] = useState(undefined)

  const onChange = useCallback(({ matches }) => {
    setIsMatch(matches)
  }, [])

  useEffect(() => {
    if (mediaQuery) {
      onChange(mediaQuery)

      mediaQuery.addEventListener('change', onChange, { passive: true })

      return () => {
        mediaQuery.removeEventListener('change', onChange, { passive: true })
      }
    }
  }, [mediaQuery, onChange, isClient])

  return isMatch
}