import React, { useEffect, useState } from "react";
import useMouseDelay from "../../hooks/useMouseDelay";

const Cursor = () => {
  const mouseDelayPosition = useMouseDelay();

  return (
    <div
      className="absolute top-0 left-0"
      style={{
        top: mouseDelayPosition.y - 20,
        left: mouseDelayPosition.x + 20,
      }}
    >
      <h1 className="border border-unveilBlack rounded-[5px] l2 px-3 py-1">
        View artist
      </h1>
    </div>
  );
};

export default Cursor;
