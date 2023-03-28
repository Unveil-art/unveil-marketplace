import "../styles/globals.css";

import { useEffect } from "react";
import Router from "next/router";
import { Lenis, useLenis } from "@studio-freight/react-lenis";
import Layout from "../components/general/Layout";

function MyApp({ Component, pageProps }) {
  const lenis = useLenis()

  useEffect(() => {
    function onHashChangeStart(url) {
      url = '#' + url.split('#').pop()
      lenis.scrollTo(url)
    }

    Router.events.on('hashChangeStart', onHashChangeStart)

    return () => {
      Router.events.off('hashChangeStart', onHashChangeStart)
    }
  }, [lenis])

  return (
    <Layout>
      <Lenis root options={{
        lerp: 0.2,
        wheelMultiplier: 0.5
      }}>
        <Component {...pageProps} />
      </Lenis>
    </Layout>
  );
}

export default MyApp;
