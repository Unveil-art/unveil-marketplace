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

  useEffect(() => {
    if (filterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [filterOpen]);

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
          className="gsap-el fixed overflow-y-scroll h-screen md:h-[calc(100vh-40px)] top-0 right-0 sm:top-5 sm:right-5 w-full sm:w-[380px] bg-unveilWhite px-5 py-10 z-50 sm:rounded-[20px]"
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
              <label className="b4 block pb-[10px]">Medium</label>
              <div className="grid grid-cols-2 pb-[15px] w-full">
                <div>
                  <input
                    className="radio-block top-left"
                    type="radio"
                    name="medium"
                    id="all"
                  />
                  <label htmlFor="all">All</label>
                </div>
                <div>
                  <input
                    className="radio-block top-right"
                    type="radio"
                    name="medium"
                    id="digital"
                  />
                  <label htmlFor="digital">Digital</label>
                </div>
                <div>
                  <input
                    className="radio-block bottom-left"
                    type="radio"
                    name="medium"
                    id="print"
                  />
                  <label htmlFor="print">Print</label>
                </div>
                <div>
                  <input
                    className="radio-block bottom-right"
                    type="radio"
                    name="medium"
                    id="books"
                  />
                  <label htmlFor="books">Books</label>
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
                  />
                  <label htmlFor="allArt">All</label>
                </div>
                <div>
                  <input
                    className="radio-block top-right"
                    type="radio"
                    name="art"
                    id="portrait"
                  />
                  <label htmlFor="portrait">Portrait</label>
                </div>
                <div>
                  <input
                    className="radio-block bottom-left"
                    type="radio"
                    name="art"
                    id="landscape"
                  />
                  <label htmlFor="landscape">Landscape</label>
                </div>
                <div>
                  <input
                    className="radio-block bottom-right"
                    type="radio"
                    name="art"
                    id="still_life"
                  />
                  <label htmlFor="still_life">Still life</label>
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
