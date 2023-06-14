import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useRLsideAnimation } from "../../hooks/animations/useRLsideAnimation";
import Logo from "../svg/Logo";
import Close from "../svg/Close";
import Search from "../svg/Search";
import AccessPopIn from "./AccessPopIn";
import useLocalStorage from "@/hooks/useLocalStorage";

const NavbarPopIn = ({ navOpen, setNavOpen, navWarning }) => {
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
          className="gsap-el fixed overflow-y-scroll top-0 left-0 w-[330px] sm:w-[540px]  bg-[#ECE8DE] px-5 md:px-10 py-10 z-50 max-h-screen rounded-b-[20px] rounded-tr-[20px] h-fit"
        >
          <Link href="/search" onClick={() => setNavOpen(!navOpen)}>
            <div className="absolute cursor-pointer top-8 left-5">
              <Search />
            </div>
          </Link>
          {/* <div
            onClick={() => setNavOpen(!navOpen)}
            className="absolute block md:hidden top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
          >
            <div className="-translate-x-[1px]">
              <Close />
            </div>
          </div> */}
          <Link href="/" onClick={() => setNavOpen(!navOpen)}>
            <div className="w-[106px] scale-75  mx-auto md:w-[144px] cursor-pointer">
              <Logo />
            </div>
          </Link>
          <div className="border-t-[3px] border-t-unveilBlack mt-[60px]">
            <h4 className="b3 font-[500] mb-[10px] mt-8">Gallery</h4>
            <div className="flex flex-col gap-2">
              <Link href="/gallery">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="cursor-pointer underline-on-hover s2"
                >
                  Gallery
                </p>
              </Link>
              <Link href="/people">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="cursor-pointer underline-on-hover s2"
                >
                  Artists
                </p>
              </Link>
              <Link href="/gallery">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="cursor-pointer underline-on-hover s2"
                >
                  Collections
                </p>
              </Link>
              <Link href="/people">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="cursor-pointer underline-on-hover s2"
                >
                  Curators
                </p>
              </Link>
            </div>

            <h4 className="b3 font-[500] mb-[10px] mt-8">Discover</h4>
            <div className="flex flex-col gap-2">
              <Link href="/editorial">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="cursor-pointer underline-on-hover s2"
                >
                  Editorial
                </p>
              </Link>
              <Link href="/">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="cursor-pointer underline-on-hover s2"
                >
                  New to arto
                </p>
              </Link>
              <Link href="/">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="cursor-pointer underline-on-hover s2"
                >
                  New to NFTs
                </p>
              </Link>
            </div>

            <div className="flex flex-col gap-[2px]">
              <h4 className="mt-8 b3 w-fit underline-on-hover">My account</h4>
              <h4 className="b3 w-fit underline-on-hover">Wishlist</h4>
              <h4 className="b3 w-fit underline-on-hover]">About Unveil</h4>
            </div>

            <h4 className="b3 font-[500] mb-1 mt-16">Join unveil</h4>
            <div className="flex b3 gap-2 text-[#545454]">
              <p className="underline-on-hover">Artist</p>
              <p>|</p>
              <p className="underline-on-hover">Gallery or Curator</p>
            </div>

            {/* <div className="grid grid-cols-2 border-b border-b-bgColorHover">
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
            </div> */}
          </div>
          {/* <button
            className="mt-10 btn btn-lg btn-full btn-primary btn-big"
            onClick={() => setAccessOpen(!accessOpen)}
          >
            Request access
          </button> */}
          {/* {navWarning && (
            <p className="text-center b3 mt-[15px]">{navWarning}</p>
          )} */}
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
