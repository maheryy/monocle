import { Data } from "@/types/data";
import data from "@/api/data";

export const getData = (): Promise<Data[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};
