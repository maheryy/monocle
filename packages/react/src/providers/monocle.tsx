import { MonocleClient } from "@monocle/browser";
import { ReactNode, FC } from "react";
import { MonocleContext } from "../hooks";

export const MonocleProvider: FC<MonocleProviderProps> = ({
  app,
  identifier,
  host,
  children,
}) => {
  const monocle = MonocleClient.initialize({
    app,
    host,
    identifier,
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
  host: string;
  children?: ReactNode;
}
