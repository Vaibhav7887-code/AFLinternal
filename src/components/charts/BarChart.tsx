import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
  height?: number;
  yAxisLabel?: string;
  horizontal?: boolean;
}

export function BarChart({ 
  title, 
  labels, 
  datasets, 
  height = 300, 
  yAxisLabel, 
  horizontal = false 
}: BarChartProps) {
  const data = {
    labels,
    datasets: datasets.map(dataset => ({
      ...dataset,
      borderWidth: dataset.borderWidth ?? 1,
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' as const : 'x' as const,
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
        display: false,
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
        title: {
          display: horizontal && !!yAxisLabel,
          text: horizontal ? yAxisLabel : undefined,
          font: {
            size: 12,
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
          display: !horizontal && !!yAxisLabel,
          text: !horizontal ? yAxisLabel : undefined,
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
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
