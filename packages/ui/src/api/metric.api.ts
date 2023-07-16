import api from ".";

export interface GetMetricResponse {
  avg: number;
  min: number;
  max: number;
}

export function getMetric(name: string): Promise<GetMetricResponse> {
  return api.get(`/metrics/${name}`).json();
}
