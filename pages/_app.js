import "../styles/globals.css";

import { useEffect } from "react";
import Router from "next/router";
import { Lenis, useLenis } from "@studio-freight/react-lenis";
import { HistoryProvider } from "../contexts/History";
import Layout from "../components/general/Layout";
import Web3AuthProvider from "@/contexts/Web3AuthContext";
import { StepProvider } from "@/contexts/StepContext";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const lenis = useLenis();

  useEffect(() => {
    function onHashChangeStart(url) {
      url = "#" + url.split("#").pop();
      lenis.scrollTo(url);
    }

    Router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      Router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [lenis]);

  return (
    <Web3AuthProvider>
      <StepProvider>
        <Layout>
          <HistoryProvider>
            <Lenis
              root
              options={{
                lerp: 0.2,
                smoothWheel: true,
                smoothTouch: false,
              }}
            >
              <Component {...pageProps} />
            </Lenis>
          </HistoryProvider>
        </Layout>
      </StepProvider>
    </Web3AuthProvider>
  );
}

export default MyApp;
