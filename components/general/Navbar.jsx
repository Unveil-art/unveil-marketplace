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
import { useWindowSize } from "@/hooks/useWindowSize";
import { useLenis } from "@studio-freight/react-lenis";
import Inbox from "../svg/Inbox";
import InboxPopIn from "../pop-in/InboxPopIn";

const Navbar = ({ value }) => {
  const { login, logout, email, session } = useContext(Web3Context);
  const el = useRef();
  const query = gsap.utils.selector(el);
  const [loggedIn, setLoggedIn] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const router = useRouter();
  const { step, setStep, color: colorBoolean } = useContext(StepContext);
  const path = router.asPath;
  const [unreadCount, setUnreadCount] = useState(0);
  const { width } = useWindowSize();

  let color, accountColor;
  if (
    (path.includes("/gallery/artwork/") || path.includes("/claim-nft")) &&
    colorBoolean
  ) {
    if (width < 768) {
      accountColor = "#F9F7F2";
    } else {
      accountColor = "#141414";
    }
    color = "#F9F7F2";
  } else {
    color = step === 4 || step === 5 ? "#F9F7F2" : "#141414";
    accountColor = step === 4 || step === 5 ? "#F9F7F2" : "#141414";
  }

  if (path === "/" && colorBoolean) {
    accountColor = "#F9F7F2";
    color = "#F9F7F2";
  }

  const isArrow =
    (router.asPath === "/checkout" && step !== 4) ||
    router.asPath.startsWith("/gallery/artwork/") ||
    router.asPath.startsWith("/gallery/collection/");

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
    if (session) {
      session.unreads.onChange((unReadConversations) => {
        const unReadMessages = unReadConversations.length;
        setUnreadCount(unReadMessages);
      });
    }
  }, [session]);

  useLenis(({ direction }) => {
    const hide = query(".gsap-hide");
    if (direction === 1) {
      gsap.to(hide, { autoAlpha: 0, duration: 0.4 });
    } else if (direction === -1) {
      gsap.to(hide, { autoAlpha: 1, duration: 0.4 });
    }
  }, []);

  useEffect(() => {
    const isHome = Router.route === "/";

    if (isHome) {
      const stagger = gsap.utils.toArray(".gsap-menu-stagger");

      gsap.fromTo(
        el.current,
        {
          autoAlpha: 1,
        },
        {
          display: "block",
          autoAlpha: 1,
          ease: "none",
        }
      );

      gsap.fromTo(
        stagger,
        {
          autoAlpha: 1,
          y: -80,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "none",
          stagger: {
            amount: 0.3,
          },
        }
      );
    } else {
      gsap.fromTo(
        el.current,
        {
          autoAlpha: 0,
        },
        {
          display: "block",
          autoAlpha: 1,
          duration: 0.4,
          ease: "none",
        }
      );
    }
  }, []);

  useEffect(() => {
    setStep(1);
  }, [router.asPath]);

  return (
    <>
      <nav
        ref={el}
        className="fixed hidden top-0 left-0 z-40 flex items-center justify-between w-full px-[15px] pt-[15px] md:pt-[32px] md:px-10"
      >
        {/* <div className="fixed flex justify-center items-center top-0 left-0  w-full bg-[#B2B4AE] unveilTransition">
          <p className="text center b3">
            28th of June we’re going live early access card holders.{" "}
            <a href="https://earlyaccess.unveil.art/" target="_blank" className="leading-4 underline-on-hover md:leading-5">Get access</a>
          </p>
        </div> */}
        <div className="relative flex items-center justify-between w-full">
          <div className="flex items-center">
            {!isArrow && (
              <div
                onClick={() => handleOpen(setNavOpen, navOpen)}
                className="relative mt-2 md:mt-0 w-[20px] md:w-[31px] h-[12px] group cursor-pointer gsap-menu-stagger"
              >
                <div
                  style={{ backgroundColor: color }}
                  className={`w-full h-[3px]  absolute top-0 unveilTransition group-hover:w-[85%]`}
                ></div>
                <div
                  style={{ backgroundColor: color }}
                  className={`w-full h-[3px] bg-unveilBlack absolute bottom-0 unveilTransition group-hover:w-[115%]`}
                ></div>
              </div>
            )}
            {isArrow && (
              <div
                className="rotate-180 cursor-pointer gsap-menu-stagger"
                onClick={() => {
                  if (step === 1) {
                    router.back();
                  } else {
                    setStep(step - 1);
                  }
                }}
              >
                <Arrow color={color} />
              </div>
            )}
            <div className="xl:flex items-center ml-14 gap-6 hidden">
              <Link
                href="/gallery?print"
                className="underline-on-hover uppercase b6 leading-tight inline-block relative tracking-[0.77px] gsap-menu-stagger gsap-hide"
                style={{ color }}
              >
                Prints Editions
              </Link>

              <Link
                href="/gallery?digital"
                className="underline-on-hover uppercase b6 leading-tight inline-block relative tracking-[0.77px] gsap-menu-stagger gsap-hide"
                style={{ color }}
              >
                Digital Editions
              </Link>
            </div>
          </div>

          <Link href="/">
            <div className="w-[106px] md:w-[144px] top-2 md:top-0 left-1/2 -translate-x-1/2 absolute cursor-pointer">
              <span className="gsap-menu-stagger inline-block w-full">
                <Logo color={color} />
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4 lg:gap-6">
            {/* {value && <div
              onClick={() => handleOpen(setInboxOpen, inboxOpen)}
              className="z-40 relative mt-2 scale-75 cursor-pointer md:mt-0 md:scale-100"
            >
              <Inbox width={35} height={35} color={accountColor} />
              {unreadCount>0 && <div className="bg-red-500 absolute -top-2 -right-2 p-1 text-white text-xs rounded-full px-2">{unreadCount > 99 ? "99+": unreadCount}</div>}
            </div>} */}

            <div className="xl:flex items-center mr-8 gap-4 hidden gsap-menu-stagger">
              <a
                href="https://learn.unveil.art/"
                target="_blank"
                className="underline-on-hover uppercase b6 leading-tight inline-block relative tracking-[0.77px] gsap-hide"
                style={{ color: accountColor }}
              >
                How it works
              </a>

              <a
                href="https://learn.unveil.art/about"
                target="_blank"
                className="underline-on-hover uppercase b6 leading-tight inline-block relative tracking-[0.77px] gsap-menu-stagger gsap-hide"
                style={{ color: accountColor }}
              >
                About
              </a>
              <Link
                href="/search"
                className="underline-on-hover uppercase b6 leading-tight inline-block relative tracking-[0.77px] gsap-menu-stagger gsap-hide"
                style={{ color: accountColor }}
              >
                Search
              </Link>
              {/* Hardcoded */}
            </div>

            {value && (
              <div
                onClick={() => handleOpen(setLoggedIn, loggedIn)}
                className="z-40 mt-2 scale-75 cursor-pointer md:mt-0 md:scale-100 gsap-menu-stagger"
              >
                <Account color={accountColor} />
              </div>
            )}

            {!value && (
              <div
                onClick={() => handleOpen(setLoginOpen, loginOpen)}
                className="z-40 mt-2 cursor-pointer md:mt-0 gsap-menu-stagger"
              >
                <p
                  style={{ color: accountColor }}
                  className={`b3 !text-[14px] font-[500]`}
                >
                  Sign in
                </p>
              </div>
            )}
          </div>
        </div>
      </nav>
      <NavbarPopIn
        navWarning={navWarning}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
      />
      {!value && (
        <LoginPopIn loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
      )}
      {/* {value && <InboxPopIn inboxOpen={inboxOpen} setInboxOpen={setInboxOpen} /> } */}
      {value && <LoggedInPopIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
    </>
  );
};

export default Navbar;
