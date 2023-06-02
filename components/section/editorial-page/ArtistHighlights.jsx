import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import Play from "../../svg/Play";

const ArtistHighlights = ({ data }) => {
  return (
    <section className="mt-10 ">
      <div className="h-px w-[calc(100%-30px)] md:w-[calc(100%-80px)] mx-[15px] md:mx-10 bg-unveilDrakGray"></div>
      <div className="px-[15px] mb-5 md:mb-[100px] pt-5 md:px-10 md:flex justify-between">
        <h2 className="h3">{data.title}</h2>
        <p className="b3 md:s2 max-w-[200px] md:mt-0 mt-[100px] md:mr-20">
          {data.description}
        </p>
      </div>
      <Swiper
        spaceBetween={15}
        slidesOffsetBefore={15}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: {
            spaceBetween: 20,
          },
        }}
        speed={500}
        loop={true}
        modules={[Autoplay]}
        grabCursor
        slidesPerView={"auto"}
        className="swiper4"
      >
        {data.block.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!w-[164px] !h-[240px] md:!w-[340px] md:!h-[480px] relative bg-unveilGreen !flex justify-center items-center"
          >
            <div className="z-20">
              <Play />
            </div>
            <Image
              src={item.media.data.attributes.url}
              alt={item.media.data.attributes.alt}
              fill={true}
              style={{ objectFit: "cover" }}
            />
            <h4 className="absolute text-unveilWhite bottom-5 left-5 s2">
              {item.text}
            </h4>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ArtistHighlights;
