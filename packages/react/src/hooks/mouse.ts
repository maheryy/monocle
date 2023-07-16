import { useMonocle } from "./monocle";

export const useMouseTracker = () => {
  const { monocle } = useMonocle();
  const mouseTracker = monocle.mouse();
  const subscribe = () => mouseTracker.subscribe();
  const unsubscribe = () => mouseTracker.unsubscribe();

  return { subscribe, unsubscribe };
};
