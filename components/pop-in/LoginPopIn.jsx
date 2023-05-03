import React, { useRef, useState } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import useMagic from "@/hooks/useMagic";
import Web3 from "web3";

const LoginPopIn = ({ loginOpen, setLoginOpen }) => {
  const [loading, setLoading] = useState(false);
  const { magic_connect, login, getNonce } = useMagic();
  const web3 = magic_connect ? new Web3(magic_connect.rpcProvider) : null;

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
          className="gsap-el fixed overflow-y-scroll top-0 right-0 w-full sm:w-[540px]  bg-[#ECE8DE] px-5 py-10 z-50 rounded-bl-[20px] h-screen sm:h-fit"
        >
          <div>
            <div className="w-full h-[7px] bg-unveilBlack"></div>
            <h3 className="text-center h2 mb-[80px] mt-[60px] md:max-w-[80%] mx-auto">
              Login to your account with Wallet connect
            </h3>
            <button
              className="btn btn-primary btn-full btn-lg"
              onClick={async () => {
                if (magic_connect) {
                  await web3?.eth.getAccounts(async (_, accounts) => {
                    setLoading(true);
                    const data =
                      await magic_connect.wallet.requestUserInfoWithUI();
                    if (!data.email) {
                      await magic_connect.wallet.disconnect();
                      alert("email is required");
                      setLoading(false);
                      return;
                    }
                    const nonceData = await getNonce({
                      email: data.email,
                      walletAddress: accounts[0],
                    });
                    await web3.eth.personal
                      .sign(nonceData.nonce, accounts[0], "")
                      .then((signedMessage) => {
                        login({
                          requestId: nonceData.id,
                          signature: signedMessage,
                        });
                      })
                      .then(() => {
                        setLoading(false);
                        setLoginOpen(false);
                      })
                      .catch((err) => {
                        console.log(err);
                        magic_connect.wallet.disconnect();
                        alert("Login Signature Failed");
                        setLoading(false);
                      });
                  });
                }
              }}
            >
              {!loading && <p>Login/create account</p>}{" "}
              {loading && <p>Loading</p>}
            </button>
            <div className="rounded-[10px] hover:border-unveilBlack col-span-2 md:col-span-1 flex overflow-hidden mt-[10px] bg-bgColor text-left w-full md:w-w-fuill cursor-pointer">
              <div className="h-[57px] md:h-[68px] bg-unveilGreen aspect-square relative overflow-hidden"></div>
              <div className="md:py-[8px] px-[12px] py-[6px] md:px-[16px] ">
                <p className="font-bold b4">Need help with login in?</p>
                <p className="truncate b5">Start chatting.</p>
              </div>
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
