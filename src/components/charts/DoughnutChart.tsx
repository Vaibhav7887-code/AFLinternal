import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  title: string;
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  height?: number;
  showTotal?: boolean;
}

export function DoughnutChart({ title, data, height = 300, showTotal = true }: DoughnutChartProps) {
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => item.color),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                const percentage = ((value / totalValue) * 100).toFixed(1);
                return {
                  text: `${label}: ${value} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].borderColor,
                  lineWidth: data.datasets[0].borderWidth,
                  pointStyle: 'circle',
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const percentage = ((value / totalValue) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
    },
  };

  return (
    <div>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <div className="flex items-center justify-between" style={{ height: `${height}px` }}>
        {/* Chart Container */}
        <div className="relative flex-1" style={{ height: `${height}px`, maxWidth: '60%' }}>
          <Doughnut data={chartData} options={{
            ...options,
            plugins: {
              ...options.plugins,
              legend: {
                display: false, // Hide default legend
              },
            },
          }} />
          {showTotal && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{totalValue}</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>
          )}
        </div>
        
         {/* Simplified Legend */}
         <div className="flex-1 pl-8 space-y-4">
           {data.map((item, index) => (
             <div key={index} className="flex items-center space-x-3">
               <div 
                 className="w-4 h-4 rounded-full flex-shrink-0"
                 style={{ backgroundColor: item.color }}
               ></div>
               <span className="text-sm text-gray-700 leading-relaxed">{item.label}</span>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}
