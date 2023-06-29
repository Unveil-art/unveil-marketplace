import React, { useState, useEffect } from "react";
import Link from "next/link";

import SmallLogo from "../svg/SmallLogo";
import { getFooter } from "lib/strapi";
import { Freshchat } from "reactjs-freshchat";
import "reactjs-freshchat/dist/index.css";

const Footer = () => {
  const [footers, setFooters] = useState(null);
  const [showSupport, setShowSupport] = useState(false);

  useEffect(() => {
    getFooter().then((result) => setFooters(result));
  }, []);

  return (
    <footer className="grid-cols-2 p-[15px] md:p-10 md:grid bg-black text-unveilWhite">
      <div className="md:py-10 md:border-r border-opacity-20 border-r-unveilWhite">
        <p className="hidden border md:block l2 w-fit border-unveilBlack rounded-[60px] px-2">
          About unveil
        </p>
        <h4 className="mt-4 mb-8 mr-5 md:mb-0 md:mt-8 h3">
          A community driven curated art photography platform.
        </h4>
      </div>
      <div className="grid grid-cols-2 md:pl-[8vw] py-10 space-x-6">
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="font-[500] b3">Discover</p>
            <Link href="/gallery">
              <p className="block w-fit b3 underline-on-hover underline-on-hover-white">
                Artworks
              </p>
            </Link>
            <Link href="/people?curators">
              <p className="block w-fit b3 underline-on-hover underline-on-hover-white">
                Curators
              </p>
            </Link>
          </div>
          <div className="space-y-1 ">
            <p className="b3 w-fit underline-on-hover underline-on-hover-white font-[500]">
              About Unveil
            </p>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://learn.unveil.art/about"
            >
              <p className="block b3 w-fit underline-on-hover underline-on-hover-white">
                About
              </p>
            </a>
            <p
              onClick={() => setShowSupport((prev) => !prev)}
              className="block cursor-pointer b3 w-fit underline-on-hover underline-on-hover-white"
            >
              Contact us
            </p>
          </div>
          <div className="space-y-1">
            <p className="b3 font-[500]">Currency</p>
            <p className="b3">ETH/USD</p>
          </div>
          {footers && (
            <>
              {footers.data && (
                <div className="md:space-y-1">
                  <p className="b3 font-[500]">
                    {footers.data[0].attributes.footer.category}
                  </p>
                  {footers.data[0].attributes.footer.data.map((item, i) => (
                    <div key={i} className="block h-fit">
                      <a target="_blank" rel="noreferrer" href={item.link}>
                        <p className="underline-on-hover-white b3 underline-on-hover">
                          {item.heading}
                        </p>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <div className="md:space-y-6">
          {footers && (
            <>
              {footers.data && (
                <div className="md:space-y-1">
                  <p className="b3 font-[500]">
                    {footers.data[1].attributes.footer.category}
                  </p>
                  {footers.data[1].attributes.footer.data.map((item, i) => (
                    <div key={i} className="block h-fit">
                      {/* <a target="_blank" rel="noreferrer" href={item.link}> */}
                      <Link href="/account">
                        <p className="underline-on-hover-white b3 underline-on-hover">
                          {item.heading}
                        </p>
                      </Link>
                      {/* </a> */}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {footers && (
            <>
              {footers.data && (
                <div className="mt-5 md:space-y-1">
                  <p className="b3 font-[500]">
                    {footers.data[2].attributes.footer.category}
                  </p>
                  {footers.data[2].attributes.footer.data.map((item, i) => (
                    <div key={i} className="block h-fit">
                      <a target="_blank" rel="noreferrer" href={item.link}>
                        <p className="underline-on-hover-white b3 underline-on-hover">
                          {item.heading}
                        </p>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center col-span-2 mt-[60px] md:mt-[160px]">
        <SmallLogo />
      </div>
      {showSupport && (
        <Freshchat
          token="4e15aa79-e9f2-4795-b236-62a30db78e31"
          open={true}
          ic_styles={{
            backgroundColor: "#F9F7F2",
            color: "#000000",
          }}
        />
      )}
    </footer>
  );
};

export default Footer;
