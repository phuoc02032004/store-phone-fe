import React from 'react';
import { Loader2 } from 'lucide-react'; // Import icon Loader2

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Thêm size xl
  fullScreen?: boolean;
  className?: string;
  iconClassName?: string; // Class cho icon
  textClassName?: string; // Class cho text
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text,
  size = 'md',
  fullScreen = false,
  className = '',
  iconClassName = '',
  textClassName = '',
}) => {
  const iconSizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16', // Size lớn hơn
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const spinnerElement = (
    <Loader2 
      className={`animate-spin text-primary ${iconSizeClasses[size]} ${iconClassName}`} 
      aria-label="Loading content" // Thêm aria-label cho icon
    />
  );

  const textElement = text && (
    <p className={`mt-3 font-medium text-muted-foreground ${textSizeClasses[size]} ${textClassName}`}>
      {text}
    </p>
  );

  if (fullScreen) {
    return (
      <div 
        className={`fixed inset-0 z-[9999] flex flex-col justify-center items-center 
                    bg-background/80 backdrop-blur-sm ${className}`}
        role="alert" // Có thể dùng role="alert" nếu nó là một thông báo quan trọng
        aria-live="assertive" // Hoặc "polite" tùy mức độ ưu tiên
      >
        {spinnerElement}
        {textElement}
      </div>
    );
  }

  return (
    <div className={`flex flex-col justify-center items-center py-8 ${className}`}>
      {spinnerElement}
      {textElement}
    </div>
  );
};

export default LoadingSpinner;