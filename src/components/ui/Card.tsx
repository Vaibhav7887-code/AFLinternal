import { HTMLAttributes } from 'react';
import classNames from 'classnames';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({ children, padding = 'md', className, ...props }: CardProps) => {
  const baseClasses = 'bg-white border border-gray-200 rounded-lg';
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const cardClasses = classNames(
    baseClasses,
    paddingClasses[padding],
    className
  );

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={classNames('border-b border-gray-200 pb-3 mb-3', className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={classNames('text-lg font-medium text-gray-900', className)} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={classNames('', className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={classNames('border-t border-gray-200 pt-3 mt-3', className)} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
export type { CardProps };
