import React from "react";

const Steps = ({ step, setStep }) => {
  return (
    <div className="flex gap-[5px] items-center">
      <p className="px-[10px] border rounded-full b4 w-fit border-unveilBlack">
        1
      </p>
      <div
        className={`${
          step === 1 ? "bg-unveilDrakGray" : "bg-unveilBlack"
        } w-5 h-px`}
      ></div>
      <p
        className={`${
          step === 1 ? "text-unveilDrakGray border-unveilDrakGray" : ""
        } px-[9px] border rounded-full b4 w-fit`}
      >
        2
      </p>
      <div
        className={`${
          step === 1 ? "bg-unveilDrakGray" : "bg-unveilBlack"
        } w-5 h-px bg-unveilBlack`}
      ></div>
      <p
        className={`${
          step === 1 ? "text-unveilDrakGray border-unveilDrakGray" : ""
        } px-[8px] border rounded-full b4 w-fit border-unveilBlack`}
      >
        3
      </p>
    </div>
  );
};

export default Steps;
