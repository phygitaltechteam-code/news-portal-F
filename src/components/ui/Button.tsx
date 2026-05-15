import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  label:string
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className, 
  label,
  ...props 
}) => {
  const baseStyles = "rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200",
    secondary: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200",
    outline: "bg-transparent border-2 border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${label ? 'flex-row' : ''}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};

export default Button;
