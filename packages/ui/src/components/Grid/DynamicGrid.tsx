import "@/components/Grid/index.css";
import _ from "lodash";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { getData } from "@/api/data.api";
import { Data } from "@/types/data";
import { useEffect, useState } from "react";
import ToolBox from "@/components/Toolbox/Toolbox";
import { Item } from "@/types/item";
import { store } from "@/utils/storage";
import { StorageKey } from "@/types/storage";
import GridDeletableCard from "./GridDeletableCard";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const generateLayout = (items: Data[]): Layout[] => {
  const layout: Layout[] = items.map((item) => {
    return {
      i: item.key,
      x: item.layout[0],
      y: item.layout[1],
      w: item.layout[2],
      h: item.layout[3],
    };
  });
  return layout;
};

const DynamicGrid = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({
    lg: [],
    md: [],
    sm: [],
    xs: [],
    xxs: [],
  });
  const [toolbox, setToolbox] = useState<{ [key: string]: Item[] }>({});

  useEffect(() => {
    getData()
      .then((data) => {
        return data;
      })
      .then((i) => {
        const generatedLayouts: { [key: string]: Layout[] } = {};
        Object.keys(layouts).forEach((breakpoint) => {
          generatedLayouts[breakpoint] = generateLayout(i);
        });
        setLayouts(generatedLayouts);
      })
      .catch((err) => console.log(err));
  }, []);

  const generateDOM = () => {
    return _.map(layouts[currentBreakpoint], (l) => {
      return (
        <div key={l.i}>
          <GridDeletableCard title={l.i} remove={() => onPutItem(l)} />
        </div>
      );
    });
  };

  const onBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  };

  const onPutItem = (item: Item) => {
    setToolbox((prevState) => ({
      ...prevState,
      [currentBreakpoint]: [...(prevState[currentBreakpoint] || []), item],
    }));
    setLayouts((prevState) => ({
      ...prevState,
      [currentBreakpoint]: prevState[currentBreakpoint].filter(
        // @ts-ignore
        ({ i }) => i !== item.i
      ),
    }));
  };

  const onTakeItem = (item: Item) => {
    setToolbox((prevState) => ({
      ...prevState,
      [currentBreakpoint]: prevState[currentBreakpoint].filter(
        ({ i }) => i !== item.i
      ),
    }));
    // @ts-ignore
    setLayouts((prevState) => ({
      ...prevState,
      [currentBreakpoint]: [...prevState[currentBreakpoint], item],
    }));
  };

  const onLayoutChangeHandler = (
    layout: Layout[],
    layouts: { [key: string]: Layout[] }
  ) => {
    setLayouts(layouts);
  };

  const handleSave = () => {
    store(StorageKey.LAYOUTS, layouts);
  };

  return (
    <>
      <button
        className="max-w-max justify-self-end text-gray-100 bg-purple-600 m-2 px-4 py-2 rounded-md hover:bg-purple-700"
        onClick={handleSave}
      >
        Save
      </button>
      <div className="flex">
        <ToolBox
          items={toolbox[currentBreakpoint] || []}
          onTakeItem={onTakeItem}
        />
        <ResponsiveReactGridLayout
          className={"flex-1 layout"}
          rowHeight={100}
          layouts={layouts}
          onBreakpointChange={onBreakpointChange}
          onLayoutChange={(layout, layouts) =>
            onLayoutChangeHandler(layout, layouts)
          }
          measureBeforeMount={false}
          cols={{ lg: 4, md: 4, sm: 4, xs: 3, xxs: 2 }}
        >
          {generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    </>
  );
};

export default DynamicGrid;
