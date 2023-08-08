import React from "react";

const Copy = ({ color = "#141414" }) => {
  return (
    <svg
      width="13"
      height="15"
      viewBox="0 0 13 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="7.52165"
        height="9.84042"
        rx="0.984042"
        stroke={color}
        stroke-width="0.984042"
      />
      <rect
        x="4.24805"
        y="4.15967"
        width="7.52165"
        height="9.84042"
        rx="0.984042"
        stroke={color}
        stroke-width="0.984042"
      />
    </svg>
  );
};

export default Copy;
