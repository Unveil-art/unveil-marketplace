import Title from "@/components/reusable/Title";
import React, { useEffect, useState } from "react";

const CreatingNFT = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => prev+1);
    },700);
    return () => {
      clearInterval(timer);
    }
  },[])
  const returnDots =(num) => {
    let dot = ".";
    for(let i=0;i<num;i++){
      dot+="."
    }
    return dot;
  }
  return (
    <section className="fixed top-0 left-0 z-30 w-full h-screen bg-unveilWhite pt-[120px]">
      <Title title={`NFT is being created${returnDots(counter%4)} `} />
    </section>
  );
};

export default CreatingNFT;
