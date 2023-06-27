import React from "react";
import Image from "next/image";

const UpcomingDrop = ({ data }) => {
  return (
    <section
      data-cursor={data.cursor_text}
      data-cursor-color={data.cursor_color}
      style={{
        backgroundColor: data.background_color,
        color: data.text_color,
      }}
      className="grid md:h-screen gird-cols-1 md:grid-cols-2"
    >
      <div className="relative w-full h-full md:aspect-auto aspect-square">
        <Image
          src={data.media.data.attributes.url}
          alt={data.media.data.attributes.alt}
          fill={true}
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className="flex flex-col justify-between p-10 pt-20 md:pt-10 pb-20 md:pb-[60px]">
        <p className="text-center md:text-left l2">{data.title}</p>
        <h3 className="md:text-left text-center h4 md:h3 mt-[15px]">
          {data.description}
        </h3>
      </div>
    </section>
  );
};

export default UpcomingDrop;
