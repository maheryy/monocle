import { Doughnut } from 'react-chartjs-2';

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const dataValues = [65, 59, 80, 81, 56, 55];

const DoughnutChart = () => {
  const data = {
    labels: labels,
    datasets: [{
      data: dataValues,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  // options for a 50% size for the chart
  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="chart-container">
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default DoughnutChart;