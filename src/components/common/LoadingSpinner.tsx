import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Loading...",
  size = 'md',
  fullScreen = false,
}) => {
  const spinnerSizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-[3px]',
    lg: 'h-16 w-16 border-4',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-background/80 backdrop-blur-sm">
        <div
          className={`animate-spin rounded-full ${spinnerSizeClasses[size]} border-gray-300 dark:border-gray-600 border-t-gray-700 dark:border-t-gray-300`}
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Loading...</span>
        </div>
        {text && <p className={`mt-3 font-medium text-gray-600 dark:text-gray-400 ${textSizeClasses[size]}`}>{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center py-10"> {/* Thêm padding y */}
      <div
        className={`animate-spin rounded-full ${spinnerSizeClasses[size]} border-gray-300 dark:border-gray-600 border-t-gray-700 dark:border-t-gray-300`}
        role="status"
        aria-live="polite"
      >
        <span className="sr-only">Loading...</span>
      </div>
      {text && <p className={`mt-3 font-medium text-gray-600 dark:text-gray-400 ${textSizeClasses[size]}`}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;