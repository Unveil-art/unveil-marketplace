import React from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import OneLiner from "../reusable/Oneliner";
import Title from "../reusable/Title";

const TrustedPartners = () => {
  return (
    <section>
      <Title title="Trusted parners" />
      <OneLiner
        text="Artists worth viewing. Selected for ou by our curators."
        link="View collections"
        href="/"
      />
      <Swiper
        modules={[Autoplay]}
        slidesPerView={"auto"}
        spaceBetween={30}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={10000}
        ccsMode
        allowTouchMove={false}
        loop
      >
        {["1", "2", "3", "4", "5", "6", "1", "2", "3", "4", "5", "6"].map(
          (item, index) => (
            <SwiperSlide
              key={index}
              className="!w-[140px] !h-[140px] border border-[rgba(0,0,0,0.15)] rounded-[30px] flex justify-center items-center"
            >
              <div>Hellooo</div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </section>
  );
};

export default TrustedPartners;
