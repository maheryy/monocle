import { BrowserClient } from "@monocle/browser";
import { ReactNode, FC } from "react";
import { MonocleContext } from "../hooks";

export const MonocleProvider: FC<MonocleProviderProps> = ({
  app,
  identifier,
  url,
  children,
}) => {
  const monocleInstance = new BrowserClient({
    app: app,
    url: url,
  });

  return (
    <MonocleContext.Provider value={{ monocle: monocleInstance }}>
      {children}
    </MonocleContext.Provider>
  );
};

interface MonocleProviderProps {
  app: string;
  identifier: string;
  url: string;
  children?: ReactNode;
}
