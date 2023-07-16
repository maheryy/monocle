export interface Data {
  name: string;
  component: DataComponent;
  type: string;
  key: string;
  layout: number[];
  endpoint: string;
}

export enum EDataComponent {
  METRIC = "metric",
  DEVICE = "device",
  TABLE = "table",
  CHARTS = "charts",
}

type DataComponent = `${EDataComponent}`;
