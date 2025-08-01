import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    className, 
    disabled,
    ...props 
  }, ref) => {
    
    const buttonClass = `
      ${styles.button} 
      ${styles[variant]} 
      ${styles[size]} 
      ${loading ? styles.loading : ''} 
      ${className || ''}
    `.trim();

    return (
      <button
        ref={ref}
        className={buttonClass}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className={styles.spinner}></span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;