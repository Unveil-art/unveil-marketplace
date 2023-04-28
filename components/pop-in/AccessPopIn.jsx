import { useRef } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import Close from "../svg/Close";

const AccessPopIn = ({ accessOpen, setAccessOpen }) => {
  const el = useRef();

  useAsideAnimation(el, accessOpen);

  return (
    <section
      ref={el}
      className="fixed z-50 invisible w-full h-screen overflow-hidden"
    >
      <div className="gsap-el fixed overflow-y-scroll top-[15px] right-[15px] sm:top-5 sm:right-5 w-[280px] sm:w-[380px]  bg-[#ECE8DE] px-5 py-10 z-50 rounded-[20px] h-screen sm:h-fit">
        <div
          onClick={() => setAccessOpen(!accessOpen)}
          className="absolute top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
        >
          <div className="-translate-x-[1px]">
            <Close />
          </div>
        </div>
        <h3 className="mb-[15px] text-center b4">Join Unveil</h3>
        <h3 className="mb-[60px] text-center s2 max-w-[270px] mx-auto">
          Show us your work and get access to Unveil
        </h3>
        <p className="b3 leading-[16px] text-[11px] max-w-[250px]">
          Provide a link to your work and submitting a series of works upon
          selection by our curator.{" "}
        </p>
        <form className="mt-5 ">
          <input type="text" placeholder="Name" className="input" />
          <input type="email" placeholder="Email" className="my-1 input" />
          <input type="text" placeholder="Website" className="input" />
          <p className="py-5">i&apos;m a:</p>
          <div className="grid grid-cols-2 pb-[15px]">
            <div>
              <input
                className="radio-block left"
                type="radio"
                name="type"
                id="artist"
              />
              <label htmlFor="artist">Artist</label>
            </div>
            <div>
              <input
                className="radio-block right"
                type="radio"
                name="type"
                id="gallery"
              />
              <label htmlFor="gallery">Gallery</label>
            </div>
          </div>

          <button className="btn btn-full btn-primary btn-big" type="submit">
            Apply nowcess
          </button>
        </form>
      </div>
      <div
        onClick={() => setAccessOpen(!accessOpen)}
        className="fixed top-0 left-0 invisible w-full h-screen gsap-layer"
      ></div>
    </section>
  );
};

export default AccessPopIn;
