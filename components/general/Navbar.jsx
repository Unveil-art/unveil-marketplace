import React, { useState } from "react";
import Link from "next/link";

import Logo from "../svg/Logo";
import Account from "../svg/Account";

import { variantPopIn, variantBackground } from "../../utils/animations";
import Close from "../svg/Close";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleOpen = () => {
    setNavOpen(!navOpen);
    console.log(navOpen);
  };

  return (
    <nav className="fixed top-0 left-0 z-40 flex items-center justify-between w-full px-[15px] pt-[15px] md:pt-[32px] md:px-10">
      <div
        onClick={() => handleOpen()}
        className="relative w-[20px] md:w-[31px] h-[12px] group cursor-pointer"
      >
        <div className="w-full h-[3px] bg-unveilBlack absolute top-0 unveilTransition group-hover:w-[85%]"></div>
        <div className="w-full h-[3px] bg-unveilBlack absolute bottom-0 unveilTransition group-hover:w-[115%]"></div>
      </div>
      <Link href="/">
        <div className="w-[106px] md:w-[144px] cursor-pointer">
          <Logo />
        </div>
      </Link>

      <div className="z-40 scale-75 cursor-pointer md:scale-100">
        <Account />
      </div>
    </nav>
  );
};

export default Navbar;