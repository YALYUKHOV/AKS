import React from 'react';
import { Button } from '@shared/ui/button/Button';
import { NavTab } from '@widgets/sidebar/ui/Sidebar';
import { Package, FolderKanban, ArrowRight, Layers } from 'lucide-react';
import styles from './DashboardPage.module.scss';

interface DashboardPageProps {
  onNavigate: (tab: NavTab) => void;
  productsCount: number;
  categoriesCount: number;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  productsCount,
  categoriesCount,
}) => {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Дашборд склада техники</h1>
        <p className={styles.subtitle}>
          Сводные показатели складского учета компьютерного оборудования и компонентов
        </p>
      </div>

      <div className={styles.banner}>
        <div className={styles.bannerText}>
          <h2>
            Корпоративная система <span>TECHCORE</span>
          </h2>
          <p>
            Автоматизация управления каталогом компьютерной техники, сессионные EJB 4.0, JPA 3.1 и PostgreSQL 16.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Package size={16} />}
          onClick={() => onNavigate('products')}
        >
          Перейти в каталог
        </Button>
      </div>

      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Каталог товаров и техники</h3>
            <Package size={20} color="var(--primary)" />
          </div>
          <div>
            <div className={styles.statNumber}>{productsCount}</div>
            <p className={styles.statDesc}>
              Всего позиций техники (ноутбуки, ПК, комплектующие)
            </p>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Button
              variant="outline"
              size="sm"
              icon={<ArrowRight size={14} />}
              onClick={() => onNavigate('products')}
            >
              Открыть каталог товаров
            </Button>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Справочники категорий</h3>
            <FolderKanban size={20} color="#10B981" />
          </div>
          <div>
            <div className={styles.statNumber}>{categoriesCount}</div>
            <p className={styles.statDesc}>
              Активных категорий оборудования (JPA @OneToMany)
            </p>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Button
              variant="outline"
              size="sm"
              icon={<ArrowRight size={14} />}
              onClick={() => onNavigate('categories')}
            >
              Управление категориями
            </Button>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Архитектура системы</h3>
            <Layers size={20} color="#3B82F6" />
          </div>
          <div>
            <div className={styles.statNumber}>3</div>
            <p className={styles.statDesc}>
              Слоя Jakarta EE: Presentation (REST), Business (EJB), Persistence (JPA)
            </p>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Button
              variant="outline"
              size="sm"
              icon={<ArrowRight size={14} />}
              onClick={() => onNavigate('architecture')}
            >
              Схема архитектуры
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
