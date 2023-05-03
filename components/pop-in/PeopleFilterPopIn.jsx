import React from "react";

import { useRef } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import Close from "../svg/Close";

const PeopleFilterPopIn = ({ open, setOpen, filter }) => {
  const el = useRef();

  useAsideAnimation(el, open);

  return (
    <>
      <section
        ref={el}
        className="fixed z-50 invisible w-full h-screen overflow-hidden"
      >
        <div className="gsap-el fixed overflow-y-scroll top-[15px] right-[15px] sm:top-5 sm:right-5 w-[280px] sm:w-[380px]  bg-unveilWhite px-5 py-10 z-50 rounded-[20px] h-fit">
          <div
            onClick={() => setOpen(false)}
            className="absolute top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
          >
            <div className="-translate-x-[1px]">
              <Close />
            </div>
          </div>
          <div>
            <form className="w-full space-y-5">
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
                      id="artworks"
                    />
                    <label htmlFor="artworks">Artworks</label>
                  </div>
                  <div>
                    <input
                      className=" radio-block right"
                      type="radio"
                      name="category"
                      id="collections"
                    />
                    <label htmlFor="collections">Collections</label>
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
          </div>
        </div>
        <div
          onClick={() => setOpen(false)}
          className="fixed top-0 left-0 invisible w-full h-screen gsap-layer bg-unveilGrey"
        ></div>
      </section>
    </>
  );
};

export default PeopleFilterPopIn;
