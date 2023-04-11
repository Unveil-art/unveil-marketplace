import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";

import OneLiner from "../reusable/Oneliner";
import Title from "../reusable/Title";

const TrustedPartners = ({ data }) => {
  return (
    <section>
      <Title title={data.heading} />
      <OneLiner text={data.description} />
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={15}
        slidesOffsetBefore={15}
        loop={true}
        autoplay={{
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: {
            spaceBetween: 28,
          },
        }}
        speed={500}
        modules={[Autoplay]}
        className="mb-[60px] md:mb-[170px]"
        grabCursor
      >
        {data.block.banner.data.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!w-[140px] !h-[140px] md:!w-[230px] md:!h-[230px] border border-[rgba(0,0,0,0.15)] rounded-[10px] md:rounded-[30px] !flex justify-center items-center"
          >
            <div className="relative w-full h-1/2">
              <Image
                src={item.attributes.url}
                alt={item.attributes.alt}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </SwiperSlide>
        ))}
        {data.block.banner.data.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!w-[140px] !h-[140px] md:!w-[230px] md:!h-[230px] border border-[rgba(0,0,0,0.15)] rounded-[10px] md:rounded-[30px] !flex justify-center items-center"
          >
            <div className="relative w-full h-1/2">
              <Image
                src={item.attributes.url}
                alt={item.attributes.alt}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TrustedPartners;
