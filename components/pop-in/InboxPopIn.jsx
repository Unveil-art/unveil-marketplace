import { useEffect, useRef, useContext } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Web3Context } from "@/contexts/Web3AuthContext";
import Link from "next/link";
import RPC from "lib/RPC";
import Loader from "../svg/Loader";
import Arrow from "../svg/Arrow";

const InboxPopIn = ({ setInboxOpen, inboxOpen }) => {
  const { value: localProvider } = useLocalStorage("tw:provider:connectors");
  const { value: wallet } = useLocalStorage("walletAddress");
  const { session, currentUser  } = useContext(Web3Context);
    const inboxRef = useRef();
  const el = useRef();

  useEffect(() => {
    if(session){
        const inbox = session.createInbox();
        inbox.mount(inboxRef.current)
    }
  }, [session]);

  useAsideAnimation(el, inboxOpen);

  return (
    <>
      <section
        ref={el}
        className="fixed z-50 invisible w-full h-screen overflow-hidden"
      >
        <div
          data-lenis-prevent
          className="gsap-el fixed overflow-y-scroll  top-0 right-0 w-[100vw]  md:w-[540px]  bg-[#ECE8DE] px-5 py-10 z-50 rounded-b-[20px] rounded-tl-[20px]"
        >
          <h3 className="relative text-center h2 mb-[10px] mt-[10px] mx-auto">
            <div onClick={() => setInboxOpen(false)} className="absolute cursor-pointer rotate-180 left-2 top-4">
              <Arrow />
            </div>
              INBOX
        </h3>
        <div className="w-full my-7 md:h-[5px] h-[3px] bg-unveilBlack"></div>

       <div className="h-[70vh] ">
       <div ref={inboxRef} className="min-h-max h-full" >
       <div className="h-[25px] flex flex-col justify-center my-20 animate-spin  items-center">
                <Loader color="#000000" size={25}  />
        </div>
       </div>
       </div>

        </div>
        <div
          onClick={() => setInboxOpen(false)}
          className="fixed top-0 left-0 invisible w-full h-screen gsap-layer bg-unveilGrey"
        ></div>
      </section>
    </>
  );
};

export default InboxPopIn;
