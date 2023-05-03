import { useEffect, useState } from "react";

const useLocalStorage = (key) => {
  const [storage, setStorage] = useState("");
  const setValue = (value) => {
    localStorage.setItem(key, value);
    setStorage(value);
    dispatchEvent(new Event("storage"));
  };
  const removeValue = () => {
    localStorage.removeItem(key);
    setStorage(null);
    dispatchEvent(new Event("storage"));
  };
  useEffect(() => {
    const storageValue = localStorage.getItem(key);
    setStorage(storageValue);
    window.addEventListener("storage", () => {
      const storageValue = localStorage.getItem(key);
      if (storageValue !== "null") {
        setStorage(storageValue);
      }
    });
    return () => {
      window.removeEventListener("storage", () => {
        setStorage("");
      });
    };
  }, [key]);

  return {
    value: storage,
    setValue,
    removeValue,
  };
};
export default useLocalStorage;
