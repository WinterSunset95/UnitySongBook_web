import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import '../styles/globals.css'
import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from 'next/app'
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import Loading from "../components/Loading"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname? setLoading(true) : setLoading(false)
    }
    const handleComplete = (url) => setLoading(false)
    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)
  }, [router])
  return (
    <>
      <Loading loading={loading} />
      <Component {...pageProps} />;
    </>
  ) 
};

export default App;
