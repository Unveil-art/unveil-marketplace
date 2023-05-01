import React from "react";
import Image from "next/image";
import Title from "@/components/reusable/Title";
import Animate from "@/components/reusable/Animate";

const TextImageOne = ({ data, title }) => {
  return (
    <section className="relative grid grid-cols-1 mb-10 md:my-20 md:grid-cols-5">
      <div className="w-full md:col-span-3 ">
        <Animate
          options={{ y: 0, image: true }}
          className="w-full sticky top-0 overflow-hidden h-fit bg-bgColor aspect-[10/11]"
        >
          <Image
            src={data.Image.data.attributes.url}
            alt={data.Image.data.attributes.alt}
            layout="fill"
            objectFit="cover"
            className="gsap-image"
          />
          AD
        </Animate>
      </div>
      <Animate options={{ alpha: true }} className="md:col-span-2">
        <div className="block mt-10 mb-20 md:hidden">
          <Title title={title} />
        </div>
        <p className="md:max-w-[350px] sticky top-[32px] leading-[110%] px-[15px] ml-[100px] md:ml-[60px] s2 drop-cap">
          {data.Text}
        </p>
      </Animate>
    </section>
  );
};

export default TextImageOne;
