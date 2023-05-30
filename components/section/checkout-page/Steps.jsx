import Check from "@/components/svg/Check";
import React from "react";

const Steps = ({ step, setStep }) => {
  return (
    <div className="flex gap-[5px] items-center">
      <p
        className={`
        ${
          step !== 1
            ? "py-[6px] px-[5px] md:py-[9px] md:px-[8px]"
            : "px-[8px] md:px-[10px]"
        }
        ${
          step === 2 || step === 3
            ? "bg-unveilDrakGray border-unveilDrakGray"
            : "border-unveilBlack"
        }
         px-[8px] md:px-[10px] border rounded-full b4 w-fit `}
      >
        {step === 1 && <>1</>}
        {step !== 1 && <Check />}
      </p>
      <div
        className={`${step === 1 ? "bg-unveilDrakGray" : "bg-unveilBlack"} ${
          step === 2 ? "bg-unveilBlack" : ""
        }  w-5 h-px`}
      ></div>
      <p
        className={` ${
          step === 3
            ? "py-[6px] px-[5px] md:py-[9px] md:px-[8px]"
            : "px-[7px] md:px-[10px]"
        } ${step === 1 ? "text-unveilDrakGray border-unveilDrakGray" : ""} ${
          step === 2 ? "text-unveilBlack border-unveilBlack" : ""
        } ${
          step === 3
            ? "bg-unveilDrakGray border-unveilDrakGray"
            : "border-unveilBlack"
        } px-[9px] border rounded-full b4 w-fit`}
      >
        {step === 3 && <Check />}
        {step !== 3 && <>2</>}
      </p>
      <div
        className={`${step === 1 ? "bg-unveilDrakGray" : "bg-unveilBlack"} ${
          step === 2 ? "bg-unveilDrakGray" : "bg-unveilBlack"
        } w-5 h-px bg-unveilBlack`}
      ></div>
      <p
        className={`${
          step === 1 ? "text-unveilDrakGray border-unveilDrakGray" : ""
        } ${
          step === 2 ? "text-unveilDrakGray border-unveilDrakGray" : ""
        } px-[7px] md:px-[8px] border rounded-full b4 w-fit border-unveilBlack`}
      >
        3
      </p>
    </div>
  );
};

export default Steps;
