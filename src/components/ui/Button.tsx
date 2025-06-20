import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-600 hover:to-amber-700 shadow-md',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700',
    outline: 'border border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-200',
  };
  
  const sizeStyles = {
    sm: 'h-9 px-3 rounded-md text-sm',
    md: 'h-10 py-2 px-4 text-sm',
    lg: 'h-12 px-8 rounded-md text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;