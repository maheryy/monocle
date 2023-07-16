import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Desktop", "Mobile"],
    datasets: [
      {
        data: [3, 7],
        backgroundColor: [
          "aqua",
          "orangered",
          // ect
        ],
        borderWidth: 1,
      },
      {
        data: [3, 7],
        backgroundColor: [
          "aqua",
          "orangered",
          // ect
        ],
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
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
