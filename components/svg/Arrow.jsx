import React from "react";

const Arrow = ({ small = false }) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        small ? "fill-[#545454] scale-[0.7]" : "fill-unveilBlack"
      } `}
    >
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M17.6465 9.30725L0.174334 9.30725L0.174003 7.06951L17.6462 7.06951L17.6465 9.30725Z"
      />
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M12.3389 15.4542L10.8548 13.9684L16.5992 8.20788L10.7227 2.44736L12.3389 0.922603L19.5566 8.18841L12.3389 15.4542Z"
      />
    </svg>
  );
};

export default Arrow;
