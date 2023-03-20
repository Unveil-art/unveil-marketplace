import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const FAQ = () => {
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
    [1, 2, 3].map((item, i) => {
      setHeight((heights) => [
        ...heights,
        ref.current.children[i].scrollHeight,
      ]);
    });
  }, []);

  return (
    <section className="">
      <div className="flex justify-between">
        <h2 className="h3">FAQ</h2>
        <div className="">
          <p className="flex gap-1 s2">
            View all questions.
            <Link
              href="/gallery"
              className="hidden underline cursor-pointer md:block underline-offset-4 decoration-1"
            >
              <span className="">Learn more</span>
            </Link>
          </p>
        </div>
      </div>
      <div ref={ref} className="group">
        {[1, 2, 3].map((item, i) => (
          <div key={i} className="border-t-2 border-unveilBlack">
            <div
              className="flex items-center justify-between"
              onClick={() => openHandler(i)}
            >
              <h5 className="s2">What is Unveil</h5>
              <div className="relative w-5 h-5 cursor-pointer">
                <div
                  className={`h-[2px] w-5 bg-unveilBlack absolute top-1/2 rotate-90 transition ${
                    open === i ? "" : "rotate-0 opacity-0"
                  }`}
                ></div>
                <div
                  className={`h-[2px] w-5 bg-unveilBlack absolute top-1/2 transition ${
                    open === i ? "" : "rotate-0 opacity-0"
                  }`}
                ></div>
              </div>
            </div>
            <article
              className=""
              style={{ maxHeight: open === i ? `${heights[i] + 20}px` : "" }}
            >
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                mollitia corporis minus cum eius? Qui perspiciatis et vel
                expedita officia, voluptate impedit voluptatibus sint dolores
                quas quisquam minus veritatis! Quis non quos voluptatum omnis
                harum? Cupiditate, pariatur. Optio praesentium pariatur
                distinctio, excepturi neque dolorem blanditiis. Voluptatum vel
                obcaecati recusandae quidem!
              </p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
