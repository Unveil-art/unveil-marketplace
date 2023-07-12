import React from "react";

const Loader = ({ color = "#141414", size=15 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0.5V5H7V0.5H8ZM5.14645 5.85355L2.14645 2.85355L2.85355 2.14645L5.85355 5.14645L5.14645 5.85355ZM9.14645 5.14645L12.1464 2.14645L12.8536 2.85355L9.85355 5.85355L9.14645 5.14645ZM10.0006 6.99484L14.5006 7.00065L14.4994 8.00064L9.99936 7.99484L10.0006 6.99484ZM0.5 6.99548H5V7.99548H0.5V6.99548ZM5.85355 9.85355L2.85355 12.8536L2.14645 12.1464L5.14645 9.14645L5.85355 9.85355ZM12.1464 12.8536L9.14645 9.85355L9.85355 9.14645L12.8536 12.1464L12.1464 12.8536ZM8 10V14.5H7V10H8Z"
        fill={color}
      />
    </svg>
  );
};

export default Loader;
