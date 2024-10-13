import { Line } from 'react-chartjs-2'

import
{
  Chart as ChartJS,
  LineController, // This controller is used to create line
  LinearScale, // This is the scale for the y-axis
  CategoryScale, // This is the scale for the x-axis
  PointElement, // This is used to create points on the line
  LineElement, // This is used to create the line
  Title, // This is used to create the title
  Tooltip, // This is used to create the tooltip
  Legend, // This is used to create the legend
} from 'chart.js'

ChartJS.register(
  LineController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const LineChart = () =>
{

  const usedData = {
    labels: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
    datasets: [
      {
        label: 'Sales',
        data: [ 12, 19, 3, 5, 2, 3, 15 ],
        borderColor: 'rgba(255, 99, 132, 0.2)',
        pointBorderColor: 'rgba(255, 28, 36, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Orders',
        data: [ 1, 2, 1, 1, 2, 2, 1 ],
        borderColor: 'rgba(54, 162, 235, 0.2)',
        pointBorderColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Visits',
        labelColor: 'rgba(75, 192, 192, 0.2)',
        data: [ 2, 3, 5, 6, 7, 8, 9 ],
        borderColor: 'rgba(75, 192, 192, 0.2)',
        pointBorderColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      title: {
        display: false,
        text: 'Chart.js Line Chart'
      },
      tooltip: {
        callbacks: {
          label: function (context)
          {
            var label = context.dataset.label || ''
            if (label)
            {
              label += ': '
            }
            if (context.parsed.y !== null)
            {
              label += context.parsed.y
            }
            return label
          }
        }
      },
      legend: true
    }
  }

  return (
    <Line
      data={ usedData }
      options={ options }
    />
  )
}

export default LineChart
