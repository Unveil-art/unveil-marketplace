import React from "react";

import OneLiner from "../reusable/Oneliner";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

const WhyCollect = () => {
  return (
    <section>
      <h2 className="m-[15px] lg:m-10 h3">Why collect art at Unveil?</h2>
      <OneLiner
        text="Invest in art that enriches your life and empowers the world."
        alignLeft
        link="Learn more"
        href="/"
      />

      <div className="flex lg:grid grid-cols-3 lg:mx-[15px] gap-[15px] lg:gap-10 overflow-auto">
        <div className="ml-[15px] lg:ml-0 h-[315px] lg:h-auto min-w-[270px] max-w-[270px] lg:max-w-[unset] lg:min-w-[unset] lg:aspect-square bg-unveilBlack rounded-[10px] text-center pt-10 px-[15px] relative overflow-hidden">
          <h4 className="s1 text-unveilWhite">Curated artworks</h4>
          <p className="text-unveilWhite b4">
            Our curation is a testament to quality and passion
          </p>
          <div className="absolute bottom-0 left-0 w-[40%] h-1/2 bg-unveilGreen"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[65%] bg-unveilGreen"></div>
          <div className="absolute bottom-0 right-0 w-[40%] h-1/2 bg-unveilGreen"></div>
        </div>
        <div className="h-[315px] lg:h-auto min-w-[270px] max-w-[270px] lg:max-w-[unset] lg:min-w-[unset] lg:aspect-square bg-unveilYellow rounded-[10px] text-center pt-10 ">
          <h4 className="s1  px-[15px]">Curated artworks</h4>
          <p className="b4 px-[15px]">
            Our curation is a testament to quality and passion
          </p>
          <Swiper
            allowTouchMove={false}
            spaceBetween={15}
            slidesOffsetBefore={15}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                allowTouchMove: true,
                spaceBetween: 28,
              },
            }}
            speed={500}
            modules={[Autoplay]}
            grabCursor
            slidesPerView={"auto"}
            centeredSlides
            className=" mt-[20px] lg:mt-[60px] xl:mt-[100px] pointer-events-none payment-swiper unveilTransition lg:pointer-events-auto"
          >
            {["1", "2", "3", "4", "5", "6", "1", "2", "3", "4", "5", "6"].map(
              (item, index) => (
                <SwiperSlide
                  key={index}
                  className="!w-[140px] !h-[140px] unveilTransition border border-[rgba(0,0,0,0.15)] rounded-[10px] !flex justify-center items-center"
                >
                  <div>Payment</div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
        <div className="h-[315px] mr-[15px] lg:mr-0 lg:h-auto min-w-[270px] max-w-[270px] lg:max-w-[unset] lg:min-w-[unset] lg:aspect-square bg-unveilGreen rounded-[10px] text-center pt-10 px-[15px]">
          <h4 className="s1 ">Curated artworks</h4>
          <p className="b4">
            Our curation is a testament to quality and passion
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyCollect;
