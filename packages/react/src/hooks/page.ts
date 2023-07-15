import { useMonocle } from "./monocle";

export const usePageView = () => {
  const { monocle } = useMonocle();
  const pageView = (url?: string) => monocle.page(url);

  return { pageView };
};
