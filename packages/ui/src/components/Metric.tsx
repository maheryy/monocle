import { getMetric } from "@/api/metric.api";
import { useEffect, useState } from "react";
import { GetMetricResponse } from "@/api/metric.api";

export interface MetricProps {
  k: string;
}

const Metric = ({ k }: MetricProps) => {
  const [metric, setMetric] = useState<GetMetricResponse | null>(null);

  useEffect(() => {
    getMetric(k).then(setMetric).catch(console.error);
  }, [k]);

  const { avg, min, max } = metric || {};

  return (
    <div className="grid gap-4 dark:text-gray-300">
      <div className="text-2xl font-semibold text-center">
        {avg?.toFixed(2).replace(".", ",").replace(/,00$/, "")}
      </div>
      <div className="flex gap-2 justify-around">
        <div>{min?.toFixed(2).replace(".", ",").replace(/,00$/, "")}</div>
        <div>{max?.toFixed(2).replace(".", ",").replace(/,00$/, "")}</div>
      </div>
    </div>
  );
};

export default Metric;
