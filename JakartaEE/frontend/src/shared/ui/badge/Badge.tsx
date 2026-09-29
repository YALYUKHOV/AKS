import React from 'react';
import styles from './Badge.module.scss';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'warning' | 'success' | 'danger' | 'info' | 'neutral' | 'counter' | 'primary';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  dot = false,
  className = '',
}) => {
  return (
    <span
      className={`${styles.badge} ${styles[variant]} ${dot ? styles.dot : ''} ${className}`}
    >
      {children}
    </span>
  );
};
