import { Data, EDataComponent } from "@/types/data";

const data: Data[] = [
  {
    name: "Largest contentful Paint",
    component: EDataComponent.METRIC,
    type: "metrics",
    key: "LCP",
    layout: [0, 0, 1, 1],
    endpoint: "/metrics/LCP",
  },
  {
    name: "First Input Delay",
    component: EDataComponent.METRIC,
    type: "metrics",
    key: "FID",
    layout: [1, 0, 1, 1],
    endpoint: "/metrics/FID",
  },
  {
    name: "Interaction to Next Paint",
    component: EDataComponent.METRIC,
    type: "metrics",
    key: "INP",
    layout: [2, 0, 1, 1],
    endpoint: "/metrics/INP",
  },
  {
    name: "Cumulative Layout Shift",
    component: EDataComponent.METRIC,
    type: "metrics",
    key: "CLS",
    layout: [3, 0, 1, 1],
    endpoint: "/metrics/CLS",
  },
  {
    name: "First Contentful Paint",
    component: EDataComponent.METRIC,
    type: "metrics",
    key: "FCP",
    layout: [0, 1, 1, 1],
    endpoint: "/metrics/FCP",
  },
  {
    name: "Time to first byte",
    component: EDataComponent.METRIC,
    type: "metrics",
    key: "TTFB",
    layout: [1, 1, 1, 1],
    endpoint: "/metrics/TTFB",
  },
  {
    name: "PageView",
    component: EDataComponent.TABLE,
    type: "dimensions",
    key: "PageView",
    layout: [0, 2, 2, 4],
    endpoint: "/dimensions/page-views/stats",
  },
  {
    name: "Devices",
    component: EDataComponent.DEVICE,
    type: "dimensions",
    key: "UserAgent",
    layout: [2, 3, 2, 2],
    endpoint: "/dimensions/user-agents/stats",
  },
  {
    name: "Event",
    component: EDataComponent.TABLE,
    type: "events",
    key: "Event",
    layout: [2, 1, 2, 2],
    endpoint: "/events/stats",
  },
];

export default data;
