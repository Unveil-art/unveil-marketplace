import React, { useRef } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import Close from "../svg/Close";

const AccessPopIn3 = ({ open, setOpen }) => {
  const el = useRef();

  useAsideAnimation(el, open);

  return (
    <>
      <section
        ref={el}
        className="fixed z-50 invisible w-full h-screen overflow-hidden"
      >
        <div
          data-lenis-prevent
          className="gsap-el fixed max-h-[calc(100vh-40px)] overflow-y-scroll top-[15px] right-[15px] sm:top-5 sm:right-5 w-[280px] sm:w-[380px]  bg-unveilWhite px-5 py-10 z-50 rounded-[20px] h-fit"
        >
          <div
            onClick={() => setOpen(!open)}
            className="absolute top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
          >
            <div className="-translate-x-[1px]">
              <Close />
            </div>
          </div>
          <div>
            <p className="text-center b4 mt-[80px]">Sign up</p>
            <h3 className="text-center s2 mb-[80px]">
              Be the first to start collecting
            </h3>
            <form action="https://submit-form.com/qTCiI7uH">
              <input
                className="input mb-[5px]"
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required=""
              />
              <input
                className="input mb-[15px]"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required=""
              />

              <button type="submit" className="btn btn-full btn-primary">
                Apply now
              </button>
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

export default AccessPopIn3;
