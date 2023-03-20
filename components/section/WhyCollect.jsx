import React from "react";
import OneLiner from "../reusable/Oneliner";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const WhyCollect = () => {
  return (
    <section>
      <h2 className="m-10 h3">Why collect art at Unveil?</h2>
      <OneLiner
        text="Invest in art that enriches your life and empowers the world."
        alignLeft
        link="Learn more"
        href="/"
      />

      <div className="flex md:grid grid-cols-3 md:mx-[15px] gap-10 overflow-auto">
        <div className="ml-[15px] h-[315px] md:h-auto min-w-[270px] max-w-[270px] md:max-w-[unset] md:min-w-[unset] md:aspect-square bg-unveilBlack rounded-[10px] text-center pt-10 px-[15px] relative overflow-hidden">
          <h4 className="s1 text-unveilWhite">Curated artworks</h4>
          <p className="text-unveilWhite b4">
            Our curation is a testament to quality and passion
          </p>
          <div className="absolute bottom-0 left-0 w-[40%] h-1/2 bg-unveilGreen"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[65%] bg-unveilGreen"></div>
          <div className="absolute bottom-0 right-0 w-[40%] h-1/2 bg-unveilGreen"></div>
        </div>
        <div className="h-[315px] md:h-auto min-w-[270px] max-w-[270px] md:max-w-[unset] md:min-w-[unset] md:aspect-square bg-unveilYellow rounded-[10px] text-center pt-10 ">
          <h4 className="s1 text-unveilWhite px-[15px]">Curated artworks</h4>
          <p className="text-unveilWhite b4 px-[15px]">
            Our curation is a testament to quality and passion
          </p>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={15}
            loop={true}
            centeredSlides
            className="mt-[90px] payment-swiper unveilTransition"
            grabCursor
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
        <div className="h-[315px] mr-[15px] md:h-auto min-w-[270px] max-w-[270px] md:max-w-[unset] md:min-w-[unset] md:aspect-square bg-unveilGreen rounded-[10px] text-center pt-10 px-[15px]">
          <h4 className="s1 text-unveilWhite">Curated artworks</h4>
          <p className="text-unveilWhite b4">
            Our curation is a testament to quality and passion
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyCollect;
