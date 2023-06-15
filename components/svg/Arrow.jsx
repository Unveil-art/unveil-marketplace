import React from "react";

const Arrow = ({ small = false }) => {
  return (
    <div className="relative w-[20px] group h-[16px] unveilTransition hover:translate-x-[2px]">
      <svg
        width="20"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          small ? "fill-[#545454] scale-[0.7]" : "fill-unveilBlack"
        }  `}
      >
        <path
          fillRule="evenodd"
          clip-rule="evenodd"
          d="M12.3389 15.4542L10.8548 13.9684L16.5992 8.20788L10.7227 2.44736L12.3389 0.922603L19.5566 8.18841L12.3389 15.4542Z"
        />
      </svg>
      <div className="h-[2px] bg-unveilBlack  group-hover:w-[22px] w-[20px] absolute unveilTransition top-1/2 -translate-y-[45%] right-[2px]"></div>
    </div>
  );
};

export default Arrow;
