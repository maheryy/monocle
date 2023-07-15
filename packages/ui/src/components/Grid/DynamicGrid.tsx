import "@/components/Grid/index.css";
import Responsive, { WidthProvider, Layout } from "react-grid-layout";
import GridCard from "@/components/Grid/GridCard";
import { getData } from "@/api/data.api";
import { Data } from "@/types/data";
import { useEffect, useState } from "react";

const ReactGridLayout = WidthProvider(Responsive);
const DynamicGrid = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    void (async () => {
      const data = await getData();
      setData(data);
    })();
  }, []);

  console.log(data);

  const layout: Layout[] = data.map((item) => {
    return {
      i: item.key,
      x: item.layout[0],
      y: item.layout[1],
      w: item.layout[2],
      h: item.layout[3],
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
        return (
          <div key={item.key}>
            <GridCard title={item.name} children={undefined}></GridCard>
          </div>
        );
      })}
    </ReactGridLayout>
  );
};

export default DynamicGrid;
