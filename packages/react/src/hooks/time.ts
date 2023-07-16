import { useMonocle } from "./monocle";

export const useTime = () => {
  const { monocle } = useMonocle();
  const time = (action: string, duration: number = performance.now()) =>
    monocle.time(action, duration);

  return { time };
};
