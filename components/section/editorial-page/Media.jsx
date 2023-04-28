import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Media = ({ data }) => {
  return (
    <section className="my-10 md:my-20 px-[15px] md:px-10">
      <div className="relative w-full bg-bgColor aspect-video">
        {data.Media.data.attributes.mime.includes("image") && (
          <Image
            src={data.Media.data.attributes.url}
            alt={data.Media.data.attributes.alt}
            layout="fill"
            objectFit="cover"
          />
        )}
        {data.Media.data.attributes.mime.includes("video") && (
          <ReactPlayer
            url={data.Media.data.attributes.url}
            width="100%"
            height="100%"
            controls
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div className="grid grid-cols-2 mt-5">
        <div></div>
        {data.Caption && <div className="b4 max-w-[350px]">{data.Caption}</div>}
      </div>
    </section>
  );
};

export default Media;
