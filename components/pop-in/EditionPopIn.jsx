import { useRef, useEffect, useState } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import Close from "../svg/Close";
import Chat from "../reusable/Chat";
import Check2 from "../svg/Check2";
import Link from "next/link";
import Mastercard from "../svg/Mastercard";
import Visa from "../svg/Visa";
import Currency from "../svg/Currency";

const EditionPopIn = ({ edition, setEdition }) => {
  const [type, setType] = useState();
  const el = useRef();
  console.log(edition);

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
            className="gsap-el fixed max-h-[calc(100vh-40px)] overflow-y-scroll top-[15px] right-[15px] sm:top-5 sm:right-5 w-[280px] sm:w-[380px] bg-[#9A8183] z-50 rounded-[20px] h-fit"
          >
            <div
              onClick={() => setEdition(null)}
              className="absolute top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
            >
              <div className="-translate-x-[1px]">
                <Close />
              </div>
            </div>
            <div className="pt-5">
              <div className="h-[300px] relative">
                <p className="px-5 s2">100x50</p>
                <p className="px-5 b3">
                  Edition {edition.edition_index} of {edition.max_editions}
                </p>
                <img
                  className="absolute px-20 top-[100px]"
                  src={edition.media_url}
                  alt={edition.edition_id}
                />
              </div>
              <div className="black-gradient h-[25px]"></div>
            </div>
            <div className="bg-[#ECE8DE] z-10 relative px-5 py-5">
              <div className="bg-unveilWhite mb-[15px] border border-unveilGreen rounded-[10px] p-5">
                <p className="px-2 rounded-full bg-unveilBlack text-unveilWhite w-fit l2 text-[9px] leading-[17px]">
                  YOUR CHOICE
                </p>
                <p className="b3 mt-[5px] mb-5">{type}</p>
                <div className="flex items-center gap-2">
                  <Check2 /> <p className="b4">Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check2 /> <p className="b4">Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check2 /> <p className="b4">Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check2 /> <p className="b4">Lorem ipsum dolor sit amet.</p>
                </div>

                <div className="flex items-end justify-between mb-[10px]">
                  <p className="b5">Token ID #{edition.token_id}</p>
                  <div>
                    <p className="s2">${edition.price}</p>
                    <p className="ml-auto w-fit b5">{edition.price} ETH</p>
                  </div>
                </div>
                <Link href="/checkout">
                  <button className="btn btn-primary btn-full">Checkout</button>
                </Link>
                <div className="flex items-center justify-center gap-2 mt-[10px]">
                  <img src="/images/apple_pay.png" alt="Apple pay" />
                  <img src="/images/mastercard.png" alt="Mastercard" />
                  <img src="/images/visa.png" alt="Visa" />
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
