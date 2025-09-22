import type { HTMLAttributes } from 'react';
import classNames from 'classnames';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const Spinner = ({ size = 'md', color, className, ...props }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const baseClasses = classNames(
    'animate-spin rounded-full border-2 border-current border-t-transparent',
    sizeClasses[size],
    className
  );

  const style = color ? { color } : undefined;

  return (
    <div 
      className={baseClasses} 
      style={style}
      {...props}
    />
  );
};

export { Spinner };
export type { SpinnerProps };
