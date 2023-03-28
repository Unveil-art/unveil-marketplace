import React, { useState } from "react";
import Link from "next/link";
import Animate from "@/components/reusable/animate";

import MoreInfoPopIn from "../../components/section/MoreInfoPopIn";
import MoreInfo from "../../components/svg/MoreInfo";

const OneLiner = ({
  text,
  link,
  href,
  color = "#141414",
  alignLeft = false,
  info = false,
}) => {
  const [infoOpen, setInfoOpen] = useState(false);

  const handleOpen = () => {
    setInfoOpen(!infoOpen);
  };

  return (
    <div className="">
      <Animate className={`flex ${alignLeft ? "" : ""}`}>
        <div
          className={`${
            alignLeft ? "ml-[15px] md:ml-10" : "ml-10 md:ml-[35svw]"
          } s2  pt-[100px] pb-[40px] md:pt-[180px] md:pb-[70px]`}
          style={{ color: color }}
        >
          <p>
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
      </Animate>
    </div>
  );
};

export default OneLiner;
