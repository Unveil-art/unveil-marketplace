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
        slidesPerView={"auto"}
        spaceBetween={40}
        loop={true}
        className="mb-[170px]"
      >
        {["1", "2", "3", "4", "5", "6", "1", "2", "3", "4", "5", "6"].map(
          (item, index) => (
            <SwiperSlide
              key={index}
              className="!w-[140px] !h-[140px] md:!w-[230px] md:!h-[230px] border border-[rgba(0,0,0,0.15)] rounded-[30px] !flex justify-center items-center"
            >
              <div>Logo</div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </section>
  );
};

export default TrustedPartners;
