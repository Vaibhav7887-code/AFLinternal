import { HTMLAttributes } from 'react';
import classNames from 'classnames';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  max?: number;
  color?: 'green' | 'blue' | 'orange' | 'red';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

const ProgressBar = ({ 
  value, 
  max = 100, 
  color = 'green', 
  size = 'md', 
  showLabel = false,
  label,
  className,
  ...props 
}: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const containerClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500'
  };

  const baseClasses = classNames(
    'w-full bg-gray-200 rounded-full overflow-hidden',
    containerClasses[size],
    className
  );

  const fillClasses = classNames(
    'h-full transition-all duration-300 ease-out',
    colorClasses[color]
  );

  return (
    <div className="space-y-1">
      {(showLabel || label) && (
        <div className="flex justify-between text-sm text-gray-600">
          <span>{label || `Progress`}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={baseClasses} {...props}>
        <div 
          className={fillClasses}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export { ProgressBar };
export type { ProgressBarProps };
