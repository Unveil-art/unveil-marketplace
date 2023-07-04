import { forwardRef, useRef } from "react";
import { useLineMaskingAnimation } from "../../hooks/animations/useLineMaskingAnimation";

const Title = (
  {
    title = "Title",
    color = "#141414",
    account,
    link = false,
    truncate = false,
  },
  ref
) => {
  const el = useRef();

  useLineMaskingAnimation(el);

  return (
    <div
      ref={el}
      className="ml-[40px] md:ml-[35svw] md:pr-[40px] overflow-hidden"
    >
      <div
        style={{ backgroundColor: color }}
        className={`gsap-line h-[3px] md:h-[5px] mb-3 md:mb-5 md:mr-0 mr-[15px]`}
      ></div>
      <div className="flex items-end gap-2 fle-wrap">
        {link && (
          <h2
            data-cursor="Read more"
            data-cursor-color="#B2B4AE"
            className={`pb-2 gsap-transform h1 truncate `}
          >
            {title}
          </h2>
        )}
        {!link && (
          <h2
            className={`pb-2 gsap-transform h1 ${truncate ? "truncate" : ""}`}
          >
            {title}
          </h2>
        )}
        {account === "artist" && (
          <span className="artist mt-[20px] md:mt-[70px] tracking-[0.2em]">
            Artist
          </span>
        )}
        {account === "collector" && (
          <span className="mt-[20px] md:mt-[70px] collector tracking-[0.2em]">
            Collector
          </span>
        )}
        {account === "curator" && (
          <span className="curator mt-[20px] md:mt-[70px] tracking-[0.2em]">
            Curator
          </span>
        )}
      </div>
    </div>
  );
};

export default forwardRef(Title);
