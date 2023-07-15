export interface Data {
  name: string;
  component: EDataComponent;
  type: string;
  key: string;
  layout: number[];
}

export enum EDataComponent {
  METRICS = "metrics",
  EVENTS = "events",
  DIMENSIONS = "dimensions",
  CHARTS = "charts",
}
