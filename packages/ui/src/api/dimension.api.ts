import api from ".";

export interface GetStats {
  [k: string]: {
    count: number;
    percentage: number;
  };
}

export const getDimensionUserAgent = async (): Promise<GetStats> => {
  return api.get("/dimensions/user-agents/stats").json();
};

export const getDimensionPageView = async (): Promise<GetStats> => {
  return api.get("/dimensions/page-views/stats").json();
};
