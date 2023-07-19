import { useEffect, useRef, useState } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import Close from "../svg/Close";
import { getCurrentExchangeRateETHUSD, makeOffer } from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";
import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";

const MakeOfferPopIn = ({ edition, setEdition, offerOpen, setOfferOpen }) => {
  const [udsEx, setUdsEx] = useState();
  const [isSuccess, setSuccessMessage] = useState("hide");
  const [isError, setErrorMessage] = useState("hide");
  const { value } = useLocalStorage("token");

  const el = useRef();

  useEffect(() => {
    getUsdEx();
  }, []);

  const getUsdEx = async () => {
    const res = await getCurrentExchangeRateETHUSD();
    setUdsEx(res.USD);
  };

  useAsideAnimation(el, offerOpen);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get("personal-message");
    const amount = formData.get("amount");

    const data = {
      amount: Number(amount),
      message,
      edition_id: edition.id,
    };

    try {
      await makeOffer(value, data);
      showTopStickyNotification(
        "info",
        "Your offer has been sent successfully"
      );
      setTimeout(() => {
        setOfferOpen(false);
        setEdition(null);
      }, 1000);
    } catch (error) {
      let message = error.response.data.message[0] || error.message;
      showTopStickyNotification("error", message);
    }
  };

  return (
    <>
      {edition && (
        <section
          ref={el}
          className="fixed z-50 invisible w-full h-screen overflow-hidden"
        >
          <div
            data-lenis-prevent
            className="gsap-el fixed overflow-y-scroll top-[15px] right-[15px] sm:top-5 sm:right-5 w-[330px] sm:w-[380px] max-h-[calc(100vh-40px)] bg-[#ECE8DE] px-5 pt-32 pb-10 z-50 rounded-[20px]"
          >
            <div
              onClick={() => {
                setOfferOpen(false);
                setEdition(null);
              }}
              className="absolute top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
            >
              <div className="-translate-x-[1px]">
                <Close />
              </div>
            </div>

            <p className="b4 text-center">Buy from collector</p>
            <h3 className="mt-1.5 s2 text-center">Make offer</h3>
            <h5
              className={`text-teal-500 mb-[20px] text-center s2 max-w-[270px] mx-auto ${isSuccess}`}
            >
              Your request has been sent successfully
            </h5>
            <h5
              className={`text-rose-500 mb-[20px] text-center s2 max-w-[270px] mx-auto ${isError}`}
            >
              An error occured, please try again
            </h5>
            <form onSubmit={handleFormSubmit} className="mt-24">
              <div className="relative">
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 b3">
                  ETH
                </p>
                <input
                  type="number"
                  name="amount"
                  placeholder="(e.g. 0.5)"
                  required
                  className="input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <textarea
                data-lenis-prevent
                className="textarea mt-2.5"
                id="personal-message"
                placeholder="Write a personal message (optional)"
                name="personal-message"
              />
              <button
                type="submit"
                className="btn disabled:cursor-not-allowed btn-primary btn-full mt-2.5"
              >
                Send offer
              </button>
            </form>
          </div>
          <div
            onClick={() => {
              setOfferOpen(false);
              setEdition(null);
            }}
            className="fixed top-0 left-0 invisible w-full h-screen gsap-layer bg-unveilGrey"
          ></div>
        </section>
      )}
    </>
  );
};

export default MakeOfferPopIn;
