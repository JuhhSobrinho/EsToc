import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Registra os componentes e plugins
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const ChartTipo = ({ data }) => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) return;

    const labels = Object.keys(data);
    const valores = Object.values(data);

    setChartData({
      labels,
      datasets: [{
        label: 'Produtos por Tipo',
        data: valores,
        backgroundColor: [
          'rgba(83, 202, 202, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(187, 80, 103, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(187, 80, 103, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      }]
    });

    setChartOptions({
      plugins: {
        legend: {
          position: 'right', // Legenda à direita
          labels: {
            color: '#888',
            font: {
              size: 16, // Tamanho da fonte da legenda
              weight: 'bold', // Peso da fonte
            },
          },
        },
        datalabels: {
          color: '#fff',
          formatter: (value, context) => {
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1) + '%';
            return percentage;
          },
          font: {
            weight: 'bold'
          }
        }
      },
      cutout: '40%', // Ajusta o tamanho do "buraco" no meio da rosca. 
      // Aumentar esse valor vai fazer com que a rosca fique maior. Você pode ajustar conforme necessário.
      responsive: true,
      maintainAspectRatio: false, // Para garantir que o gráfico se ajuste corretamente ao espaço disponível.
    });
  }, [data]);

  return (
    <>
      {chartData && chartOptions ? (
        <Doughnut data={chartData} options={chartOptions} />
      ) : (
        <span className="titulo-Quadros"> Dados Insuficientes para gerar o grafico</span>
      )}
    </>
  );
};
