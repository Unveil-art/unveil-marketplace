import React from "react";
import Image from "next/image";
import Animate from "@/components/reusable/Animate";

const TextImageTwo = ({ data }) => {
  return (
    <section className="relative grid grid-cols-1 mb-10 md:my-20 md:grid-cols-5">
      <Animate
        options={{ alpha: true }}
        className="order-2 md:col-span-2 md:order-1"
      >
        <p className="md:max-w-[350px] sticky top-[32px] h-fit mt-10 leading-[110%] px-[15px] ml-[100px] md:ml-[40px] s2 drop-cap">
          {data.Text}
        </p>
      </Animate>
      <div className="relative order-1 w-full overflow-hidden md:col-span-3 md:order-2">
        <Animate
          options={{ y: 0, image: true }}
          className="w-full sticky overflow-hidden top-0 h-fit bg-bgColor aspect-[10/11]"
        >
          {data.Image && (
            <Image
              src={data.Image.data.attributes.url}
              alt={data.Image.data.attributes.alt}
              fill={true}
              style={{ objectFit: "cover" }}
              className="gsap-image"
              priority
            />
          )}
        </Animate>

        {data.Caption && (
          <Animate
            options={{ alpha: true }}
            className="pt-[10px] hidden md:block h-100px"
          >
            <p className="b4">{data.Caption}</p>
          </Animate>
        )}
      </div>
    </section>
  );
};

export default TextImageTwo;
