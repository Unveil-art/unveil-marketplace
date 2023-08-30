import React, { useEffect, useState, useContext, useRef } from "react";
import ColorThief from "colorthief";
import { StepContext } from "@/contexts/StepContext";
import { getArtworkById } from "lib/backend";
import { darkenColor, isLight } from "lib/utils/color";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Web3Context } from "@/contexts/Web3AuthContext";
import useTouch from "@/hooks/useTouch";
import Minting from "@/components/section/checkout-page/Minting";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const STEPS = {
  UNCLAIMED: "UNCLAIMED",
  CLAIMED: "CLAIMED",
  PENDING: "PENDING",
  SIGNIN: "SIGNIN",
  MINTING: "MINTING",
};

const ClaimNFT = ({ artwork }) => {
  const { setColor } = useContext(StepContext);
  const { login } = useContext(Web3Context);
  const { width } = useWindowSize();
  const { value: token } = useLocalStorage("token");
  const [dominantColor, setDominantColor] = useState("rgba(21, 17, 0, 0.05)");
  const [orientation, setOrientation] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const swipeEl = useRef(null);

  const [step, setStep] = useState(STEPS.UNCLAIMED);
  const [isExpanded, setIsExpanded] = useState(false);

  const onSwipe = (direction) => {
    if (isDesktop) return;
    if (direction === "bottom") {
      setIsExpanded(false);
    }

    if (direction === "top") {
      setIsExpanded(true);
    }
  };

  useTouch(swipeEl, onSwipe);

  const init = async () => {
    setStep(STEPS.PENDING);
  };

  useEffect(() => {
    setStep(STEPS.SIGNIN);
    if (token) {
      init();
    }
  }, [token]);

  useEffect(() => {
    setColor(true);

    const img = new window.Image();
    img.src = artwork.media_url;
    img.crossOrigin = "Anonymous";
    const colorThief = new ColorThief();

    img.onload = function () {
      let color = colorThief.getColor(img);

      if (isLight(color)) {
        color = darkenColor(color, 30);
      }

      setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  }, []);

  useEffect(() => {
    const img = document.createElement("img");

    img.onload = function () {
      if (this.width > this.height) {
        setOrientation(true);
      } else if (this.width < this.height) {
        setOrientation(false);
      } else {
        setOrientation(false);
      }
    };

    img.src = artwork.media_url;
  }, []);

  return (
    <div>
      {step !== STEPS.MINTING && (
        <div className="relative grid grid-cols-1 md:grid-cols-5">
          <div
            className="h-[100dvh] md:col-span-3"
            style={{ backgroundColor: dominantColor }}
          >
            <div
              className={`h-[90%] unveilTransition md:h-screen overflow-hidden md:sticky  top-0 flex items-center justify-center`}
            >
              <div className={`h-full aspect-[3/4] mb-1 pointer-events-none`}>
                <div
                  className={`${
                    orientation
                      ? " mx-10 md:mx-20 w-[calc(100%-70px)] md:w-[calc(100%-160px)] "
                      : "mx-auto :mx-20 md:mx-32  w-[calc(100%-320px)] md:w-[calc(100%-256px)]"
                  } ${width < 768 ? "shadow2" : "shadow1"}
                relative h-full z-20`}
                >
                  <Image
                    fill={true}
                    alt={artwork.name}
                    src={artwork.media_url}
                    style={{ objectFit: "contain", zIndex: 20 }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 md:static h-full fixed bottom-0 w-full z-20 pointer-events-none md:pointer-events-auto">
            <div
              className={`${
                isExpanded
                  ? "pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } absolute w-full h-full block md:hidden bg-bgBlackOpacity2 transition-opacity`}
              onClick={() => setIsExpanded(false)}
            />
            <div
              className={`${
                isExpanded ? "expanded" : ""
              } md:h-full h-[400px] pointer-events-auto md:static fixed bottom-0 w-full bottom-sheet`}
              ref={swipeEl}
            >
              <div className="absolute pointer-events-auto block md:hidden h-1 w-[84px] top-[-13px] bg-unveilWhite left-1/2 transform -translate-x-1/2 rounded-[10px]" />

              <div
                className={`${
                  !isExpanded
                    ? "pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                } absolute pointer-events-auto block md:hidden top-0 left-0 w-full h-full bg-unveilWhite pt-[30px] bottom-sheet__inner transition-opacity`}
              >
                <h2 className="text-center b1">Swipe to claim NFT</h2>
              </div>

              <div className="md:pt-[180px] flex flex-col h-full mx-auto md:pb-16 py-8 md:py-0 md:max-w-[450px] px-7 md:px-6 bg-unveilWhite overflow-hidden bottom-sheet__inner">
                {step === STEPS.SIGNIN && (
                  <>
                    <div className="mb-4">
                      <h1 className="h3 mt-4 md:mt-5 mb-6">Claim NFT</h1>
                      <p className="s2 md:max-w-[390px] mb-6">
                        The NFT maha 01 is primed and awaiting its rightful
                        owner to claim it on the blockchain.
                      </p>
                      <p className="uppercase b6">POWERED BY ETHEREUM</p>
                    </div>
                    <div className="mt-auto md:max-w-[390px]">
                      <button
                        className="btn btn-primary w-full btn-lg"
                        onClick={login}
                      >
                        Login/signup
                      </button>
                    </div>
                  </>
                )}

                {step === STEPS.UNCLAIMED && (
                  <>
                    <div className="mb-4">
                      <h1 className="h3 mt-4 md:mt-5 mb-6">
                        Ready to be claimed
                      </h1>
                      <p className="s2 md:max-w-[390px] mb-6">
                        The NFT artwork maha 01 is prepared for minting,
                        offering a digital masterpiece poised to be tokenized on
                        the blockchain.
                      </p>
                    </div>
                    <div className="mt-auto md:max-w-[390px]">
                      <button className="btn btn-primary w-full btn-lg">
                        Claim NFT
                      </button>
                    </div>
                  </>
                )}

                {step === STEPS.PENDING && (
                  <>
                    <div className="mb-4">
                      <h1 className="h3 mt-4 md:mt-5 mb-6">
                        Claim request is pending
                      </h1>
                      <p className="s2 md:max-w-[390px] mb-6">
                        The claim request for the NFT maha 01 is currently
                        pending approval.
                      </p>
                    </div>
                    <div className="mt-auto md:max-w-[390px]">
                      <button className="btn btn-secondary w-full btn-lg">
                        View on Etherscan
                      </button>
                    </div>
                  </>
                )}

                {step === STEPS.CLAIMED && (
                  <>
                    <div className="mb-4">
                      <h1 className="h3 mt-4 md:mt-5 mb-6">Already claimed</h1>
                      <p className="s2 md:max-w-[390px] mb-6">
                        The NFT maha 01 has been successfully claimed,
                        signifying its ownership on the blockchain.
                      </p>
                    </div>
                    <div className="mt-auto md:max-w-[390px]">
                      <button className="btn btn-primary w-full btn-lg mb-4">
                        Return
                      </button>
                      <button className="btn btn-secondary w-full btn-lg">
                        View on Etherscan
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {step === STEPS.MINTING && <Minting artwork={artwork} />}
    </div>
  );
};

export default ClaimNFT;

export async function getServerSideProps({ params }) {
  const artwork = await getArtworkById(params.id);

  return {
    props: {
      artwork,
    },
  };
}
