import { useRouter } from "next/router";
import { createContext, useState, useEffect, useRef, useContext } from "react";

const HistoryContext = createContext()

export const HistoryProvider = ({ children }) => {
  const { asPath } = useRouter()

  const [history, setHistory] = useState([])
  const [previous, setPrevious] = useState(null)
  
  useEffect(() => {
    setPrevious(history[history.length - 1])
    setHistory(previous => [...previous, asPath])
  }, [asPath])

  return (
    <HistoryContext.Provider
      value={{
        previous,
        setPrevious,
        history,
        setHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const context = useContext(HistoryContext)
  return context
}
