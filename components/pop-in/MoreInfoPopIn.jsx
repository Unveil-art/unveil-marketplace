import { useRef } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import Close from "../svg/Close";
import ApplePay from "../svg/ApplePay";
import Mastercard from "../svg/Mastercard";
import Visa from "../svg/Visa";
import GooglePay from "../svg/GooglePay";
import Ideal from "../svg/Ideal";
import MetaMask from "../svg/MetaMask";
import TWT from "../svg/TWT";

const MoreInfoPopIn = ({
  open,
  setOpen,
  text,
  title,
  subtitle,
  payment,
  smallText,
}) => {
  const el = useRef();

  useAsideAnimation(el, open);

  return (
    <>
      <section
        ref={el}
        className="fixed z-[55] invisible w-full h-screen overflow-hidden"
      >
        <div
          data-lenis-prevent
          className="gsap-el fixed max-h-[calc(100svh-40px)] overflow-y-scroll top-[15px] right-[15px] sm:top-5 sm:right-5 w-[280px] sm:w-[380px]  bg-unveilWhite px-5 py-10 z-50 rounded-[20px]"
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
            <h3
              className={`text-center s2 ${
                payment ? "mb-[10px]" : "mb-[80px]"
              } `}
            >
              {title || "Title"}
            </h3>
            {payment && (
              <div className="mb-20">
                <div className="flex items-center flex-wrap mx-auto  w-[200px] h-[20px] justify-center gap-2">
                  <div className="mt-1">
                    <Mastercard />
                  </div>
                  <Visa color="#141414" />
                  <ApplePay />
                  <GooglePay />
                  <Ideal />
                  <MetaMask />
                  <TWT />
                </div>
              </div>
            )}
            <p className={`${smallText ? "b3" : "s2"} break-words `}>
              {text || "Text"}
            </p>
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
