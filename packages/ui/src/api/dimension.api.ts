import api from ".";

export const getDimensionUserAgent = async () => {
  return api.get("/dimensions/user-agents/stats").json();
};

export const getDimensionPageView = async () => {
  return api.get("/dimensions/page-views/stats").json();
};
