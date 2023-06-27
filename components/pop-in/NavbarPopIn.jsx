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
            <div className="absolute cursor-pointer top-8 left-10">
              <Search />
            </div>
          </Link>

          <div className="border-t-[3px] md:border-t-[5px] border-t-unveilBlack mt-[55px] md:mt-[50px]">
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
              <Link href="/gallery?collections">
                <p
                  onClick={() => setNavOpen(!navOpen)}
                  className="cursor-pointer underline-on-hover s2"
                >
                  Collections
                </p>
              </Link>
              <Link href="/people?curators">
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
                  New to collecting art
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
              <Link href="/account">
                <h4
                  onClick={() => setNavOpen(!navOpen)}
                  className="mt-8 b3 w-fit underline-on-hover"
                >
                  My account
                </h4>
              </Link>
              <Link href="/account?wishlist">
                <h4
                  onClick={() => setNavOpen(!navOpen)}
                  className="b3 w-fit underline-on-hover"
                >
                  Wishlist
                </h4>
              </Link>
              <Link href="/gallery">
                <h4
                  onClick={() => setNavOpen(!navOpen)}
                  className="b3 w-fit underline-on-hover"
                >
                  About Unveil
                </h4>
              </Link>
            </div>

            <h4 className="b3 font-[500] mb-1 mt-[100px]">Join unveil</h4>
            <div className="flex b3 gap-2 text-[#545454]">
              <p className="underline-on-hover">Artist</p>
              <p>|</p>
              <p className="underline-on-hover">Gallery or Curator</p>
            </div>
          </div>
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
