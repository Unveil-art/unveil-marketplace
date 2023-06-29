import React, { useState } from "react";
import Image from "next/image";

const AboutItem = ({ detail_shots = [], owner }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  const playSound = () => {
    const audio = new Audio(detail_shots[0].audio_url);

    audio.onplaying = () => {
      setIsPlaying(true);
    };

    audio.onended = () => {
      setIsPlaying(false);
    };

    setAudio(audio);
    audio.play();
  };

  const stopSound = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Optional: Reset the playhead to the start
      setIsPlaying(false);
    }
  };

  return (
    <div className="block w-full py-10 md:py-[90px] overflow-hidden">
      <div className="gsap-scroll w-full md:w-max md:min-w-max md:max-w-max flex flex-col md:flex-row flex-nowrap gap-10 px-[15px] md:px-10">
        {detail_shots.map((item, i) => (
          <div
            key={i}
            className="w-full md:w-[66vw] flex-col md:flex-row flex gap-5 "
          >
            <div className="ml-[40px] md:ml-0 w-[230px] md:w-[160px] b3 md:b4 order-2 md:order-1">
              <p className="leading-[18px] b4 break-words">{item.caption}</p>
              {item.audio_url && (
                <>
                  <div className="flex items-center gap-2 mt-5 md:mt-10">
                    {owner.profileUrl && (
                      <div className="relative min-w-[40px] min-h-[40px] overflow-hidden rounded-full">
                        <Image
                          src={owner.profileUrl}
                          alt={owner.firstName + " " + owner.lastName}
                          fill={true}
                          style={{ objectFit: "cover" }}
                          priority
                        />
                      </div>
                    )}

                    <img
                      className=" w-[80px]"
                      src="/images/sound.gif"
                      alt="audio gif"
                    />
                  </div>

                  <p
                    className="mt-1 cursor-pointer underline-on-hover l2 w-fit"
                    onClick={() => {
                      if (detail_shots[0] && detail_shots[0].audio_url) {
                        if (isPlaying) {
                          stopSound();
                        } else {
                          playSound();
                        }
                      }
                    }}
                  >
                    {isPlaying ? "Stop soundbite" : " Play soundbite"}
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
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutItem;
