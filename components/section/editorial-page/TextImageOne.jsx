import React from "react";
import Image from "next/image";
import Title from "@/components/reusable/Title";
import Animate from "@/components/reusable/Animate";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const TextImageOne = ({ data, title }) => {
  return (
    <section className="relative grid grid-cols-1 mb-10 md:my-20 md:grid-cols-5">
      <div className="w-full md:col-span-3 ">
        <Animate
          options={{ y: 0, image: true }}
          className="w-full sticky top-0 overflow-hidden h-fit bg-bgColor aspect-[10/11]"
        >
          {data.Image && (
            <Image
              src={data.Image.data.attributes.url}
              alt={data.Image.data.attributes.alt}
              fill={true}
              style={{ objectFit: "cover" }}
              className="gsap-image"
            />
          )}
        </Animate>
      </div>
      <Animate
        options={{ alpha: true }}
        className="relative justify-between md:flex md:col-span-2"
      >
        <div className="block mt-10 mb-20 md:hidden">
          <Title title={title} />
        </div>
        <p
          className={`md:max-w-[350px] sticky top-[32px] h-fit leading-[110%] px-[15px] ml-[100px] md:ml-10 2xl:ml-[60px] s2 drop-cap`}
        >
          {data.Text}
        </p>
      </Animate>
      {data.link && data.button_text && (
        <div className="block bg-unveilWhite border border-bgColorHover rounded-[10px] overflow-hidden z-30 fixed bottom-10 right-[15px] md:right-10 h-fit">
          <div className=" aspect-[3/4] w-[80px] h-[106px] md:w-[95px] md:h-[126px] shadow2 mt-[28px] mb-[20px] mx-[28px] md:mt-10 md:mb-[32px]md:mx-10  bg-bgColor">
            {data.media.data.attributes.mime.includes("image") && (
              <Image
                src={data.media.data.attributes.url}
                alt={data.media.data.attributes.alt}
                fill={true}
                style={{ objectFit: "cover" }}
                className="gsap-image"
              />
            )}
            {data.media.data.attributes.mime.includes("video") && (
              <ReactPlayer
                url={data.media.data.attributes.url}
                width="100%"
                height="100%"
                controls
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <a target="_blank" rel="noreferrer" href={data.link}>
            <div className="py-2  uppercase cursor-pointer text-center bg-unveilBlack text-unveilWhite text-[8px] md:text-[10px] l1 tracking-[0.15rem]">
              {data.button_text}
            </div>
          </a>
        </div>
      )}
    </section>
  );
};

export default TextImageOne;
