import api from ".";

export function getMetric(name: string) {
  return api.get(`/metrics/${name}`).json();
}
