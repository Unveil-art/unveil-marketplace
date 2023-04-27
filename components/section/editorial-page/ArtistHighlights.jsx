import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import Play from "../../svg/Play";

const ArtistHighlights = () => {
  return (
    <section className="mt-10 ">
      <div className="h-px w-[calc(100%-30px)] md:w-[calc(100%-80px)] mx-[15px] md:mx-10 bg-unveilDrakGray"></div>
      <div className="px-[15px] mb-5 md:mb-[100px] pt-5 md:px-10 md:flex justify-between">
        <h2 className="h3">Artist highlights</h2>
        <p className="b3 md:s2 max-w-[200px] md:mt-0 mt-[100px] md:mr-20">
          Become a patreon and get early access to limited edition launches
        </p>
      </div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={15}
        slidesOffsetBefore={15}
        autoplay={{
          disableOnInteraction: false,
        }}
        speed={500}
        modules={[Autoplay]}
        grabCursor
        loop
      >
        {[1, 1, 1, 1, 1, 1, 1].map((item, index) => (
          <SwiperSlide
            key={index}
            className="!w-[164px] !h-[240px] md:!w-[340px] md:!h-[480px] relative bg-unveilGreen !flex justify-center items-center"
          >
            <Play />
            <h4 className="absolute text-unveilWhite bottom-5 left-5 s2">
              Paul Cupido
            </h4>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ArtistHighlights;
