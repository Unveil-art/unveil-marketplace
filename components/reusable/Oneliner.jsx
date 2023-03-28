import React from "react";
import Link from "next/link";
import Animate from "@/components/reusable/animate";

const OneLiner = ({
  text,
  link,
  href,
  color = "#141414",
  alignLeft = false,
}) => {
  return (
    <Animate>
      <div className={`${alignLeft ? "" : ""}`}>
        <p
          className={`${
            alignLeft ? "ml-[15px] md:ml-10" : "ml-10 md:ml-[35svw]"
          } s2  pt-[100px] pb-[40px] md:pt-[180px] md:pb-[70px]`}
          style={{ color: color }}
        >
          {text}{" "}
          {link && (
            <Link href={href} className="" data-cursor="😍😍😍" data-cursor-color="#F9F7F2">
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
    </Animate>
  );
};

export default OneLiner;
