import React, { useState } from "react";
import Image from "next/image";
import { Freshchat } from "reactjs-freshchat";
import "reactjs-freshchat/dist/index.css";

const Chat = ({ title, text, chatBtn = false, btnDesktop = false }) => {
  const [showSupport, setShowSupport] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowSupport((prev) => !prev)}
        className="rounded-[10px]  relative col-span-2 md:col-span-1 flex overflow-hidden unveilTransition hover:bg-bgColorHover bg-bgColor text-left w-full cursor-pointer"
      >
        <div className="h-[57px] relative md:h-[68px] bg-unveilGreen aspect-square">
          <Image
            src="/images/Nick_Fancher.png"
            alt="Nick Fancher"
            fill={true}
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="md:py-[8px] px-[12px] flex flex-col gap-1 justify-center py-[6px] md:px-[16px] ">
          <p className="font-[500] text-[13px] md:leading-normal b4">{title}</p>
          <p className="leading-tight truncate md:leading-normal b5">{text}</p>
        </div>
        {chatBtn && (
          <div
            className={`absolute ${
              !btnDesktop ? "md:hidden" : ""
            }  top-1/2 -translate-y-1/2 right-[15px] flex items-center gap-[6px]`}
          >
            <div className="w-[10px] relative h-[10px]">
              <div className="w-full h-full bg-green-600 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-green-600 rounded-full animate-ping"></div>
            </div>
            <p className="underline b3 text-[11px]">Chat</p>
          </div>
        )} 
      </div>
      {showSupport && (
        <Freshchat
          token="4e15aa79-e9f2-4795-b236-62a30db78e31"
          open={true}
          ic_styles={{
            backgroundColor: "#F9F7F2",
            color: "#000000",
          }}
        />
      )}
    </>
  );
};

export default Chat;
