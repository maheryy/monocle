import { Data, EDataComponent } from "@/types/data";

const data: Data[] = [
  {
    name: "Largest contentful Paint",
    component: EDataComponent.METRICS,
    type: "metrics",
    key: "LCP",
    layout: [0, 0, 1, 1],
  },
  {
    name: "First Input Delay",
    component: EDataComponent.EVENTS,
    type: "metrics",
    key: "FID",
    layout: [1, 0, 1, 1],
  },
  {
    name: "Cumulative Layout Shift",
    component: EDataComponent.METRICS,
    type: "metrics",
    key: "CLS",
    layout: [0, 1, 1, 1],
  },
  {
    name: "First Contentful Paint",
    component: EDataComponent.METRICS,
    type: "metrics",
    key: "FCP",
    layout: [1, 1, 1, 1],
  },
  {
    name: "Time to Interactive",
    component: EDataComponent.METRICS,
    type: "metrics",
    key: "TTI",
    layout: [2, 0, 1, 1],
  },
  {
    name: "Speed Index",
    component: EDataComponent.METRICS,
    type: "metrics",
    key: "SI",
    layout: [2, 1, 1, 1],
  },
  {
    name: "Total Blocking Time",
    component: EDataComponent.EVENTS,
    type: "metrics",
    key: "TBT",
    layout: [3, 0, 1, 1],
  },
  {
    name: "DomContentLoaded",
    component: EDataComponent.METRICS,
    type: "metrics",
    key: "DCL",
    layout: [3, 1, 1, 1],
  },
  {
    name: "PageView",
    component: EDataComponent.EVENTS,
    type: "events",
    key: "PageView",
    layout: [4, 0, 1, 1],
  },
  {
    name: "UserAgent",
    component: EDataComponent.METRICS,
    type: "dimensions",
    key: "UserAgent",
    layout: [4, 1, 1, 1],
  },
];

export default data;
