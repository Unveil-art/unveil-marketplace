import React from "react";

const Logo = ({ color = "#141414" }) => {
  return (
    <svg
      viewBox="0 0 179 38"
      className="unveilTransition"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M116.318 32.184a3.17 3.17 0 012.25-.937h16.378v4.923h-22.584l3.956-3.986zM69.894 1.577L88.273 38l18.379-36.423h-6.617L88.273 25.726 76.51 1.576h-6.616zM111.409 1.577h-.327v34.217h.029l3.942-3.612a4.306 4.306 0 001.395-3.255l-.062-3.201V20.39h15.209v-4.925h-15.209v-4.252l.058-2.74a4.532 4.532 0 00-1.374-3.346l-3.661-3.551zM141.601 1.252v34.963h5.305V1.252h-5.305zM157.118 1.577v34.217h-.029l3.896-3.57a4.53 4.53 0 001.469-3.36l-.032-6.83V1.576h-5.304z"
        fill={color}
      />
      <path
        className="unveilTransition"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.194 1H0v19.314c0 8.645 7.008 15.653 15.653 15.653s15.653-7.008 15.653-15.653V1h-5.88v29.315H6.193V1zM62.404 35.951h6.363V16.637c0-8.645-7.008-15.653-15.653-15.653S37.46 7.992 37.46 16.637v19.314h6.033V5.664h18.91V35.95z"
        fill={color}
      />
      <path
        className="unveilTransition"
        d="M116.622 5.262a3.17 3.17 0 002.25.937h16.361V1.281h-22.562l3.951 3.981zM163.358 32.184a3.17 3.17 0 012.25-.937H179v4.923h-19.598l3.956-3.986z"
        fill={color}
      />
    </svg>
  );
};

export default Logo;
