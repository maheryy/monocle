import { useEffect, useState } from "react";
import api from "@/api";
import { GetStats } from "@/api/dimension.api";

const Table = ({ k, endpoint }: TableProps) => {
  const [data, setData] = useState<GetStats | null>(null);

  useEffect(() => {
    api.get(endpoint).json<GetStats>().then(setData).catch(console.error);
  }, [endpoint]);

  if (!data) {
    return null;
  }

  return (
    <table className="w-full text-left border-collapse dark:border-gray-700">
      <thead className="bg-gray-200 border border-gray-300 dark:bg-gray-700 dark:border-gray-700">
        <tr className="text-gray-600 dark:text-gray-400">
          <th>Dimension</th>
          <th>Nombre</th>
          <th>Pourcentage</th>
        </tr>
      </thead>
      <tbody className="bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
        {Object.entries(data).map(([key, { count, percentage }]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{count}</td>
            <td>{percentage * 100} %</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export interface TableProps {
  k: string;
  endpoint: string;
}

export default Table;
