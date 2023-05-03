import { useRef } from "react";
import Image from "next/image";

import { useLineMaskingAnimation } from "@/hooks/animations/useLineMaskingAnimation";
import Animate from "@/components/reusable/Animate";
import Link from "next/link";

const TwoArticles = ({ data }) => {
  const el = useRef();

  useLineMaskingAnimation(el);

  return (
    <section
      ref={el}
      className="py-[120px] border-b border-b-unveilDrakGray mb-10 px-[15px] md:px-10"
    >
      <h2 className="s2 mb-[15px]">Continue reading</h2>
      <div className="gsap-line border-t-[3px] border-t-unveilBlack"></div>

      <div className="grid grid-cols-2 gap-[15px] md:gap-10 pt-5">
        {data.map((item, i) => (
          <Animate
            key={i}
            options={{ image: true, alpha: true }}
            className="grid-cols-2 gap-5 md:grid"
          >
            <Link href={`/editorial/${item.attributes.slug}`}>
              <div
                data-cursor={item.attributes.cursor_text}
                data-cursor-color={item.attributes.cursor_color}
                className={`${
                  i === 1 ? "rounded-t-full" : ""
                } bg-bgColor relative overflow-hidden aspect-[3/4] w-full`}
              >
                {item.attributes.Image && (
                  <Image
                    src={item.attributes.Image.data.attributes.url}
                    alt={item.attributes.Image.data.attributes.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
            </Link>
            <div className="flex flex-col justify-end">
              <Link href={`/editorial/${item.attributes.slug}`}>
                <p className="mt-2 l2">{item.attributes.Title}</p>
              </Link>
              <p className="mt-1 b3 opacity-60">
                {item.attributes.Description}
              </p>
            </div>
          </Animate>
        ))}
      </div>
    </section>
  );
};

export default TwoArticles;
