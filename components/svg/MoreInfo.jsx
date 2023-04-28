import React from "react";

const MoreInfo = ({ color = "#141414" }) => {
  return (
    <svg
      className="inline "
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8.12695" cy="8.17749" r="7.82227" fill="transparent" />
      <circle
        cx="8.12695"
        cy="8.17749"
        r="7.32227"
        stroke={color}
        strokeOpacity="0.2"
      />
      <path
        d="M7.657 12.1775H8.653V5.90149H7.657V12.1775ZM8.137 4.59349C8.497 4.59349 8.797 4.29349 8.797 3.93349C8.797 3.57349 8.497 3.27349 8.137 3.27349C7.777 3.27349 7.477 3.57349 7.477 3.93349C7.477 4.29349 7.777 4.59349 8.137 4.59349Z"
        fill={color}
      />
    </svg>
  );
};

export default MoreInfo;
