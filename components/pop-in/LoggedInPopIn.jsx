import { useEffect, useRef, useContext } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Web3Context } from "@/contexts/Web3AuthContext";
import Link from "next/link";
import RPC from "lib/RPC";

const LoggedInPopIn = ({ setLoggedIn, loggedIn }) => {
  const { value: localProvider } = useLocalStorage("tw:provider:connectors");
  const { value: wallet } = useLocalStorage("walletAddress");
  const { balance, logout, getBalance, showRamper } = useContext(Web3Context);

  const el = useRef();

  useEffect(() => {
    getBalance();
  }, []);

  useAsideAnimation(el, loggedIn);

  return (
    <>
      <section
        ref={el}
        className="fixed z-50 invisible w-full h-screen overflow-hidden"
      >
        <div
          data-lenis-prevent
          className="gsap-el fixed overflow-y-scroll top-0 right-0 w-[330px] sm:w-[540px]  bg-[#ECE8DE] px-5 py-10 z-50 rounded-b-[20px] rounded-tl-[20px] h-fit"
        >
          <div className="mt-[80px]">
            <div className="w-full md:h-[5px] h-[3px] bg-unveilBlack"></div>
            <h3 className="text-center h2 mb-[80px] mt-[60px] mx-auto">
              Wallet connected
            </h3>
            <div className="grid grid-cols-2 text-center border-y border-bgColorHover">
              <div className="py-10 border-r my-[10px] border-bgColorHover">
                <p className=" b3">Account name</p>
                <p className="px-5 truncate md:px-14 l2">
                  {wallet?.slice(0, 4)}...{wallet?.slice(-4)}
                </p>
              </div>
              <div className="py-10 my-[10px] border-bgColorHover">
                <p className="b3">Funds</p>
                <p className=" l2">{balance}</p>
              </div>
            </div>
            <div className="text-center pt-5 my-[10px]">
              <Link href="/account?contact-details">
                <button
                  onClick={() => setLoggedIn(false)}
                  className="mt-2 cursor-pointer b3 btn btn-secondary btn-full btn-lg"
                >
                  Add funds
                </button>
              </Link>
              <button
                className="mt-2 cursor-pointer b3 btn btn-secondary btn-full btn-lg"
                onClick={() => showRamper()}
              >
                Purchase funds
              </button>
              <p className=" l2">
                {localProvider && (
                  <>{localProvider.replace('"', "").replace('"', "")}</>
                )}
              </p>
            </div>
            <Link href="/account">
              <button
                onClick={() => setLoggedIn(false)}
                className=" btn btn-lg btn-full btn-primary"
              >
                My account
              </button>
            </Link>
            <p
              onClick={() => logout()}
              className="block mx-auto mt-5 text-center cursor-pointer underline-on-hover w-fit b3"
            >
              Disconnect
            </p>
          </div>
        </div>
        <div
          onClick={() => setLoggedIn(false)}
          className="fixed top-0 left-0 invisible w-full h-screen gsap-layer bg-unveilGrey"
        ></div>
      </section>
    </>
  );
};

export default LoggedInPopIn;
