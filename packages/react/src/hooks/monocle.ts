import { MonocleClient } from "@monocle/browser";
import { createContext, useContext } from "react";

export const MonocleContext = createContext<MonocleContext>(null!);

export const useMonocle = () => {
  const context = useContext(MonocleContext);

  if (!context) {
    throw new Error(
      "Cannot use this Monocle hook outside of a `MonocleProvider`. Did you forget to wrap your app in a provider ?"
    );
  }

  return context;
};

interface MonocleContext {
  monocle: MonocleClient;
}
