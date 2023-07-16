import { Item } from "@/types/item";

const ToolBoxItem = ({ item, onTakeItem }: ToolBoxItemProps) => {
  return (
    <div
      className="py-3 my-3 border-b-4 cursor-pointer border-violet-800 bg-violet-50 rounded-xl hover:bg-violet-300 hover:rounded-xl text-center dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-violet-700"
      onClick={() => onTakeItem(item)}
    >
      {item.i}
    </div>
  );
};

interface ToolBoxItemProps {
  item: Item;
  onTakeItem: (item: Item) => void;
}

export default ToolBoxItem;
