import React from 'react';
import { Category } from '../model/types';
import { Badge } from '@shared/ui/badge/Badge';
import { Button } from '@shared/ui/button/Button';
import { Edit2, Trash2 } from 'lucide-react';
import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.card}>
      <div>
        <div className={styles.top}>
          <h4 className={styles.title}>{category.name}</h4>
          <Badge variant="neutral">ID: {category.id}</Badge>
        </div>
        <p className={styles.desc}>{category.description || 'Описание отсутствует'}</p>
      </div>

      <div className={styles.bottom}>
        <span>
          Товаров: <strong>{category.productsCount ?? 0}</strong>
        </span>
        <div className={styles.actions}>
          <Button
            size="sm"
            variant="ghost"
            icon={<Edit2 size={14} />}
            onClick={() => onEdit(category)}
          >
            Изм.
          </Button>
          <Button
            size="sm"
            variant="danger"
            icon={<Trash2 size={14} />}
            onClick={() => onDelete(category.id)}
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};
