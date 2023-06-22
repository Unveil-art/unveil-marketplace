import React, { useEffect } from "react";
import Image from "next/image";
import useSound from "use-sound";

const AboutItem = ({ detail_shots=[], owner }) => {
  const [play, { stop, isPlaying }] = useSound(
    detail_shots[0] && detail_shots[0].audio_url
      ? detail_shots[0].audio_url
      : ""
  );
  return (
    <div className="block w-full py-10 md:py-[90px] overflow-hidden">
      <div className="gsap-scroll flex flex-col md:flex-row flex-nowrap  px-[15px] md:px-10">
        {detail_shots.map((item, i) => (
          <div
            key={i}
            className="w-full md:w-auto md:min-w-[66%] md:max-w-[66%] flex-col md:flex-row flex gap-5 "
          >
            <div className="ml-[40px] md:ml-0 w-[230px] md:w-[160px] b3 md:b4 order-2 md:order-1">
              <p className="leading-[18px] b4">{item.caption}</p>
              {item.audio_url && (
                <>
                  <div className="flex items-center gap-2 mt-5 md:mt-10">
                    {owner.profileUrl && (
                      <div className="relative min-w-[40px] min-h-[40px] overflow-hidden rounded-full  bg-bgColor">
                        <Image
                          src={owner.profileUrl}
                          alt={owner.firstName + " " + owner.lastName}
                          fill={true}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}

                    <img
                      className="bg-bgColorHover w-[80px]"
                      src="/images/audio.gif"
                      alt="audio gif"
                    />
                  </div>

                  <p
                    className="mt-1 cursor-pointer underline-on-hover l2 w-fit"
                    onClick={play}
                  >
                    Play soundbite
                  </p>
                </>
              )}
            </div>
            <div className="w-full aspect-[4/3] bg-bgColor order-1 md:order-2 relative">
              <Image
                src={item.image_url}
                alt={item.caption}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutItem;
