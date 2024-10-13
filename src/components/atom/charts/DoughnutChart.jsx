import { Doughnut } from 'react-chartjs-2'

import
{
  Chart as ChartJs,
  ArcElement,
  DoughnutController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJs.register(
  ArcElement,
  DoughnutController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

const DoughnutChart = () =>
{

  const data = {
    labels: [ 'Scheduled', 'In Progress', 'Completed' ],
    datasets: [
      {
        label: '# of Votes',
        data: [ 6, 13, 9 ],
        backgroundColor: [
          'rgba(56, 189, 248, 1)',
          'rgba(2, 132, 199, 1)',
          'rgba(7, 89, 133, 1)'
        ],
        borderColor: 'transparent',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: {
      title: {
        display: false,
        position: 'top',
        text: 'Total Jobs',
        font: {
          size: 60,
        },
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'black',
        },
      },
    },
  }


  return (
    <Doughnut
      data={ data }
      options={ options }
    />
  )
}

export default DoughnutChart