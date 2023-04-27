import React, { useState } from "react";
import Link from "next/link";
import Animate from "./Animate";

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
      <Animate className={`flex ${alignLeft ? "" : ""}`}>
        <div
          className={`${
            alignLeft ? "ml-[15px] md:ml-10" : "ml-10 md:ml-[35svw]"
          } ${
            gallery ? "pb-5 md:pb-10" : "pb-[40px] md:pb-[70px]"
          } s2 pt-[80px]  md:pt-[180px] `}
          style={{ color: color }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            className="pr-[15px]"
          ></div>
          {info && (
            <span
              onClick={() => handleOpen()}
              className="inline cursor-help w-fit"
            >
              <MoreInfo />
            </span>
          )}
          {info && (
            <MoreInfoPopIn
              open={infoOpen}
              setOpen={setInfoOpen}
              title="Established"
              subtitle="Artworks"
              text="Professionals who have gained recognition for their exceptional
            artistic vision and photographic skills, and have typically built
            a career around their ability to capture and communicate a unique
            perspective through their photography."
            />
          )}
        </div>
      </Animate>
    </div>
  );
};

export default OneLiner;
