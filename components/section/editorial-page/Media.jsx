import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Animate from "@/components/reusable/Animate";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Media = ({ data }) => {
  return (
    <section
      className={`my-10 md:my-20 px-[15px]  ${
        data.add_padding ? "md:px-10" : ""
      }`}
    >
      <Animate
        options={{ y: 0, image: true }}
        className="relative w-full overflow-hidden bg-bgColor aspect-video"
      >
        {!data.youtube_link && (
          <>
            {data.Media.data.attributes.mime.includes("image") && (
              <Image
                src={data.Media.data.attributes.url}
                alt={data.Media.data.attributes.alt}
                fill={true}
                style={{ objectFit: "cover" }}
                className="gsap-image"
                priority
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
          </>
        )}
        {data.youtube_link && (
          <>
            <ReactPlayer
              url={data.youtube_link}
              width="100%"
              height="100%"
              controls
              playsinline
              playing
              muted
              style={{ objectFit: "cover" }}
            />
          </>
        )}
      </Animate>
      <Animate options={{ alpha: true }} className="grid grid-cols-2 mt-5">
        <div></div>
        {data.Caption && <div className="b4 max-w-[350px]">{data.Caption}</div>}
      </Animate>
    </section>
  );
};

export default Media;
