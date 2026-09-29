import React, { useState, useEffect } from 'react';
import { Modal } from '@shared/ui/modal/Modal';
import { Button } from '@shared/ui/button/Button';
import { Product, ProductPayload } from '@entities/product/model/types';
import { Category } from '@entities/category/model/types';
import styles from './ProductModal.module.scss';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductPayload, id?: number) => Promise<void>;
  initialProduct?: Product | null;
  categories: Category[];
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialProduct,
  categories,
}) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setSku(initialProduct.sku);
      setCategoryId(initialProduct.categoryId);
      setPrice(initialProduct.price);
      setQuantity(initialProduct.quantity);
      setDescription(initialProduct.description || '');
    } else {
      setName('');
      setSku('');
      setCategoryId(categories.length > 0 ? categories[0].id : '');
      setPrice('');
      setQuantity('');
      setDescription('');
    }
  }, [initialProduct, categories, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return;

    setLoading(true);
    try {
      await onSubmit(
        {
          name: name.trim(),
          sku: sku.trim().toUpperCase(),
          categoryId: Number(categoryId),
          price: Number(price) || 0,
          quantity: Number(quantity) || 0,
          description: description.trim(),
        },
        initialProduct?.id
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
      title={initialProduct ? `Редактирование: ${initialProduct.name}` : 'Добавить товар в каталог'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={loading || !name || !sku || !categoryId}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={`${styles.formGroup} ${styles.flex2}`}>
            <label htmlFor="prodName">Наименование товара / модели *</label>
            <input
              id="prodName"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: Ноутбук ThinkPad T14 Gen 4"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="prodSku">Артикул (SKU) *</label>
            <input
              id="prodSku"
              type="text"
              required
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="LNV-TP-T14G4"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="prodCat">Категория *</label>
            <select
              id="prodCat"
              required
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              <option value="">Выберите категорию</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="prodPrice">Цена (₽) *</label>
            <input
              id="prodPrice"
              type="number"
              min="0"
              step="0.01"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0.00"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="prodQty">Остаток на складе (шт.) *</label>
            <input
              id="prodQty"
              type="number"
              min="0"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="prodDesc">Технические характеристики и описание</label>
          <textarea
            id="prodDesc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Процессор, объем ОЗУ и SSD, интерфейсы подключения, комплектация..."
          />
        </div>
      </form>
    </Modal>
  );
};
