import { AppProps } from "next/app";
import "../styles/index.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  MonocleProvider,
  useEvent,
  useMouseTracker,
  usePageView,
  useWebVitals,
} from "@monocle/react";

const APP_NAME = "blog";
const MONOCLE_ID = "MCL-XXXXXX";
const MONOCLE_HOST = "http://localhost:3000";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MonocleProvider app={APP_NAME} identifier={MONOCLE_ID} host={MONOCLE_HOST}>
      <Component {...pageProps} />;
      <TestComponent />
    </MonocleProvider>
  );
};

const TestComponent = () => {
  const router = useRouter();
  const { subscribe, unsubscribe } = useMouseTracker();
  const { capture } = useWebVitals();
  const { pageView } = usePageView();
  const { event } = useEvent();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageView(url);

      if (url === "/") {
        event("home", {
          random: Math.random(),
          time: new Date().toISOString(),
        });
      }
    };
    capture();
    subscribe();
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      unsubscribe();
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return <div></div>;
};

export default MyApp;
