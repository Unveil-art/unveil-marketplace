import React from "react";
import { useRouter } from "next/router";

const Close = () => {
  const router = useRouter();

  return (
    <div className="fixed -translate-x-1/2 w-fit bottom-10 left-1/2 ">
      <div
        onClick={() => router.back()}
        className="px-10 py-2 rounded-full cursor-pointer w-fit bg-unveilWhite unveilTransition hover:bg-bgColor"
      >
        <p className="uppercase w-fit l1">Close</p>
      </div>
    </div>
  );
};

export default Close;
