import { useRef } from "react";
import { useLineMaskingAnimation } from "@/hooks/animations/useLineMaskingAnimation";
import Animate from "@/components/reusable/Animate";

const AboutStats = ({
  bigLetters = false,
  title,
  h1,
  b1,
  h2,
  b2,
  h3,
  b3,
  h4,
  b4,
}) => {
  const el = useRef();

  useLineMaskingAnimation(el);

  return (
    <section ref={el} className="px-[15px] md:px-10 my-10 md:my-20 ">
      {title && (
        <Animate options={{ alpha: true }}>
          <h2 className="b1">{title}</h2>
        </Animate>
      )}
      <div className="gsap-line border-t-[3px] border-t-unveilBlack mt-5 md:mt-[60px]"></div>
      <div className="relative grid grid-cols-2 overflow-hidden md:gap-x-0 gap-x-5 md:grid-cols-4">
        <div className="gsap-transform md:mt-[10px]  [&:nth-child(2)]:border-b-unveilGreen [&:nth-child(2)]:border-b  [&:nth-child(1)]:border-r-unveilGreen  [&:nth-child(1)]:border-b-unveilGreen [&:nth-child(1)]:border-b py-[32px] text-center md:last:border-none md:border-b-unveilGreen md:border-b-transparent md:border-b-none md:border-r md:!border-b-0 border-r-unveilDrakGray  md:mr-5 ">
          <p className="md:pt-6 b3">{h1}</p>
          <h3 className={`${bigLetters ? "s1 mt-2" : " l2"}`}>{b1}</h3>
        </div>
        <div className="gsap-transform md:mt-[10px]  [&:nth-child(2)]:border-b-unveilGreen [&:nth-child(2)]:border-b  [&:nth-child(1)]:border-r-unveilGreen  [&:nth-child(1)]:border-b-unveilGreen [&:nth-child(1)]:border-b py-[32px] text-center md:last:border-none md:border-b-unveilGreen md:border-b-transparent md:border-b-none md:border-r md:!border-b-0 border-r-unveilDrakGray  md:mr-5 ">
          <p className="md:pt-6 b3">{h2}</p>
          <h3 className={`${bigLetters ? "s1 mt-2" : " l2"}`}>{b2}</h3>
        </div>
        <div className="gsap-transform md:mt-[10px]  [&:nth-child(2)]:border-b-unveilGreen [&:nth-child(2)]:border-b  [&:nth-child(1)]:border-r-unveilGreen  [&:nth-child(1)]:border-b-unveilGreen [&:nth-child(1)]:border-b py-[32px] text-center md:last:border-none md:border-b-unveilGreen md:border-b-transparent md:border-b-none md:border-r md:!border-b-0 border-r-unveilDrakGray  md:mr-5 ">
          <p className="md:pt-6 b3">{h3}</p>
          <h3 className={`${bigLetters ? "s1 mt-2" : " l2"}`}>{b3}</h3>
        </div>
        <div className="gsap-transform md:mt-[10px]  [&:nth-child(2)]:border-b-unveilGreen [&:nth-child(2)]:border-b  [&:nth-child(1)]:border-r-unveilGreen  [&:nth-child(1)]:border-b-unveilGreen [&:nth-child(1)]:border-b py-[32px] text-center md:last:border-none md:border-b-unveilGreen md:border-b-transparent md:border-b-none md:!border-b-0  md:mr-5 ">
          <p className="md:pt-6 b3">{h4}</p>
          <h3 className={`${bigLetters ? "s1 mt-2" : " l2"}`}>{b4}</h3>
        </div>
        <div className="absolute block md:hidden top-[15px] w-px h-[calc(100%-30px)] -translate-x-1/2 left-1/2 bg-unveilGreen"></div>
      </div>
    </section>
  );
};

export default AboutStats;
