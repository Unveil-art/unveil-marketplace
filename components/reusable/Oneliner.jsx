import React from "react";
import Link from "next/link";

const OneLiner = ({
  text,
  link,
  href,
  color = "#141414",
  alignLeft = false,
}) => {
  return (
    <div className="">
      <div className={`${alignLeft ? "" : ""}`}>
        <p
          className="s2 ml-[40px] md:ml-[35svw] pt-[100px] pb-[40px] md:pt-[180px] md:pb-[70px]"
          style={{ color: color }}
        >
          {text}{" "}
          {link && (
            <Link href={href} className="">
              <span
                style={{ color: color }}
                className="md:underline underline-offset-[5px] cursor-pointer"
              >
                {link}
              </span>
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default OneLiner;
