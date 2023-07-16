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
    component: EDataComponent.METRICS,
    type: "metrics",
    key: "FID",
    layout: [1, 0, 1, 1],
  },
  {
    name: "Interaction to Next Paint",
    component: EDataComponent.METRICS,
    type: "metrics",
    key: "INP",
    layout: [2, 0, 1, 1],
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
    name: "Time to first byte",
    component: EDataComponent.METRICS,
    type: "metrics",
    key: "TTFB",
    layout: [2, 1, 1, 1],
  },
  {
    name: "PageView",
    component: EDataComponent.DIMENSIONS,
    type: "dimensions",
    key: "PageView",
    layout: [0, 2, 2, 4],
  },
  {
    name: "UserAgent",
    component: EDataComponent.DIMENSIONS,
    type: "dimensions",
    key: "UserAgent",
    layout: [2, 2, 1, 1],
  },
  {
    name: "Event",
    component: EDataComponent.EVENTS,
    type: "events",
    key: "Event",
    layout: [2, 3, 1, 1],
  },
];

export default data;
