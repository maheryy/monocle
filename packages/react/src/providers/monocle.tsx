import { MonocleClient } from "@monocle/browser";
import { ReactNode, FC } from "react";
import { MonocleContext } from "../hooks";

export const MonocleProvider: FC<MonocleProviderProps> = ({
  app,
  identifier,
  url,
  children,
}) => {
  const monocle = MonocleClient.initialize({
    app: app,
    url: url,
  });

  return (
    <MonocleContext.Provider value={{ monocle }}>
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
