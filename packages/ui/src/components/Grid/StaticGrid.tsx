import "@/components/Grid/index.css";
import Responsive, { WidthProvider, Layout } from "react-grid-layout";
import GridCard from "@/components/Grid/GridCard";
import { getData } from "@/api/data.api";
import { useEffect, useState } from "react";
import { Data, EDataComponent } from "@/types/data";
import Metric from "@/components/Metric";
import { retrieve } from "@/utils/storage";
import { StorageKey } from "@/types/storage";
import Table from "@/components/Table";
import Devices from "@/components/Chart/Devices";

const ReactGridLayout = WidthProvider(Responsive);

const Grid = () => {
  const [data, setData] = useState<Data[]>([]);
  const s = retrieve(StorageKey.LAYOUTS);

  console.log(s);

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
      cols={4}
      width={1200}
    >
      {data.map((item) => {
        if (item.component === EDataComponent.METRIC) {
          return (
            <div key={item.key}>
              <GridCard title={item.name}>
                <Metric k={item.key} />
              </GridCard>
            </div>
          );
        }

        if (item.component === EDataComponent.TABLE) {
          return (
            <div key={item.key}>
              <GridCard title={item.name}>
                <Table k={item.key} endpoint={item.endpoint} />
              </GridCard>
            </div>
          );
        }

        if (item.component === EDataComponent.DEVICE) {
          return (
            <div key={item.key}>
              <GridCard title={item.name}>
                <Devices />
              </GridCard>
            </div>
          );
        }
      })}
    </ReactGridLayout>
  );
};

export default Grid;
