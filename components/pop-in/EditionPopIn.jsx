import { useRef, useEffect, useState, useContext } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import Close from "../svg/Close";
import Chat from "../reusable/Chat";
import Check2 from "../svg/Check2";
import Link from "next/link";
import Mastercard from "../svg/Mastercard";
import Visa from "../svg/Visa";
import Currency from "../svg/Currency";
import { getCurrentExchangeRateETHUSD } from "lib/backend";
import Min from "../svg/Min";
import { useRouter } from "next/router";
import ApplePay from "../svg/ApplePay";
import { Web3Context } from "@/contexts/Web3AuthContext";
import useLocalStorage from "@/hooks/useLocalStorage";

const EditionPopIn = ({ edition, setEdition, dominantColor }) => {
  const [type, setType] = useState();
  const [price, setPrice] = useState();
  const { value: token } = useLocalStorage("token");
  const { login } = useContext(Web3Context);
  const el = useRef();
  const router = useRouter();

  const handlePrice = async () => {
    if (edition?.price) {
      const res = await getCurrentExchangeRateETHUSD();
      setPrice((res.USD * edition.price).toFixed(2));
    }
  };

  useEffect(() => {
    handlePrice();
  }, [edition]);

  useAsideAnimation(el, edition);

  useEffect(() => {
    if (edition) {
      switch (edition.edition_type) {
        case "NFT_Only":
          setType("NFT");
          break;
        case "Print_Only":
          setType("Print");
          break;
        case "NFT_Backed_by_print":
          setType("NFT + print");
          break;
      }
    }
  }, [edition]);

  return (
    <>
      {edition && (
        <section
          ref={el}
          className="fixed z-50 invisible w-full h-screen overflow-hidden"
        >
          <div
            data-lenis-prevent
            style={{ backgroundColor: dominantColor }}
            className="gsap-el fixed max-h-[calc(100vh-40px)] overflow-y-scroll top-[15px] right-[15px] sm:top-5 sm:right-5  w-[330px] sm:w-[380px] bg-bgColor z-50 rounded-[20px] h-fit"
          >
            <div
              onClick={() => setEdition(null)}
              className="absolute top-[15px] z-10 right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
            >
              <div className="-translate-x-[1px]">
                <Close />
              </div>
            </div>
            <div className="pt-5">
              <div className="h-[200px] md:h-[300px] relative">
                {/* <p className="px-5 s2">100x50</p> */}
                <p
                  className={`${
                    edition.edition_type === "NFT_Only" ? "s2" : "b3"
                  } px-5 `}
                >
                  Edition {edition.edition_index} of {edition.max_editions}
                </p>
                <img
                  className="absolute px-20 top-[100px] shadow2"
                  src={edition.media_url}
                  alt={edition.edition_id}
                />
              </div>
              <div className="black-gradient h-[25px]"></div>
            </div>
            <div className="bg-[#ECE8DE] z-10 relative px-5 py-5">
              <div className="bg-unveilWhite mb-[15px] border border-unveilGreen rounded-[10px] p-5">
                <p className="px-3 rounded-full tracking-[0.2em] bg-unveilBlack text-unveilWhite w-fit l2 text-[9px]">
                  YOUR CHOICE
                </p>
                <p className="b3 mt-[5px] mb-5">{type}</p>
                {edition.edition_type === "NFT_Only" && (
                  <>
                    <div className="flex items-center gap-2">
                      <Check2 />{" "}
                      <p className="b4">Store as NFT in your wallet</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check2 />{" "}
                      <p className="b4">Easily receive offers ans re-sell</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Min /> <p className="b4">Not convertible to print</p>
                    </div>
                  </>
                )}
                {edition.edition_type === "Print_Only" && (
                  <>
                    <div className="flex items-center gap-2">
                      <Check2 />{" "}
                      <p className="b4">You’ll receive a printed artwork</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check2 />{" "}
                      <p className="b4">Artist approved, printed by Unveil</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check2 /> <p className="b4">No wallet needed</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Min />{" "}
                      <p className="b4">No NFT or blockchain registration</p>
                    </div>
                  </>
                )}
                {edition.edition_type === "NFT_Backed_by_print" && (
                  <>
                    <div className="flex items-center gap-2">
                      <Check2 />{" "}
                      <p className="b4">Convert NFT to print anytime</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check2 /> <p className="b4">Printed by artist</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check2 />{" "}
                      <p className="b4">Easily receive offers ans re-sell</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check2 />{" "}
                      <p className="b4">No physical storage needed</p>
                    </div>
                  </>
                )}

                <div className="flex items-end justify-between mb-[10px]">
                  {edition.token_id && (
                    <p className="b5">Token ID #{edition.token_id}</p>
                  )}{" "}
                  {!edition.token_id && <p></p>}
                  <div>
                    <p className="s2">${price ? price : "0"}</p>
                    <p className="ml-auto w-fit leading-[24px] b5">
                      {edition.price?.toFixed(2)} ETH
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (token) {
                      router.push(
                        `/checkout/${edition.artwork_id}/${edition.edition_id}`
                      );
                    } else {
                      login();
                    }
                  }}
                  className="btn disabled:cursor-not-allowed btn-primary btn-full"
                >
                  Checkout
                </button>
                <div className="flex items-center h-[20px] justify-center gap-2 mt-[10px]">
                  <ApplePay />
                  <div className="mt-1">
                    <Mastercard />
                  </div>
                  <Visa color="#141414" />
                </div>
              </div>
              <Chat
                title="don't have a wallet?"
                text="Our art advisors are just one click away"
              />
            </div>
          </div>
          <div
            onClick={() => setEdition(null)}
            className="fixed top-0 left-0 invisible w-full h-screen gsap-layer bg-unveilGrey"
          ></div>
        </section>
      )}
    </>
  );
};

export default EditionPopIn;
