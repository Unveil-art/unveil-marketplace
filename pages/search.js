import React, { useEffect, useRef, useState } from "react";
import Arrow from "@/components/svg/Arrow";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/router";

const Search = () => {
  const [search, setSearch] = useState("");
  const searchEl = useRef();
  const debounce = useDebounce(search, 500);
  const router = useRouter();

  const handleSuggestions = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    console.log("Debounce");
  }, [debounce]);

  return (
    <main className="pt-[120px] min-h-screen">
      <div className="ml-[40px] md:ml-[35svw] md:pr-[40px] ">
        <div
          className={`bg-unveilBlack h-[3px] md:h-[5px] mb-3 md:mb-5 md:mr-0 mr-[15px]`}
        ></div>
        <input
          ref={searchEl}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="overflow-hidden max-w-[62vw] bg-transparent outline-none h1 placeholder:text-bgBlackOpacity2"
          placeholder="Search"
        />
        {debounce && (
          <span
            onClick={() => setSearch("")}
            className="px-2 py-1 border rounded-full cursor-pointer l2 border-unveilBlack"
          >
            Clear search
          </span>
        )}
      </div>
      <div className="ml-[40px] md:ml-[35svw] md:pr-[40px] mt-[60px]">
        <p className="b3 text-[17px] mb-1">Suggestions</p>
        <div className="space-y-[2px]">
          <div className="text-[#545454] items-center flex gap-1 b3">
            <Arrow small />
            Collection:{" "}
            <span
              onClick={() => handleSuggestions("Alexander Sporre")}
              className="cursor-pointer underline-on-hover"
            >
              Alexander Sporre
            </span>
          </div>
          <div className="text-[#545454] items-center flex gap-1 b3">
            <Arrow small />
            Artist:{" "}
            <span
              onClick={() => handleSuggestions("Bastiaan Woudt")}
              className="cursor-pointer underline-on-hover"
            >
              Bastiaan Woudt
            </span>
          </div>
          <div className="text-[#545454] items-center flex gap-1 b3">
            <Arrow small />
            Artwork:{" "}
            <span
              onClick={() => handleSuggestions("Pink Flower")}
              className="cursor-pointer underline-on-hover"
            >
              Pink Flower
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Search;
