import React, { useState } from "react";

import PeopleFilterPopIn from "@/components/pop-in/PeopleFilterPopIn";

const SortPeople = ({ filter }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full md:w-[35vw]">
      <button
        onClick={() => setOpen(!open)}
        className="btn w-[calc(100%-55px)] md:hidden block btn-secondary ml-10 mr-[15px] mt-5"
      >
        Filter
      </button>
      <form className="md:block hidden space-y-5 max-w-[370px] px-10">
        <div>
          <label className="b4 block pb-[10px]">Sort (ascending)</label>
          <div className="grid grid-cols-2 pb-[15px] w-full">
            <div>
              <input
                className="radio-block top-left"
                type="radio"
                name="sort"
                id="alphabetical"
              />
              <label htmlFor="alphabetical">Alphabetical</label>
            </div>
            <div>
              <input
                className="radio-block top-right"
                type="radio"
                name="sort"
                id="followers"
              />
              <label htmlFor="followers">Followers</label>
            </div>
            <div>
              <input
                className="radio-block bottom-left"
                type="radio"
                name="sort"
                id="trending"
              />
              <label htmlFor="trending">Trending</label>
            </div>
            <div>
              <input
                className="radio-block bottom-right"
                type="radio"
                name="sort"
                id="newest"
              />
              <label htmlFor="newest">Newest</label>
            </div>
          </div>
        </div>
        <div className={`${filter === 0 ? "block" : "hidden"}`}>
          <label className="b4 block pb-[10px]">Category</label>
          <div className="grid grid-cols-2 pb-[15px] w-full">
            <div>
              <input
                className="border-collapse radio-block left"
                type="radio"
                name="category"
                id="established1"
              />
              <label htmlFor="established1">Established</label>
            </div>
            <div>
              <input
                className=" radio-block right"
                type="radio"
                name="category"
                id="talent1"
              />
              <label htmlFor="talent1">Talent</label>
            </div>
          </div>
        </div>

        <div>
          <label className="b4 block pb-[10px]">Sort (ascending)</label>
          <button className="mb-[6px] btn btn-secondary btn-full">
            Search
          </button>
        </div>
      </form>
      <PeopleFilterPopIn filter={filter} open={open} setOpen={setOpen} />
    </div>
  );
};

export default SortPeople;
