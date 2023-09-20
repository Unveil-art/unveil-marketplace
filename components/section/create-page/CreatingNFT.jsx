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
    <section className="fixed top-0 left-0 z-30 w-full h-screen bg-unveilWhite pt-[120px] pb-[90px] flex flex-col">
      <Title title={`NFT is being created${returnDots(counter % 4)} `} />
      <p className="b3 ml-[40px] md:ml-[35vw] md:pr-[40px] mt-auto">
        <span className="font-medium">Do not refresh.</span> Sign the
        transaction in Metamask to create NFT may be requested
      </p>
    </section>
  );
};

export default CreatingNFT;
