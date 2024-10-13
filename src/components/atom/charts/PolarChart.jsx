import { PolarArea } from 'react-chartjs-2'

import
{
  Chart as ChartJS,
  RadarController, // This controller is used to create radar
  RadialLinearScale, // This is the scale for the y-axis
  PolarAreaController, // This controller is used to create polar area
  LinearScale, // This is the scale for the y-axis
  CategoryScale, // This is the scale for the x-axis
  PointElement, // This is used to create points on the line
  LineElement, // This is used to create the line
  Title, // This is used to create the title
  Tooltip, // This is used to create the tooltip
  Legend, // This is used to create the legend
  Filler, // This is used to fill the area under the line
} from 'chart.js'

ChartJS.register(
  PolarAreaController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale,
  Filler,
  Title,
  Tooltip,
  Legend,
)

const PolarChart = () =>
{

  const data = {
    labels: [ 'Red', 'Blue', 'Yellow', 'Green', 'Purple' ],
    datasets: [
      {
        label: 'My First Dataset',
        data: [ 11, 16, 7, 3, 14 ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Polar Area Chart',
      },
    },
  }

  return (
    <PolarArea
      data={ data }
      options={ options }
    />
  )
}

export default PolarChart