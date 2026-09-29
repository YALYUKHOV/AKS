import React from 'react';
import { Package, FolderKanban, CircleDollarSign, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@shared/lib/formatters';
import styles from './MetricsBar.module.scss';

interface MetricsBarProps {
  totalItems: number;
  totalCategories: number;
  totalValue: number;
  lowStockCount: number;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({
  totalItems,
  totalCategories,
  totalValue,
  lowStockCount,
}) => {
  return (
    <div className={styles.metricsGrid}>
      <div className={styles.metricCard}>
        <div className={`${styles.iconWrapper} ${styles.orange}`}>
          <Package size={22} />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Наименований техники</span>
          <span className={styles.value}>{totalItems}</span>
        </div>
      </div>

      <div className={styles.metricCard}>
        <div className={`${styles.iconWrapper} ${styles.blue}`}>
          <FolderKanban size={22} />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Категорий каталога</span>
          <span className={styles.value}>{totalCategories}</span>
        </div>
      </div>

      <div className={styles.metricCard}>
        <div className={`${styles.iconWrapper} ${styles.green}`}>
          <CircleDollarSign size={22} />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Стоимость склада</span>
          <span className={styles.value}>{formatCurrency(totalValue)}</span>
        </div>
      </div>

      <div className={styles.metricCard}>
        <div className={`${styles.iconWrapper} ${styles.amber}`}>
          <AlertTriangle size={22} />
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Мало на складе (&lt;10 шт)</span>
          <span className={styles.value}>{lowStockCount}</span>
        </div>
      </div>
    </div>
  );
};
