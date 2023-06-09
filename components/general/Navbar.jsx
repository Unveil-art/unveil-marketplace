import { gsap } from "gsap";
import { useRef, useState, useEffect, useContext } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";

import Logo from "../svg/Logo";
import Account from "../svg/Account";
import NavbarPopIn from "../pop-in/NavbarPopIn";
import LoginPopIn from "../pop-in/LoginPopIn";
import LoggedInPopIn from "../pop-in/LoggedInPopIn";
import Arrow from "@/components/svg/Arrow";
import { StepContext } from "@/contexts/StepContext";
import { Web3Context } from "@/contexts/Web3AuthContext";
import { getHomePage } from "../../lib/strapi";

const Navbar = ({ value }) => {
  const { login, logout, email } = useContext(Web3Context);
  const el = useRef();
  const [loggedIn, setLoggedIn] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const router = useRouter();

  const isArrow =
    router.asPath === "/checkout" ||
    router.asPath.startsWith("/gallery/artwork/") ||
    router.asPath.startsWith("/gallery/collection/");

  const { step, setStep } = useContext(StepContext);

  const handleOpen = (setState, state) => {
    setState(!state);
  };
  const [navWarning, setNavWarning] = useState(null);

  useEffect(() => {
    getHomePage().then((result) =>
      setNavWarning(result.data[0].attributes.page9.navigation_footer_text)
    );
  }, []);

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
        className="fixed top-0 left-0 z-40 flex items-center justify-between w-full px-[15px] pt-[15px] md:pt-[32px] md:px-10"
      >
        {!isArrow && (
          <div
            onClick={() => handleOpen(setNavOpen, navOpen)}
            className="relative  w-[20px] md:w-[31px] h-[12px] group cursor-pointer"
          >
            <div className="w-full h-[3px] bg-unveilBlack absolute top-0 unveilTransition group-hover:w-[85%]"></div>
            <div className="w-full h-[3px] bg-unveilBlack absolute bottom-0 unveilTransition group-hover:w-[115%]"></div>
          </div>
        )}
        {isArrow && (
          <div
            className="rotate-180 cursor-pointer"
            onClick={() => {
              if (step === 1) {
                router.back();
              } else {
                setStep(step - 1);
              }
            }}
          >
            <Arrow />
          </div>
        )}

        <Link href="/">
          <div className="w-[106px] md:w-[144px] cursor-pointer">
            <Logo />
          </div>
        </Link>
        {value && (
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
        )}
      </nav>
      <NavbarPopIn
        navWarning={navWarning}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
      />
      {!value && (
        <LoginPopIn loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
      )}
      {value && <LoggedInPopIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
    </>
  );
};

export default Navbar;
