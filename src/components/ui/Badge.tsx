import type { HTMLAttributes } from 'react';
import classNames from 'classnames';

type BadgeStatus = 'submitted' | 'pending' | 'approved' | 'rejected' | 'paid' | 'critical' | 'warning' | 'info' | 'success';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

const Badge = ({ status, size = 'md', children, className, ...props }: BadgeProps) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  };
  
  const statusClasses = {
    submitted: 'bg-blue-100 text-blue-800',
    pending: 'bg-orange-100 text-orange-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    paid: 'bg-blue-100 text-blue-800',
    critical: 'bg-red-100 text-red-800',
    warning: 'bg-orange-100 text-orange-800',
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800'
  };

  const badgeClasses = classNames(
    baseClasses,
    sizeClasses[size],
    statusClasses[status],
    className
  );

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

export { Badge };
export type { BadgeProps, BadgeStatus };
