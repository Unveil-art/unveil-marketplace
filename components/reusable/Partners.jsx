import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

const Partners = ({ data }) => {
  return (
    <Swiper
      allowTouchMove={false}
      spaceBetween={15}
      slidesOffsetBefore={15}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        768: {
          allowTouchMove: true,
          spaceBetween: 20,
        },
      }}
      speed={500}
      loop={true}
      modules={[Autoplay]}
      grabCursor
      slidesPerView={"auto"}
      className="swiper2 "
    >
      {data.block.banner.data.map((item, index) => (
        <SwiperSlide
          key={index}
          className="!w-[140px] !h-[140px] md:!w-[230px] md:!h-[230px] border border-[rgba(0,0,0,0.15)] rounded-[10px] md:rounded-[30px] !flex justify-center items-center"
        >
          <img
            className="object-contain w-1/2 h-1/2"
            src={item.attributes.url}
            alt={item.attributes.alt}
          />
        </SwiperSlide>
      ))}
      {data.block.banner.data.map((item, index) => (
        <SwiperSlide
          key={index}
          className="!w-[140px] !h-[140px] md:!w-[230px] md:!h-[230px] border border-[rgba(0,0,0,0.15)] rounded-[10px] md:rounded-[30px] !flex justify-center items-center"
        >
          <img
            className="object-contain w-1/2 h-1/2"
            src={item.attributes.url}
            alt={item.attributes.alt}
          />
        </SwiperSlide>
      ))}
      {data.block.banner.data.map((item, index) => (
        <SwiperSlide
          key={index}
          className="!w-[140px] !h-[140px] md:!w-[230px] md:!h-[230px] border border-[rgba(0,0,0,0.15)] rounded-[10px] md:rounded-[30px] !flex justify-center items-center"
        >
          <img
            className="object-contain w-1/2 h-1/2"
            src={item.attributes.url}
            alt={item.attributes.alt}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Partners;
