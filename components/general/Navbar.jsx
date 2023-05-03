import { gsap } from "gsap";
import { useRef, useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";

import Logo from "../svg/Logo";
import Account from "../svg/Account";
import NavbarPopIn from "../pop-in/NavbarPopIn";
import LoginPopIn from "../pop-in/LoginPopIn";
import LoggedInPopIn from "../pop-in/LoggedInPopIn";

const Navbar = ({ magic_connect, value }) => {
  const el = useRef();
  const [loggedIn, setLoggedIn] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleOpen = (setState, state) => {
    setState(!state);
  };

  useEffect(() => {
    const delay = Router.route === "/" ? 2.5 : 0.0;
    gsap.fromTo(
      el.current,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.4,
        ease: "none",
        delay,
      }
    );
  }, []);

  return (
    <>
      <nav
        ref={el}
        className="fixed top-0 left-0 z-40 flex items-center justify-center w-full px-[15px] pt-[15px] md:pt-[32px] md:px-10"
      >
        {/* <div
          onClick={() => handleOpen(setNavOpen, navOpen)}
          className="relative  w-[20px] md:w-[31px] h-[12px] group cursor-pointer"
        >
          <div className="w-full h-[3px] bg-unveilBlack absolute top-0 unveilTransition group-hover:w-[85%]"></div>
          <div className="w-full h-[3px] bg-unveilBlack absolute bottom-0 unveilTransition group-hover:w-[115%]"></div>
        </div> */}

        <Link href="/">
          <div className="w-[106px] md:w-[144px] cursor-pointer">
            <Logo />
          </div>
        </Link>
        {/* {value && (
          <div
            onClick={() => handleOpen(setLoggedIn, loggedIn)}
            className="z-40 scale-75 cursor-pointer md:scale-100"
          >
            <Account />
          </div>
        )}

        {!value && (
          <div
            onClick={() => handleOpen(setLoginOpen, loginOpen)}
            className="z-40 scale-75 cursor-pointer md:scale-100"
          >
            <Account />
          </div>
        )} */}
      </nav>
      {/* <NavbarPopIn navOpen={navOpen} setNavOpen={setNavOpen} />
      {!value && (
        <LoginPopIn loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
      )}
      {value && <LoggedInPopIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} */}
    </>
  );
};

export default Navbar;
