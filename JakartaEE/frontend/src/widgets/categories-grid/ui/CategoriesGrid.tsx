import React from 'react';
import { Category } from '@entities/category/model/types';
import { CategoryCard } from '@entities/category/ui/CategoryCard';
import styles from './CategoriesGrid.module.scss';

interface CategoriesGridProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  categories,
  onEdit,
  onDelete,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className={styles.emptyState}>
        <p>Загрузка категорий из CategoryService EJB...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Категории не найдены</p>
        <span>Создайте первую категорию, чтобы сгруппировать байки и товары</span>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          category={cat}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
