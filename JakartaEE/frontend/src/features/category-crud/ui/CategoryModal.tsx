import React, { useState, useEffect } from 'react';
import { Modal } from '@shared/ui/modal/Modal';
import { Button } from '@shared/ui/button/Button';
import { Category, CategoryPayload } from '@entities/category/model/types';
import styles from './CategoryModal.module.scss';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryPayload, id?: number) => Promise<void>;
  initialCategory?: Category | null;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialCategory,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setName(initialCategory.name);
      setDescription(initialCategory.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [initialCategory, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await onSubmit(
        {
          name: name.trim(),
          description: description.trim(),
        },
        initialCategory?.id
      );
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialCategory ? `Редактирование: ${initialCategory.name}` : 'Добавить категорию товаров'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={loading || !name.trim()}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="catName">Название категории *</label>
          <input
            id="catName"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например: Ноутбуки и ПК, Комплектующие"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="catDesc">Описание</label>
          <textarea
            id="catDesc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Краткое описание группы компьютерной техники..."
          />
        </div>
      </form>
    </Modal>
  );
};
