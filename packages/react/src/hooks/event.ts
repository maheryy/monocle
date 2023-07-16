import { useMonocle } from "./monocle";

export const useEvent = () => {
  const { monocle } = useMonocle();
  const event = (action: string, data: Record<string, unknown>) =>
    monocle.event(action, data);

  return { event };
};
