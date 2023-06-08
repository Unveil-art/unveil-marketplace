import React from "react";
import Image from "next/image";

const Chat = ({ title, text, chatBtn = false }) => {
  return (
    <div className="rounded-[10px] relative hover:border-unveilBlack col-span-2 md:col-span-1 flex overflow-hidden bg-bgColor text-left w-full cursor-pointer">
      <div className="h-[57px] relative md:h-[68px] bg-unveilGreen aspect-square">
        <Image
          src="/images/Nick_Fancher.png"
          alt="Nick Fancher"
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="md:py-[8px] px-[12px] flex flex-col justify-center py-[6px] md:px-[16px] ">
        <p className="font-[500] text-[11px] md:leading-normal b4">{title}</p>
        <p className="truncate leading-3-tight md:leading-normal b5">{text}</p>
      </div>
      {chatBtn && (
        <div className="absolute md:hidden top-1/2 -translate-y-1/2 right-[15px] flex items-center gap-1">
          <div className="w-[10px] relative h-[10px] bg-red-200">
            <div className="w-full h-full bg-green-600 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-green-600 rounded-full animate-ping"></div>
          </div>
          <p className="underline b3">Chat</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
