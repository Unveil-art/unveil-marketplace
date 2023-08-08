import { useRef, useState } from "react";
import { useAsideAnimation } from "@/hooks/animations/useAsideAnimation";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import Close from "../svg/Close";
import { makeOffer } from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";
import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";
import Loader from "../svg/Loader";

const MakeOfferPopIn = ({
  edition,
  setEdition,
  offerOpen,
  setOfferOpen,
  exchangeRate,
}) => {
  const { value } = useLocalStorage("token");
  const [loading, setLoading] = useState(false);
  const [ethAmount, setEthAmount] = useState();
  const { authenticated } = useIsAuthenticated();

  const el = useRef();

  useAsideAnimation(el, offerOpen);

  const handleFormSubmit = async (e) => {
    if (!authenticated) {
      showTopStickyNotification("error", "Please log in to make an offer");
      setOfferOpen(false);
      setEdition(null);
      return;
    }

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
      setLoading(true);
      await makeOffer(value, data);
      showTopStickyNotification(
        "info",
        "Your offer has been sent successfully"
      );
      setTimeout(() => {
        setOfferOpen(false);
        setEdition(null);
      }, 500);
    } catch (error) {
      let message = error.response.data.message[0] || error.message;
      showTopStickyNotification("error", message);
    } finally {
      setLoading(false);
    }
  };

  const handleEthAmountChange = (e) => {
    const amount = e.target.value;
    setEthAmount(amount);
  };

  const dollarAmount = (ethAmount * exchangeRate).toFixed(2);

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

            <form onSubmit={handleFormSubmit} className="mt-24">
              <div className="relative">
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 b3">
                  ETH{" "}
                  <span className="b4 text-unveilGrey">
                    {ethAmount ? `(${dollarAmount} USD)` : ""}
                  </span>
                </p>
                <input
                  type="number"
                  name="amount"
                  placeholder="(e.g. 0.5)"
                  onChange={handleEthAmountChange}
                  value={ethAmount}
                  step="0.00001"
                  required
                  className="input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <textarea
                data-lenis-prevent
                className="textarea mt-2.5"
                id="personal-message"
                placeholder="Write a personal message"
                name="personal-message"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn disabled:cursor-not-allowed btn-primary btn-full mt-2.5"
              >
                {loading ? (
                  <div className="h-[25px] animate-spin justify-center flex items-center">
                    <Loader color="#F7F4ED" />
                  </div>
                ) : (
                  "Send offer"
                )}
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
