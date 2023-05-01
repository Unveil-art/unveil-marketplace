import React, { useState } from "react";
import Animate from "@/components/reusable/Animate";

const Filter = () => {
  const [category, setCategory] = useState(0);
  const [artist, setArtist] = useState(0);
  const [medium, setMedium] = useState(0);

  return (
    <Animate
      options={{ alpha: true, delay: 0.5 }}
      className="ml-10 md:ml-[35svw] flex gap-10 flex-wrap pr-10 pb-10 md:pb-[60px]"
    >
      <div className="flex items-center gap-2 md:block">
        <p className="md:mb-2 b3 md:b6">Category</p>
        <div className="flex items-center gap-1">
          <span
            onClick={() => setCategory(0)}
            className={`${
              category === 0 ? "border-unveilBlack" : "border-bgColorHover"
            } px-2 border rounded-full cursor-pointer unveilTransition md:px-4 l2`}
          >
            Artworks
          </span>
          <span
            onClick={() => setCategory(1)}
            className={`${
              category === 1 ? "border-unveilBlack" : "border-bgColorHover"
            } px-2 border rounded-full cursor-pointer unveilTransition md:px-4 l2 `}
          >
            Collections
          </span>
        </div>
      </div>
      <div className="hidden md:block">
        <p className="md:mb-2 b3 md:b6">Artist</p>
        <div className="flex items-center gap-1">
          <span
            onClick={() => setArtist(0)}
            className={`${
              artist === 0 ? "border-unveilBlack" : "border-bgColorHover"
            } px-4 border rounded-full unveilTransition cursor-pointer l2 `}
          >
            Established
          </span>
          <span
            onClick={() => setArtist(1)}
            className={`${
              artist === 1 ? "border-unveilBlack" : "border-bgColorHover"
            } px-4 border rounded-full unveilTransition cursor-pointer l2 `}
          >
            Talent
          </span>
        </div>
      </div>
      <div className="hidden md:block">
        <p className="md:mb-2 b3 md:b6">Medium</p>
        <div className="flex items-center">
          <span
            onClick={() => setMedium(0)}
            className={`${
              medium === 0 ? "border-unveilBlack" : "border-bgColorHover"
            } px-4 py-[0px] border rounded-l-[5px] unveilTransition cursor-pointer l2`}
          >
            Digital
          </span>
          <span
            onClick={() => setMedium(1)}
            className={`${
              medium === 1 ? "border-unveilBlack" : "border-bgColorHover"
            } px-4 py-[0px] border rounded-r-[5px] unveilTransition cursor-pointer l2`}
          >
            Print
          </span>
        </div>
      </div>
    </Animate>
  );
};

export default Filter;
