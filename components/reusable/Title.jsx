import React from "react";

const Title = ({ title = "Title", color = "#141414" }) => {
  return (
    <div className="ml-[40px] md:ml-[35svw] md:pr-[40px]">
      <div
        style={{ backgroundColor: color }}
        className={`h-[3px] md:h-[5px] mb-3 md:mb-5 mr-[15px]`}
      ></div>
      <h2 className="h1">{title}</h2>
    </div>
  );
};

export default Title;
