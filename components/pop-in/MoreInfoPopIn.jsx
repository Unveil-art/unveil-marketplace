import { useRef } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import Close from "../svg/Close";

const MoreInfoPopIn = ({ open, setOpen, text, title, subtitle }) => {
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
            <p className="text-center b4 mt-[80px]">{subtitle || "Subtitle"}</p>
            <h3 className="text-center s2 mb-[80px]">{title || "Title"}</h3>
            <p className="s2">{text || "Text"}</p>
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

export default MoreInfoPopIn;
