import "@/components/Grid/index.css";
import Responsive, { WidthProvider, Layout } from "react-grid-layout";
import GridCard from "@/components/Grid/GridCard";

const Grid = () => {
  const ReactGridLayout = WidthProvider(Responsive);

  const layout: Layout[] = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 1, h: 2 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 }
  ];

  const cards: { key: string, title: string }[] = [
    { key: "a", title: "a" },
    { key: "b", title: "b" },
    { key: "c", title: "c" }
  ];

  return (
    <ReactGridLayout
      className="layout flex-1"
      layout={layout}
      cols={2}
      width={1200}
    >
      {
        cards.map((card) => (
          <div key={card.key}>
            <GridCard title={card.title} >

            </GridCard>
          </div>
        ))
      }
    </ReactGridLayout >
  );
};

export default Grid;