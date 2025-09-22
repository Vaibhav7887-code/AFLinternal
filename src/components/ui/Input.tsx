import { InputHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helper,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const inputClasses = classNames(
    'px-3 py-2 border rounded-md text-sm transition-colors',
    'focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none',
    'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
    {
      'border-red-300 focus:border-red-500 focus:ring-red-500': error,
      'border-gray-200': !error
    },
    className
  );

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
      {helper && !error && (
        <p className="text-xs text-gray-500">{helper}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
export type { InputProps };
