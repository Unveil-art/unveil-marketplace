import React from "react";
import Image from "next/image";

const ArtistAnnouncement = ({ data }) => {
  const random = Math.floor(Math.random() * 45);

  return (
    <section className="pt-10 md:pt-[100px] my-5 md:my-10 pb-5 md:pb-[200px] mx-[15px] md:mx-10 border-t border-b border-unveilDrakGray">
      <div
        data-cursor={data.cursor_text ? data.cursor_text : data.title}
        data-cursor-color={data.cursor_color}
        style={{ transform: `translateX(${random}vw)` }}
        className="w-full translate0 md:w-[400px] lg:w-[450px] xl:w-[45%] bg-unveilGreen "
      >
        <div className="w-full aspect-[7/8] pr-5">
          <div className="relative w-full h-full bg-unveilCreme">
            <Image
              src={data.media.data.attributes.url}
              alt={data.media.data.attributes.alt}
              fill={true}
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
        <p className="pt-10 mb-2 text-center l2">{data.title}</p>
        <h3 className="text-center h4 pb-[54px] md:pb-[60px] px-5">
          {data.description}
        </h3>
      </div>
    </section>
  );
};

export default ArtistAnnouncement;
