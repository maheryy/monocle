import { Bar, ChartProps } from 'react-chartjs-2';

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const dataValues = [65, 59, 80, 81, 56, 55];

const BarChart = () => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: "rgb(147, 51, 234, 0.4)",
        borderColor: "rgb(147, 51, 234)",
        borderWidth: 1,
      }
    ]
  };

  const options: ChartProps<"bar">['options'] = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart;