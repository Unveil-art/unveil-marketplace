import { useRef } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import Close from "../svg/Close";

const OptionsPopIn = ({ optionsOpen, setOptionsOpen }) => {
  const el = useRef();

  useAsideAnimation(el, optionsOpen);

  return (
    <section
      ref={el}
      className="fixed z-50 invisible w-full h-screen overflow-hidden"
    >
      <div className="gsap-el fixed overflow-y-scroll top-[15px] right-[15px] sm:top-5 sm:right-5 w-[280px] sm:w-[380px]  bg-[#ECE8DE] px-5 py-10 z-50 rounded-[20px] h-screen sm:h-fit">
        <div
          onClick={() => setOptionsOpen(!optionsOpen)}
          className="absolute top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
        >
          <div className="-translate-x-[1px]">
            <Close />
          </div>
        </div>
        <h3 className="mb-10 s2">Established</h3>
        <p className="b3">
          <strong className="!opacity-100">100x150</strong>{" "}
          <span className="opacity-60"> Edition of 1</span>
        </p>
      </div>
      <div
        onClick={() => setOptionsOpen(!optionsOpen)}
        className="fixed top-0 left-0 invisible w-full h-screen gsap-layer bg-unveilGrey"
      ></div>
    </section>
  );
};

export default OptionsPopIn;
