import { gsap } from "gsap";
import { useRef, useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";

import Logo from "../svg/Logo";
import Account from "../svg/Account";

const Navbar = () => {
  const el = useRef();
  const [navOpen, setNavOpen] = useState(false);

  const handleOpen = () => {
    setNavOpen(!navOpen);
    console.log(navOpen);
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
    <nav
      ref={el}
      className="fixed top-0 left-0 z-40 flex items-center justify-center w-full px-[15px] pt-[15px] md:pt-[32px] md:px-10"
    >
      {/* TODO: hidden menu for live */}
      {/* <div
        onClick={() => handleOpen()}
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

      {/* TODO: hidden account for live */}
      {/* <div className="z-40 scale-75 cursor-pointer md:scale-100">
        <Account />
      </div> */}
    </nav>
  );
};

export default Navbar;
