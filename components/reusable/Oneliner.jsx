import React, { useState } from "react";
import Link from "next/link";

import MoreInfoPopIn from "../pop-in/MoreInfoPopIn";
import MoreInfo from "../../components/svg/MoreInfo";

const OneLiner = ({
  text,
  link,
  href,
  color = "#141414",
  alignLeft = false,
  info = false,
  gallery = false,
}) => {
  const [infoOpen, setInfoOpen] = useState(false);

  const handleOpen = () => {
    setInfoOpen(!infoOpen);
  };

  return (
    <div className="">
      <div className={`flex ${alignLeft ? "" : ""}`}>
        <div
          className={`${
            alignLeft ? "ml-[15px] md:ml-10" : "ml-10 md:ml-[35svw]"
          } ${
            gallery ? "pb-5 md:pb-10" : "pb-[40px] md:pb-[70px]"
          } s2 pt-[80px]  md:pt-[180px] `}
          style={{ color: color }}
        >
          <p className="pr-[15px]">
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
            {info && (
              <span
                onClick={() => handleOpen()}
                className="inline cursor-help w-fit"
              >
                <MoreInfo />
              </span>
            )}
          </p>
          {info && (
            <MoreInfoPopIn infoOpen={infoOpen} setInfoOpen={setInfoOpen} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OneLiner;
