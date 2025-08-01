import React, { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'error';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, variant = 'default', className, ...props }, ref) => {
    const inputClass = `${styles.input} ${styles[variant]} ${className || ''}`;

    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label className={styles.label} htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputClass}
          {...props}
        />
        {error && (
          <span className={styles.error}>{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;