import React from "react";
import Image from "next/image";

const Chat = ({ title, text }) => {
  return (
    <div className="rounded-[10px] hover:border-unveilBlack col-span-2 md:col-span-1 flex overflow-hidden bg-bgColor text-left w-full cursor-pointer">
      <div className="h-[57px] relative md:h-[68px] bg-unveilGreen aspect-square">
        <Image
          src="/images/Nick_Fancher.png"
          alt="Nick Fancher"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="md:pt-[8px] px-[12px] pt-[6px] md:px-[16px] ">
        <p className="font-bold b4">{title}</p>
        <p className="truncate b5">{text}</p>
      </div>
    </div>
  );
};

export default Chat;
