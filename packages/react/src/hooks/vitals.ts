import { useMonocle } from "./monocle";

export const useWebVitals = () => {
  const { monocle } = useMonocle();
  const capture = () => monocle.vitals();

  return { capture };
};
