import { useRef, useState, useEffect } from "react";
import { useAsideAnimation } from "@/hooks/animations/useAsideAnimation";
import Close from "../svg/Close";

const SortAndSearch = () => {
  const el = useRef();
  const [filterOpen, setFilterOpen] = useState(false);

  useAsideAnimation(el, filterOpen);

  const handleOpen = () => {
    setFilterOpen(!filterOpen);
  };

  // Replace checked value with a state to let it work
  return (
    <section className="fixed z-50 w-full h-screen overflow-hidden">
      <div
        onClick={() => handleOpen()}
        className="fixed cursor-pointer -translate-x-1/2 unveilTransition hover:scale-105 bg-unveilBlack w-fit bottom-5 left-1/2 py-[6px] px-5 rounded-full"
      >
        <p className="b4 text-unveilWhite">Search & Sort</p>
      </div>
      <div ref={el} className="fixed z-50 w-full h-screen overflow-hidden">
        <div
          data-lenis-prevent
          className="gsap-el fixed max-h-[calc(100svh-40px)] overflow-y-scroll top-[15px] right-[15px] sm:top-5 sm:right-5 w-[280px] sm:w-[380px]  bg-unveilWhite px-5 py-10 z-50 rounded-[20px] h-fit"
        >
          <div
            onClick={() => handleOpen()}
            className="absolute top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
          >
            <div className="-translate-x-[1px]">
              <Close />
            </div>
          </div>
          <form className="space-y-5">
            <div>
              <label className="b4 block pb-[10px]">Category</label>
              <div className="grid grid-cols-2 pb-[15px] w-full">
                <div>
                  <input
                    className="border-collapse radio-block left"
                    type="radio"
                    name="category"
                    id="artworks"
                    checked
                  />
                  <label htmlFor="artworks" className="b3">
                    Artworks
                  </label>
                </div>
                <div>
                  <input
                    className=" radio-block right"
                    type="radio"
                    name="category"
                    id="collections"
                  />
                  <label htmlFor="collections" className="b3">
                    Collections
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="b4 block pb-[10px]">Medium</label>
              <div className="grid grid-cols-2 pb-[15px] w-full">
                <div>
                  <input
                    className="radio-block top-left"
                    type="radio"
                    name="medium"
                    id="all"
                    checked
                  />
                  <label htmlFor="all" className="b3">
                    All
                  </label>
                </div>
                <div>
                  <input
                    className="radio-block top-right"
                    type="radio"
                    name="medium"
                    id="digital"
                  />
                  <label htmlFor="digital" className="b3">
                    Digital
                  </label>
                </div>
                <div>
                  <input
                    className="radio-block bottom-left"
                    type="radio"
                    name="medium"
                    id="print"
                  />
                  <label htmlFor="print" className="b3">
                    Print
                  </label>
                </div>
                <div>
                  <input
                    className="radio-block bottom-right"
                    type="radio"
                    name="medium"
                    id="books"
                  />
                  <label htmlFor="books" className="b3">
                    Books
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="b4 block pb-[10px]">Art type</label>
              <div className="grid grid-cols-2 pb-[15px] w-full">
                <div>
                  <input
                    className="radio-block top-left"
                    type="radio"
                    name="art"
                    id="allArt"
                    checked
                  />
                  <label htmlFor="allArt" className="b3">
                    All
                  </label>
                </div>
                <div>
                  <input
                    className="radio-block top-right"
                    type="radio"
                    name="art"
                    id="portrait"
                  />
                  <label htmlFor="portrait" className="b3">
                    Portrait
                  </label>
                </div>
                <div>
                  <input
                    className="radio-block bottom-left"
                    type="radio"
                    name="art"
                    id="landscape"
                  />
                  <label htmlFor="landscape" className="b3">
                    Landscape
                  </label>
                </div>
                <div>
                  <input
                    className="radio-block bottom-right"
                    type="radio"
                    name="art"
                    id="still_life"
                  />
                  <label htmlFor="still_life" className="b3">
                    Still life
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="b4 block pb-[10px]">Sort (ascending)</label>
              <div className="grid grid-cols-2 pb-[15px] w-full">
                <div>
                  <input
                    className="radio-block top-left"
                    type="radio"
                    name="sort"
                    id="alphabetical"
                    checked
                  />
                  <label htmlFor="alphabetical" className="b3">
                    Alphabetical
                  </label>
                </div>
                <div>
                  <input
                    className="radio-block top-right"
                    type="radio"
                    name="sort"
                    id="followers"
                  />
                  <label htmlFor="followers" className="b3">
                    Followers
                  </label>
                </div>
                <div>
                  <input
                    className="radio-block bottom-left"
                    type="radio"
                    name="sort"
                    id="trending"
                  />
                  <label htmlFor="trending" className="b3">
                    Trending
                  </label>
                </div>
                <div>
                  <input
                    className="radio-block bottom-right"
                    type="radio"
                    name="sort"
                    id="newest"
                  />
                  <label htmlFor="newest" className="b3">
                    Newest
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="b4 block pb-[10px]">Sort (ascending)</label>
              <button className="mb-[6px] btn btn-secondary btn-full">
                Search
              </button>
              <button className="btn btn-primary btn-full">
                Apply filters
              </button>
              <button className="block mx-auto mt-5 underline decoration-1 underline-offset-2 l1">
                Reset filters
              </button>
            </div>
          </form>
        </div>
        <div
          onClick={() => handleOpen()}
          className="fixed top-0 left-0 invisible w-full h-screen gsap-layer bg-unveilGrey"
        ></div>
      </div>
    </section>
  );
};

export default SortAndSearch;
