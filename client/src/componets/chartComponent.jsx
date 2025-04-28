import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const CharVenvimento = ({ data }) => {
  const chartData = {
    labels: ['7 dias', '15 dias', '30 dias'],
    datasets: [{
      label: 'Produtos Vencendo',
      data: [data.vencendo7, data.vencendo15, data.vencendo30],
      backgroundColor: '#ccccef86',
      borderColor: '#9FA3D0',
      borderWidth: 1,
    }]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true, // Começa o gráfico no zero
        max: 20, // Define o valor máximo como 10
        ticks: {
          stepSize: 1 // Controla a quantidade de divisão entre os valores, neste caso, de 1 em 1
        }
      }
    }
  };

  return <Bar data={chartData} options={chartOptions} />;
};
