import React from 'react'
import { Bar } from 'react-chartjs-2'
import
{
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  indexAxis: 'y',  // This makes the bars horizontal
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Horizontal Bar Chart',
    },
  },
}

const data = {
  labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
  datasets: [
    {
      label: 'Sales',
      data: [ 65, 59, 80, 81, 56, 55, 40 ],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
    {
      label: 'Orders',
      data: [ 28, 48, 40, 19, 86, 27, 90 ],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
}

const HorizontalBarChart = () => (
  <Bar
    options={ options }
    data={ data }
  />
)

export default HorizontalBarChart