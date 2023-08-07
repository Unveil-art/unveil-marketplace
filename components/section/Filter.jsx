import React, { useState } from "react";
import { useRouter } from "next/router";
import Animate from "@/components/reusable/Animate";

const Filter = ({
  category,
  setCategory,
  artist,
  setArtist,
  medium,
  setMedium,
}) => {
  const router = useRouter();
  return (
    <Animate
      options={{ alpha: true, delay: 0.5 }}
      className="ml-10 md:ml-[35vw] flex gap-10 flex-wrap pr-10 pb-10 md:pb-[60px]"
    >
      <div className="flex items-center gap-2 md:block">
        <p className="md:mb-2 b3 md:b6">Category</p>
        <div className="flex items-center gap-1">
          <span
            onClick={() => setCategory(0)}
            className={`${
              category === 0
                ? "border-unveilBlack"
                : "border-bgColorHover hover:border-[rgba(0,0,0,0.3)]"
            } px-2 border tracking-[0.1em] rounded-full cursor-pointer unveilTransition md:px-4 l2`}
          >
            Artworks
          </span>
          <span
            onClick={() => setCategory(1)}
            className={`${
              category === 1
                ? "border-unveilBlack"
                : "border-bgColorHover hover:border-[rgba(0,0,0,0.3)]"
            } px-2 border tracking-[0.1em] rounded-full cursor-pointer unveilTransition md:px-4 l2 `}
          >
            Collections
          </span>
        </div>
      </div>
      {/* <div className="hidden md:block">
        <p className="md:mb-2 b3 md:b6">Artist</p>
        <div className="flex items-center gap-1">
          <span
            // onClick={() => setArtist(0)}
            //${
            //medium === 0
            //    ? "border-unveilBlack"
            //    : "border-bgColorHover hover:border-[rgba(0,0,0,0.3)]"}

            className={`opacity-60 px-4 border rounded-full unveilTransition cursor-not-allowed l2 `}
          >
            Established
          </span>
          <span
            // onClick={() => setArtist(1)}
            className={`opacity-60 px-4 border rounded-full unveilTransition cursor-not-allowed l2 `}
          >
            Talent
          </span>
        </div>
      </div> */}
      <div className="hidden md:block">
        <p className="md:mb-2 b3 md:b6">Medium</p>
        <div className="flex items-center gap-1">
          <span
            onClick={() => {
              // change route query to digital
              router.push(
                {
                  pathname: "/gallery",
                  query: { digital: "" },
                },
                undefined,
                { shallow: true }
              );
            }}
            className={`${
              category === 1
                ? "cursor-not-allowed opacity-60 border-opacity-0"
                : "cursor-pointer"
            } ${
              medium === 0
                ? "border-unveilBlack"
                : "border-bgColorHover hover:border-[rgba(0,0,0,0.3)]"
            } px-2 border tracking-[0.1em] rounded-full  unveilTransition md:px-4 l2 `}
          >
            Digital
          </span>
          <span
            onClick={() => {
              router.push(
                {
                  pathname: "/gallery",
                  query: { print: "" },
                },
                undefined,
                { shallow: true }
              );
            }}
            className={`${
              category === 1
                ? "cursor-not-allowed opacity-60 border-opacity-0"
                : "cursor-pointer"
            } ${
              medium === 1
                ? "border-unveilBlack"
                : "border-bgColorHover hover:border-[rgba(0,0,0,0.3)]"
            } px-2 border tracking-[0.1em] rounded-full  unveilTransition md:px-4 l2 `}
          >
            Print
          </span>
        </div>
      </div>
    </Animate>
  );
};

export default Filter;
