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
          className={`${
            alignLeft ? "ml-[15px] md:ml-10" : "ml-10 md:ml-[35svw]"
          } s2  pt-[100px] pb-[40px] md:pt-[180px] md:pb-[70px]`}
          style={{ color: color }}
        >
          {text}{" "}
          {link && (
            <Link href={href} className="">
              <span
                style={{ color: color }}
                className="md:underline underline-offset-[5px] decoration-1 cursor-pointer"
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
