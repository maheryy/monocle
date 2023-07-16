import ToolBoxItem from "@/components/Toolbox/ToolboxItem";
import { Item } from "@/types/item";

const ToolBox = ({ items, onTakeItem }: ToolBoxProps) => {
  return (
    <div className="w-1/3 bg-gray-200 border border-gray-300 p-4 m-2 rounded dark:bg-gray-700 dark:border-gray-700">
      <span className="text-lg font-bold mb-4 dark:text-gray-100">Toolbox</span>
      <div>
        {items.map((item) => (
          <ToolBoxItem key={item.i} item={item} onTakeItem={onTakeItem} />
        ))}
      </div>
    </div>
  );
};

interface ToolBoxProps {
  items: Item[];
  onTakeItem: (item: Item) => void;
}

export default ToolBox;
