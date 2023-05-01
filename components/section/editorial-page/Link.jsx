import { useRef } from "react";
import { useLineMaskingAnimation } from "@/hooks/animations/useLineMaskingAnimation";

import Image from "next/image";
import Arrow from "@/components/svg/Arrow";

const Link = ({ data }) => {
  const el = useRef();

  useLineMaskingAnimation(el);

  return (
    <section
      ref={el}
      className="md:flex my-10 overflow-hidden md:my-20 border-t-[3px] border-b mx-[15px] md:mx-10 border-b-unveilDrakGray py-10 border-t-unveilBlack justify-between items-center"
    >
      <div class="gsap-line border-t-unveilBlack border-t-[3px]"></div>
      <div className="flex items-center gap-5 gsap-transform">
        <div className="flex items-center gap-5">
          <div className="min-w-[80px] min-h-[80px] overflow-hidden max-w-[80px] max-h-[80px] md:min-w-[100px] md:min-h-[100px] md:max-w-[100px] md:max-h-[100px] bg-bgColor relative rounded-full">
            <Image
              src={data.Image.data[0].attributes.url}
              alt={data.Image.data[0].attributes.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <h2 className="s1">{data.Title}</h2>
            {data.Link && (
              <div className="flex  items-center gap-5 mt-[15px] md:hidden">
                <Arrow />
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={data.Link_url}
                  className="l2 underline-on-hover"
                >
                  {data.Link}
                </a>
              </div>
            )}
          </div>
        </div>

        {data.Link && (
          <div className="items-center hidden gap-5 gsap-transform md:flex">
            <Arrow />
            <a
              target="_blank"
              rel="noreferrer"
              href={data.Link_url}
              className="l2"
            >
              {data.Link}
            </a>
          </div>
        )}
      </div>
      <div class="gsap-line border-b border-b-unveilDrakGray"></div>
    </section>
  );
};

export default Link;
