const GridDeletableCard = ({ title, remove }: GridDeletableCardProps) => {
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 147) + 147;
    const g = Math.floor(Math.random() * 51) + 51;
    const b = Math.floor(Math.random() * 234) + 234;

    return `rgb(${r}, ${g}, ${b}, 0.2)`;
  };

  const cardStyle = {
    backgroundColor: getRandomColor(),
  };

  return (
    <div
      className="grid align-middle p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full"
      style={cardStyle}
    >
      <div
        className="max-w-maxtext-gray-800 dark:text-gray-300"
        onClick={remove}
      >
        &times;
      </div>
      <h4 className=" mb-4 font-semibold text-center text-gray-800 dark:text-gray-300">
        {title}
      </h4>
      <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400"></div>
    </div>
  );
};

interface GridDeletableCardProps {
  title: string;
  remove: () => void;
}

export default GridDeletableCard;
