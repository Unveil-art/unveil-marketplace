import React, { useContext } from "react";

import Cursor from "./Cursor";
import Footer from "./Footer";
import Navbar from "./Navbar";
import useLocalStorage from "@/hooks/useLocalStorage";
import Head from "@/components/general/Head";
import AskEmail from "./AskEmail";
import { Web3Context } from "@/contexts/Web3AuthContext";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { value } = useLocalStorage("token");
  const { displayRamper, hideRamper, account,ramperAmount } = useContext(Web3Context);
  const onramper_apiKey = process.env.NEXT_PUBLIC_RAMPER_API_KEY;
  const router = useRouter();
  const path = router.asPath;

  return (
    <>
      <Head />
      <Navbar value={value} />
      {displayRamper && (
                <div
                  className="fixed left-0 top-0 z-50 flex flex-col  w-full justify-center items-center"
                  style={{
                    height: '100vh',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    hideRamper();
                  }}
                >
                  <iframe
                    src={`https://buy.onramper.com?color=266677&apiKey=${onramper_apiKey}&wallets=ETH:${account}&defaultCrypto=ETH&isAddressEditable=false&networkWallets=ETHEREUM:${account}&defaultFiat=USD&defaultAmount=${ramperAmount}`}
                    height="595px"
                    title="Onramper widget"
                    frameborder="0"
                    allow="accelerometer;
                    autoplay; camera; gyroscope; payment"
                    style={{
                      boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.1)',
                      width: '90%',
                      maxWidth: '420px',
                    }}
                  >
                    <a href="https://widget.onramper.com" target="_blank">
                      Buy crypto
                    </a>
                  </iframe>
                </div>
              )}
      <AskEmail />
      {children}
      <Cursor />
      {!path.includes("claim-nft") && <Footer />}
    </>
  );
}
