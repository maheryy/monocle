const GridCard = ({ title, children }: GridCardProps) => {
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full"
    >
      <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
        {title}
      </h4>
      {children}
      <div
        className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400"
      >
      </div>
    </div>
  )
}

interface GridCardProps {
  title: string;
  children: React.ReactNode;
}

export default GridCard;