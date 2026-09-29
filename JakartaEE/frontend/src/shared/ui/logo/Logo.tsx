import React from 'react';
import { Cpu } from 'lucide-react';
import styles from './Logo.module.scss';

export const Logo: React.FC = () => {
  return (
    <div className={styles.logoWrapper}>
      <div className={styles.brandRow}>
        <div className={styles.brandIcon}>
          <Cpu size={20} color="#FF7A00" strokeWidth={2.2} />
        </div>
        <div className={styles.brandTitle}>
          TECH<span className={styles.accent}>CORE</span>
        </div>
      </div>
      <div className={styles.brandSubtitle}>Склад техники и электроники</div>
    </div>
  );
};
