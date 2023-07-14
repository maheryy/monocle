import { Line, ChartProps } from 'react-chartjs-2';

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const dataValues = [65, 59, 80, 81, 56, 55];

const LineChart = () => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        fill: false,
        borderColor: "rgb(147, 51, 234)",
        tension: 0.3
      }
    ]
  };

  const options: ChartProps<"line">['options'] = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        }
      },
      x: {
        ticks: {
          align: 'inner',
        },
      }
    },
    plugins: {
      title: {
        display: true,
      },
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;