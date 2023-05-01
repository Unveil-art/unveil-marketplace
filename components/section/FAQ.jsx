import React, { useState, useRef, useEffect } from "react";
import Animate from "../reusable/Animate";

const FAQ = ({ data }) => {
  const [open, setOpen] = useState();
  const [heights, setHeight] = useState([]);

  const ref = useRef();

  const openHandler = (i) => {
    setOpen(i);
    if (i === open) {
      setOpen(null);
    }
  };

  useEffect(() => {
    data.map((item, i) => {
      setHeight((heights) => [
        ...heights,
        ref.current.children[i].children[1].scrollHeight,
      ]);
    });
  }, []);

  return (
    <section className="ml-10 md:ml-[35svw] mr-[15px] md:mr-10 mt-[120px] mb-[120px]">
      <Animate
        options={{ alpha: true }}
        className="flex items-end justify-between mb-6"
      >
        <h2 className="h3">FAQ</h2>
        <div className="">
          <p className="flex gap-1 b3">
            View all{" "}
            <span className="underline decoration-none md:no-underline underline-offset-2 decoration-1">
              questions.
            </span>
            <span className="hidden underline cursor-not-allowed md:block underline-offset-4 decoration-1">
              <span className="">Learn more</span>
            </span>
          </p>
        </div>
      </Animate>
      <Animate options={{ alpha: true }} className="block">
        <div ref={ref}>
          {data.map((item, i) => (
            <div
              key={i}
              className="border-t md:border-t-2 border-unveilBlack pt-[6px] mb-[6px]  md:pt-[15px] md:pb-[10px]"
            >
              <div
                className="flex items-center justify-between"
                onClick={() => openHandler(i)}
              >
                <h5 className="s2">{item.questions}</h5>
                <div className="relative min-w-[16px] max-w-[20px] h-5 cursor-pointer">
                  <div
                    className={`h-px md:h-[2px] w-[14px] md:w-5 bg-unveilBlack absolute top-1/2 rotate-0 opacity-0 unveilTransition ${
                      open === i ? "" : "!rotate-90 opacity-100"
                    }`}
                  ></div>
                  <div
                    className={`h-px md:h-[2px] w-[14px] md:w-5 bg-unveilBlack absolute top-1/2`}
                  ></div>
                </div>
              </div>
              <article
                className="overflow-hidden unveilTransition max-h-0"
                style={{ maxHeight: open === i ? `${heights[i] + 20}px` : "" }}
              >
                <p className="pb-2 mt-4 b3">{item.answer}</p>
              </article>
            </div>
          ))}
        </div>
      </Animate>
    </section>
  );
};

export default FAQ;
