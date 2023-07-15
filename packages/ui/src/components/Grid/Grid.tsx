import "@/components/Grid/index.css";
import Responsive, { WidthProvider, Layout } from "react-grid-layout";
import GridCard from "@/components/Grid/GridCard";
import { getData } from "@/api/data.api";
import { useEffect, useState } from "react";
import { Data, EDataComponent } from "@/types/data";
import Metric from "@/components/Metric";
import Dimension from "@/components/Dimension";

const Grid = () => {
  const ReactGridLayout = WidthProvider(Responsive);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    void (async () => {
      const data = await getData();
      setData(data);
    })();
  }, []);

  const layout: Layout[] = data.map((item) => {
    return {
      i: item.key,
      x: item.layout[0],
      y: item.layout[1],
      w: item.layout[2],
      h: item.layout[3],
      static: true,
    };
  });

  return (
    <ReactGridLayout
      className="layout flex-1"
      layout={layout}
      cols={2}
      width={1200}
    >
      {data.map((item) => {
        let props = undefined;
        if (item.component === EDataComponent.METRICS) {
          props = { x: 1 };
          return (
            <div key={item.key}>
              <GridCard title={item.name}>
                <Metric {...props} />
              </GridCard>
            </div>
          );
        } else {
          return (
            <div key={item.key}>
              <GridCard title={item.name}>
                <Dimension />
              </GridCard>
            </div>
          );
        }
      })}
    </ReactGridLayout>
  );
};

export default Grid;
