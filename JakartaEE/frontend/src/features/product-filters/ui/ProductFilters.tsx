import React from 'react';
import { Search } from 'lucide-react';
import { Category } from '@entities/category/model/types';
import styles from './ProductFilters.module.scss';

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategoryId: number | null;
  onCategoryChange: (id: number | null) => void;
  categories: Category[];
  searchPlaceholder?: string;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  search,
  onSearchChange,
  selectedCategoryId,
  onCategoryChange,
  categories,
  searchPlaceholder = 'Поиск по названию, артикулу...',
}) => {
  return (
    <div className={styles.filtersBar}>
      <div className={styles.searchBox}>
        <Search size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="catFilter">Категория:</label>
        <select
          id="catFilter"
          value={selectedCategoryId ?? ''}
          onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Все категории</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
