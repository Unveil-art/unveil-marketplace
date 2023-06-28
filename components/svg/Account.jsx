import React from "react";

const Account = ({ color = "#141414", width = 26, height = 26 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      className="unveilTransition"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12.8712"
        cy="8.0265"
        r="6.40248"
        stroke={color}
        strokeWidth="3"
        className="unveilTransition"
      />
      <path
        d="M1.57812 24.485C4.28032 21.4836 8.33683 19.5752 12.872 19.5752C17.4072 19.5752 21.4637 21.4836 24.1659 24.485"
        stroke={color}
        className="unveilTransition"
        strokeWidth="3"
      />
    </svg>
  );
};

export default Account;
