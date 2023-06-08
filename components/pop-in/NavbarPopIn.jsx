import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useRLsideAnimation } from "../../hooks/animations/useRLsideAnimation";
import Logo from "../svg/Logo";
import Close from "../svg/Close";
import Search from "../svg/Search";
import AccessPopIn from "./AccessPopIn";
import useLocalStorage from "@/hooks/useLocalStorage";

const NavbarPopIn = ({ navOpen, setNavOpen }) => {
  const [accessOpen, setAccessOpen] = useState(false);
  const el = useRef();
  const { value } = useLocalStorage("token");

  useRLsideAnimation(el, navOpen);

  return (
    <>
      <section
        ref={el}
        className="fixed z-50 invisible w-full h-screen overflow-hidden"
      >
        <div
          data-lenis-prevent
          className="gsap-el fixed overflow-y-scroll top-0 left-0 w-full sm:w-[540px]  bg-[#F6F4ED] px-5 py-8 z-50 rounded-br-[20px] h-screen sm:h-fit"
        >
          <Link href="/search" onClick={() => setNavOpen(!navOpen)}>
            <div className="absolute cursor-pointer top-8 left-5">
              <Search />
            </div>
          </Link>
          <div
            onClick={() => setNavOpen(!navOpen)}
            className="absolute block md:hidden top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
          >
            <div className="-translate-x-[1px]">
              <Close />
            </div>
          </div>
          <Link href="/" onClick={() => setNavOpen(!navOpen)}>
            <div className="w-[106px] scale-75  mx-auto md:w-[144px] cursor-pointer">
              <Logo />
            </div>
          </Link>
          <div className="border-t-[3px] border-t-unveilBlack mt-[60px]">
            <div className="grid grid-cols-2 border-b border-b-bgColorHover">
              <div className="w-full py-[25px] my-[15px] text-center border-r border-r-bgColorHover ">
                <Link href="/gallery">
                  <p
                    onClick={() => setNavOpen(!navOpen)}
                    className="cursor-pointer underline-on-hover b3"
                  >
                    Gallery
                  </p>
                </Link>
              </div>
              <div className="w-full py-[25px] my-[15px] text-center">
                <Link href="/gallery">
                  <p
                    onClick={() => setNavOpen(!navOpen)}
                    className="text-center cursor-pointer underline-on-hover b3 "
                  >
                    Collections
                  </p>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-b-bgColorHover">
              <div className="w-full py-[25px] my-[15px] text-center border-r border-r-bgColorHover ">
                <Link href="/people">
                  <p
                    onClick={() => setNavOpen(!navOpen)}
                    className="text-center cursor-pointer underline-on-hover b3"
                  >
                    Artists
                  </p>
                </Link>
              </div>
              <div className="w-full py-[25px] my-[15px] text-center">
                <Link href="/people">
                  <p
                    onClick={() => setNavOpen(!navOpen)}
                    className="text-center cursor-pointer b3 underline-on-hover"
                  >
                    Curators
                  </p>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-b-bgColorHover">
              <div className="w-full py-[25px] my-[15px] text-center border-r border-r-bgColorHover ">
                <Link href="/editorial">
                  <p
                    onClick={() => setNavOpen(!navOpen)}
                    className="text-center cursor-pointer b3 underline-on-hover"
                  >
                    Journal
                  </p>
                </Link>
              </div>
              <div className="w-full py-[25px] my-[15px] text-center">
                <Link href="/">
                  <p
                    onClick={() => setNavOpen(!navOpen)}
                    className="text-center cursor-pointer b3 underline-on-hover "
                  >
                    Learn
                  </p>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 ">
              {value && (
                <div className="w-full py-[25px] my-[15px] text-center border-r border-r-bgColorHover ">
                  <Link href="/account">
                    <p
                      onClick={() => setNavOpen(!navOpen)}
                      className="text-center cursor-pointer b3 underline-on-hover"
                    >
                      Account
                    </p>
                  </Link>
                </div>
              )}
              {!value && (
                <div className="w-full py-[25px] my-[15px] text-center border-r border-r-bgColorHover ">
                  <Link href="/login">
                    <p
                      onClick={() => setNavOpen(!navOpen)}
                      className="text-center cursor-pointer b3 underline-on-hover"
                    >
                      Account
                    </p>
                  </Link>
                </div>
              )}
              <div className="w-full py-[25px] my-[15px] text-center">
                <Link href="/">
                  <p
                    onClick={() => setNavOpen(!navOpen)}
                    className="text-center cursor-pointer b3 underline-on-hover"
                  >
                    About
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <button
            className="mt-10 btn btn-lg btn-full btn-primary btn-big"
            onClick={() => setAccessOpen(!accessOpen)}
          >
            Request access
          </button>
          <p className="text-center b3 mt-[15px]">
            <strong>Warning</strong> Lorem ipsum dolor sit
          </p>
        </div>
        <div
          onClick={() => setNavOpen(false)}
          className="fixed top-0 left-0 invisible w-full h-screen gsap-layer bg-unveilGrey"
        ></div>
      </section>
      <AccessPopIn setAccessOpen={setAccessOpen} accessOpen={accessOpen} />
    </>
  );
};

export default NavbarPopIn;
