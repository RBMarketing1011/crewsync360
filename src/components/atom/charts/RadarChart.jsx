import { Radar } from 'react-chartjs-2'
import
{
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const RadarChart = () =>
{
  const data = {
    labels: [ 'Strength', 'Agility', 'Intelligence', 'Charisma', 'Stamina' ],
    datasets: [
      {
        label: 'Character 1',
        data: [ 65, 59, 90, 81, 56 ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Character 2',
        data: [ 28, 48, 40, 19, 96 ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Character 3',
        data: [ 12, 33, 44, 55, 66 ],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'Character 4',
        data: [ 45, 67, 89, 23, 45 ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ],
  }

  const options = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },

  }

  return (
    <Radar
      data={ data }
      options={ options }
    />
  )
}

export default RadarChart