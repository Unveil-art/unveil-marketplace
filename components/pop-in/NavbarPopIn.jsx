import React, { useRef, useState } from "react";
import Link from "next/link";

import { useRLsideAnimation } from "../../hooks/animations/useRLsideAnimation";
import Logo from "../svg/Logo";
import Close from "../svg/Close";
import Search from "../svg/Search";
import AccessPopIn from "./AccessPopIn";

const NavbarPopIn = ({ navOpen, setNavOpen }) => {
  const [accessOpen, setAccessOpen] = useState(false);
  const el = useRef();

  useRLsideAnimation(el, navOpen);

  return (
    <>
      <section
        ref={el}
        className="fixed z-50 invisible w-full h-screen overflow-hidden"
      >
        <div className="gsap-el fixed overflow-y-scroll top-0 left-0 w-full sm:w-[540px]  bg-[#ECE8DE] px-5 py-10 z-50 rounded-br-[20px] h-screen sm:h-fit">
          <Link href="/search">
            <div className="absolute cursor-pointer top-10 left-5">
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
          <Link href="/">
            <div className="w-[106px] mx-auto md:w-[144px] cursor-pointer">
              <Logo />
            </div>
          </Link>
          <div className="border-t-[3px] border-t-unveilBlack mt-[60px]">
            <div className="grid grid-cols-2 border-b border-b-bgColorHover">
              <Link href="/gallery">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="text-center border-r cursor-pointer border-r-bgColorHover py-[25px] my-[15px]"
                >
                  Gallery
                </p>
              </Link>
              <Link href="/gallery">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="text-center py-[25px] cursor-pointer my-[15px]"
                >
                  Collections
                </p>
              </Link>
            </div>
            <div className="grid grid-cols-2 border-b border-b-bgColorHover">
              <Link href="/">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="text-center border-r cursor-pointer border-r-bgColorHover py-[25px] my-[15px]"
                >
                  Artists
                </p>
              </Link>
              <Link href="/">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="text-center py-[25px] cursor-pointer my-[15px]"
                >
                  Curators
                </p>
              </Link>
            </div>
            <div className="grid grid-cols-2 border-b border-b-bgColorHover">
              <Link href="/editorial">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="text-center border-r cursor-pointer border-r-bgColorHover py-[25px] my-[15px]"
                >
                  Journal
                </p>
              </Link>
              <Link href="/">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="text-center py-[25px] cursor-pointer my-[15px]"
                >
                  Learn
                </p>
              </Link>
            </div>
            <div className="grid grid-cols-2 ">
              <Link href="/account">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="text-center border-r cursor-pointer border-r-bgColorHover py-[25px] my-[15px]"
                >
                  Account
                </p>
              </Link>
              <Link href="/">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="text-center py-[25px] cursor-pointer my-[15px]"
                >
                  About
                </p>
              </Link>
            </div>
          </div>
          <button
            className="mt-10 btn btn-full btn-primary btn-big"
            onClick={() => setAccessOpen(!accessOpen)}
          >
            Request access
          </button>
          <p className="text-center b3 mt-[15px]">
            <strong>Warning</strong> Lorem ipsum dolor sit
          </p>
        </div>
        <div
          onClick={() => setNavOpen(!navOpen)}
          className="fixed top-0 left-0 invisible w-full h-screen gsap-layer bg-unveilGrey"
        ></div>
      </section>
      <AccessPopIn setAccessOpen={setAccessOpen} accessOpen={accessOpen} />
    </>
  );
};

export default NavbarPopIn;
