import React from "react";

const Currency = ({ color = "#141414" }) => {
  return (
    <svg
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.84231 3.17713C6.67626 3.07564 6.46039 3.07564 6.27775 3.17713L4.98252 3.95514L4.10245 4.46255L2.80724 5.24054C2.64119 5.34201 2.42532 5.34201 2.24267 5.24054L1.21314 4.63168C1.04709 4.53021 0.930853 4.34415 0.930853 4.14121V2.94034C0.930853 2.73738 1.03049 2.55133 1.21314 2.44986L2.22606 1.85789C2.39211 1.75641 2.60798 1.75641 2.79063 1.85789L3.80356 2.44986C3.96957 2.55133 4.08587 2.73738 4.08587 2.94034V3.71834L4.96594 3.19404V2.41602C4.96594 2.21307 4.8663 2.02702 4.6836 1.92554L2.80724 0.809259C2.64119 0.707786 2.42532 0.707786 2.24267 0.809259L0.333066 1.92554C0.150411 2.02702 0.0507812 2.21307 0.0507812 2.41602V4.66548C0.0507812 4.86841 0.150411 5.05448 0.333066 5.15601L2.24267 6.27228C2.40872 6.37374 2.62458 6.37374 2.80724 6.27228L4.10245 5.51114L4.98252 4.98688L6.27775 4.22575C6.4438 4.12428 6.65967 4.12428 6.84231 4.22575L7.8552 4.81775C8.02125 4.91921 8.13747 5.10521 8.13747 5.30821V6.50908C8.13747 6.71201 8.03783 6.89807 7.8552 6.99954L6.84231 7.60841C6.67626 7.70987 6.46039 7.70987 6.27775 7.60841L5.2648 7.01641C5.09875 6.91501 4.98252 6.72894 4.98252 6.52594V5.74794L4.10245 6.27228V7.05027C4.10245 7.25321 4.2021 7.43927 4.38473 7.54074L6.29434 8.657C6.46039 8.75854 6.67626 8.75854 6.8589 8.657L8.7685 7.54074C8.93455 7.43927 9.05078 7.25321 9.05078 7.05027V4.80081C9.05078 4.59788 8.95114 4.41181 8.7685 4.31035L6.84231 3.17713Z"
        fill={color}
      />
    </svg>
  );
};

export default Currency;
