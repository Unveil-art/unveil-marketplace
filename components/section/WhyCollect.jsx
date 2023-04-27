import React from "react";
import Image from "next/image";

import Animate from "../reusable/Animate";
import OneLiner from "../reusable/Oneliner";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import MoreInfo from "../svg/MoreInfo";

const WhyCollect = ({ data }) => {
  return (
    <section>
      <h2 className="m-[15px] lg:m-10 h3">{data.heading}</h2>
      <OneLiner text={data.description} alignLeft />

      <div className="flex lg:grid grid-cols-3 lg:mx-[15px] gap-[15px] lg:gap-10 overflow-auto">
        <Animate
          options={{ alpha: true }}
          className="ml-[15px] lg:ml-0 h-[315px] lg:h-auto min-w-[270px] max-w-[270px] lg:max-w-[unset] lg:min-w-[unset] lg:aspect-[10/11] bg-unveilBlack rounded-[10px] text-center pt-10 px-[15px] relative overflow-hidden"
        >
          <h4 className="s1 text-unveilWhite">
            {data.blocks[0].banner_heading}
          </h4>
          <p className="mt-2 text-unveilWhite b4">
            {data.blocks[0].banner_description} <MoreInfo />
          </p>
          <div className="absolute bottom-0 left-0 w-[40%] h-1/2 ">
            <div className="relative w-full h-full">
              <Image
                src={data.blocks[0].background_image.data.attributes.url}
                alt={data.blocks[0].background_image.data.attributes.url}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 w-1/2 h-[65%] ">
            <div className="relative w-full h-full">
              <Image
                src={data.blocks[0].main_image.data[0].attributes.url}
                alt={data.blocks[0].main_image.data[0].attributes.url}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-[40%] h-1/2 ">
            <div className="relative w-full h-full">
              <Image
                src={data.blocks[0].background_image.data.attributes.url}
                alt={data.blocks[0].background_image.data.attributes.url}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </Animate>
        <Animate
          options={{ alpha: true }}
          className="h-[315px] lg:h-auto min-w-[270px] max-w-[270px] lg:max-w-[unset] lg:min-w-[unset] lg:aspect-[10/11] bg-unveilYellow rounded-[10px] text-center pt-10 "
        >
          <h4 className="s1  px-[15px]"> {data.blocks[1].banner_heading}</h4>
          <p className="b4 mt-2 px-[15px]">
            {data.blocks[1].banner_description} <MoreInfo />
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
                spaceBetween: 20,
              },
            }}
            speed={500}
            loop={true}
            modules={[Autoplay]}
            grabCursor
            slidesPerView={"auto"}
            centeredSlides
            className=" mt-[20px] lg:mt-[60px] xl:mt-[100px] pointer-events-none payment-swiper unveilTransition lg:pointer-events-auto"
          >
            {data.blocks[1].main_image.data.map((item, index) => (
              <SwiperSlide
                key={index}
                className="!w-[140px] !h-[140px] unveilTransition border border-[rgba(0,0,0,0.15)] rounded-[10px] !flex justify-center items-center"
              >
                <div>
                  <img src={item.attributes.url} alt={item.attributes.alt} />
                </div>
              </SwiperSlide>
            ))}
            {data.blocks[1].main_image.data.map((item, index) => (
              <SwiperSlide
                key={index}
                className="!w-[140px] !h-[140px] unveilTransition border border-[rgba(0,0,0,0.15)] rounded-[10px] !flex justify-center items-center"
              >
                <div>
                  <img src={item.attributes.url} alt={item.attributes.alt} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Animate>
        <Animate
          options={{ alpha: true }}
          className="h-[315px] relative  overflow-hidden mr-[15px] lg:mr-0 lg:h-auto min-w-[270px] max-w-[270px] lg:max-w-[unset] lg:min-w-[unset] lg:aspect-[10/11]  rounded-[10px] text-center pt-10 px-[15px]"
        >
          <h4 className="s1">{data.blocks[2].banner_heading}</h4>
          <p className="mt-2 b4">
            {data.blocks[2].banner_description} <MoreInfo />
          </p>
          <div className="absolute top-0 left-0 w-full h-full -z-10">
            <div className="relative w-full h-full">
              <Image
                src={data.blocks[2].background_image.data.attributes.url}
                alt={data.blocks[2].background_image.data.attributes.url}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="absolute w-24 aspect-[3/4] -translate-x-1/2 -translate-y-1/2 shadow top-1/2 left-1/2 -z-10">
            <div className="relative w-full h-full">
              <Image
                src={data.blocks[0].main_image.data[0].attributes.url}
                alt={data.blocks[0].main_image.data[0].attributes.url}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </Animate>
      </div>
    </section>
  );
};

export default WhyCollect;
