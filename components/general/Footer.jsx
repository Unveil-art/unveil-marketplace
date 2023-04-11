import React from "react";

import SmallLogo from "../svg/SmallLogo";

const Footer = () => {
  return (
    <footer className="grid-cols-2 p-[15px] md:p-10 md:grid bg-black text-unveilWhite">
      <div className="md:py-10 md:border-r border-opacity-20 border-r-unveilWhite">
        <p className="hidden border md:block l2 w-fit border-unveilBlack rounded-[60px] px-2">
          About unveil
        </p>
        <h4 className="mt-4 mb-8 md:mb-0 md:mt-8 h3">
          A community driven curated art photography platform.
        </h4>
      </div>
      <div className="grid grid-cols-2 md:pl-[8vw] py-10 space-x-6">
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="font-[500] b3">Discover</p>
            <p className="b3">Artworks</p>
            <p className="b3">Curators</p>
          </div>
          <div className="space-y-1">
            <p className="b3 font-[500]">About Unveil</p>
            <p className="b3">About</p>
            <p className="b3">Contact us</p>
          </div>
          <div className="space-y-1">
            <p className="b3 font-[500]">Currency</p>
            <p className="b3">Polygon/USD</p>
          </div>
          <div className="space-y-1">
            <p className="b3 font-[500]">Join Unveil</p>
            <p className="b3">As artist</p>
            <p className="b3">As curator</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="b3 font-[500]">Support</p>
            <p className="b3">Artworks</p>
            <p className="b3">Releases</p>
            <p className="b3">What is an NFT</p>
            <p className="b3">Shipping</p>
            <p className="b3">Wallet</p>
            <p className="b3">FAQ</p>
            <p className="b3">Terms & conditions</p>
            <p className="b3">Cookie policy</p>
          </div>
          <div className="space-y-1">
            <p className="b3 font-[500]">Follow us</p>
            <p className="b3">Instagram</p>
            <p className="b3">Twitter</p>
            <p className="b3">Discord</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center col-span-2 mt-[60px] md:mt-[160px]">
        <SmallLogo />
      </div>
    </footer>
  );
};

export default Footer;
