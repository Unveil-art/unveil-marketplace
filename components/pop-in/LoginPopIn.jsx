import React, { useContext, useRef } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import { Web3Context } from "@/contexts/Web3AuthContext";
import Chat from "../reusable/Chat";

const LoginPopIn = ({ loginOpen, setLoginOpen }) => {
  const { account, web3Auth, provider, balance, login, logout, getBalance } =
    useContext(Web3Context);

  const el = useRef();

  useAsideAnimation(el, loginOpen);

  return (
    <>
      <section
        ref={el}
        className="fixed z-50 invisible w-full h-screen overflow-hidden"
      >
        <div
          data-lenis-prevent
          className="gsap-el fixed overflow-y-scroll top-0 right-0 w-[330px] sm:w-[540px]  bg-[#ECE8DE] px-5 pt-[80px] py-10 z-50 rounded-b-[20px] rounded-tl-[20px] h-fit"
        >
          <div>
            <div className="w-full h-[3px] md:h-[5px] mt-[40px] bg-unveilBlack"></div>
            <h3 className="text-center h4 my-[60px] md:max-w-[80%] mx-auto">
              Login to your account with Wallet connect
            </h3>
            <button
              className="btn btn-primary btn-full btn-lg"
              onClick={() => login()}
            >
              <p>Login/create account</p>
            </button>
            <div className="mt-[10px]">
              <Chat title="Need help with login in?" text="start chatting" />
            </div>
          </div>
        </div>
        <div
          onClick={() => setLoginOpen(false)}
          className="fixed top-0 left-0 invisible w-full h-screen gsap-layer bg-unveilGrey"
        ></div>
      </section>
    </>
  );
};

export default LoginPopIn;
