import React, { useState } from 'react';
import { Plus, RotateCw } from 'lucide-react';
import { Button } from '@shared/ui/button/Button';
import { Category, CategoryPayload } from '@entities/category/model/types';
import { CategoriesGrid } from '@widgets/categories-grid/ui/CategoriesGrid';
import { CategoryModal } from '@features/category-crud/ui/CategoryModal';
import styles from './CategoriesPage.module.scss';

interface CategoriesPageProps {
  categories: Category[];
  loading: boolean;
  onRefresh: () => void;
  onCreateCategory: (data: CategoryPayload) => Promise<void>;
  onUpdateCategory: (id: number, data: CategoryPayload) => Promise<void>;
  onDeleteCategory: (id: number) => Promise<void>;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  categories,
  loading,
  onRefresh,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: CategoryPayload, id?: number) => {
    if (id) {
      await onUpdateCategory(id, data);
    } else {
      await onCreateCategory(data);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Справочники</h1>
            <span className={styles.countBadge}>{categories.length}</span>
          </div>
          <p className={styles.subtitle}>
            Справочник категорий товаров и техники (Связь @OneToMany с сущностью Product)
          </p>
        </div>

        <div className={styles.actionsBar}>
          <Button
            variant="secondary"
            icon={<RotateCw size={16} />}
            onClick={onRefresh}
            title="Обновить"
          >
            Обновить
          </Button>

          <Button
            variant="primary"
            icon={<Plus size={18} />}
            onClick={handleOpenCreate}
          >
            Новая категория
          </Button>
        </div>
      </div>

      <CategoriesGrid
        categories={categories}
        onEdit={handleOpenEdit}
        onDelete={onDeleteCategory}
        loading={loading}
      />

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialCategory={editingCategory}
      />
    </div>
  );
};
