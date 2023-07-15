import { AppProps } from "next/app";
import "../styles/index.css";
import { Router } from "next/router";
import monocle from "../lib/monocle";
import { useEffect } from "react";

Router.events.on("routeChangeComplete", (url) => {
  monocle.page(url);
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const mouseTracker = monocle.mouse();
  useEffect(() => {
    monocle.vitals();
    mouseTracker.subscribe();

    return () => {
      mouseTracker.unsubscribe();
    };
  }, []);

  return <Component {...pageProps} />;
}
