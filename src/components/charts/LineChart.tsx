import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill?: boolean;
    tension?: number;
  }[];
  height?: number;
  yAxisLabel?: string;
}

export function LineChart({ title, labels, datasets, height = 300, yAxisLabel }: LineChartProps) {
  const data = {
    labels,
    datasets: datasets.map(dataset => ({
      ...dataset,
      tension: dataset.tension ?? 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false, // We'll use our own title
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <div style={{ height: `${height}px` }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
