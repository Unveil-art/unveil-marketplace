import "../styles/globals.css";

import { useEffect } from "react";
import Router from "next/router";
import { Lenis, useLenis } from "@studio-freight/react-lenis";
import { HistoryProvider } from "../contexts/History";
import Layout from "../components/general/Layout";
import Web3AuthProvider from "@/contexts/Web3AuthContext";
import { StepProvider } from "@/contexts/StepContext";
import { AnimatePresence } from "framer-motion";
import Script from "next/script";

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
            <Script
              strategy="lazyOnload"
              id="gacdn"
              src={`https://www.googletagmanager.com/gtag/js?id=G-MP9BYYS5EQ`}
            />

            <Script id="ga" strategy="lazyOnload">
              {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MP9BYYS5EQ', {
  page_path: window.location.pathname,
  });
`}
            </Script>
            <Lenis
              root
              options={{
                lerp: 0.2,
                smoothWheel: true,
                smoothTouch: false,
              }}
            >
              <AnimatePresence>
                <div id="top-sticky-notification-container" />
              </AnimatePresence>

              <Component {...pageProps} />

              <Script
                id="HotJarAnalytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3569036,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
                }}
              />
            </Lenis>
          </HistoryProvider>
        </Layout>
      </StepProvider>
    </Web3AuthProvider>
  );
}

export default MyApp;
