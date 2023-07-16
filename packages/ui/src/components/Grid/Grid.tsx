import "@/components/Grid/index.css";
import Responsive, { WidthProvider, Layout } from "react-grid-layout";
import GridCard from "@/components/Grid/GridCard";
import BarChart from "@/components/Chart/BarChart";
import LineChart from "@/components/Chart/LineChart";
import DoughnutChart from "@/components/Chart/DoughnutChart";
import PieChart from "@/components/Chart/PieChart";

import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  PointElement,
  LinearScale
);

const Grid = () => {
  const ReactGridLayout = WidthProvider(Responsive);

  const layout: Layout[] = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 1, h: 2 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
    { i: "d", x: 0, y: 5, w: 1, h: 2 },
  ];

  return (
    <ReactGridLayout
      className="layout flex-1"
      layout={layout}
      cols={2}
      width={1200}
    >
      <div key="a">
        <GridCard title="Bar Chart">
          <BarChart />
        </GridCard>
      </div>
      <div key="b">
        <GridCard title="Line Chart">
          <LineChart />
        </GridCard>
      </div>
      <div key="c">
        <GridCard title="Doughnut Chart">
          <DoughnutChart />
        </GridCard>
      </div>
      <div key="d">
        <GridCard title="Pie Chart">
          <PieChart />
        </GridCard>
      </div>
    </ReactGridLayout>
  );
};

export default Grid;
