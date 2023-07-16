import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { getDimensionUserAgent, GetStats } from "@/api/dimension.api";

ChartJS.register(ArcElement, Tooltip, Legend);

const Devices = () => {
  const [devices, setDevices] = useState<GetStats | null>(null);

  useEffect(() => {
    getDimensionUserAgent().then(setDevices).catch(console.error);
  }, []);

  if (!devices) {
    return null;
  }

  const labels = Object.keys(devices);
  const data = Object.values(devices).map(({ percentage }) => percentage * 100);

  const d = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ["aqua", "orangered"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container">
      <Pie data={d} options={options} />
    </div>
  );
};

export default Devices;
