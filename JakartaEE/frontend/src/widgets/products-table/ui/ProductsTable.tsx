import React, { useState } from 'react';
import { Product } from '@entities/product/model/types';
import { ProductStatusBadge } from '@entities/product/ui/ProductStatusBadge';
import { Button } from '@shared/ui/button/Button';
import { Badge } from '@shared/ui/badge/Badge';
import { Pagination } from '@shared/ui/pagination/Pagination';
import { formatCurrency } from '@shared/lib/formatters';
import { Edit2, Trash2 } from 'lucide-react';
import styles from './ProductsTable.module.scss';

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onEdit,
  onDelete,
  loading = false,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const startIndex = (page - 1) * pageSize;
  const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

  return (
    <div className={styles.tableCard}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Наименование и артикул</th>
              <th>Категория</th>
              <th>Описание</th>
              <th>Цена</th>
              <th>Остаток</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className={styles.emptyState}>
                  <p>Загрузка данных из GlassFish 7 (EJB & JPA)...</p>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.emptyState}>
                  <p>Товары не найдены</p>
                  <span>Добавьте первый товар или измените параметры поиска</span>
                </td>
              </tr>
            ) : (
              paginatedProducts.map((p) => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>
                    <div className={styles.productTitle}>
                      <span>{p.name}</span>
                      <span className={styles.skuTag}>{p.sku}</span>
                    </div>
                  </td>
                  <td>
                    <Badge variant="neutral">{p.categoryName || 'Без категории'}</Badge>
                  </td>
                  <td>
                    <div className={styles.desc} title={p.description}>
                      {p.description || '—'}
                    </div>
                  </td>
                  <td>
                    <span className={styles.price}>{formatCurrency(p.price)}</span>
                  </td>
                  <td>
                    <ProductStatusBadge quantity={p.quantity} />
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Button
                        size="sm"
                        variant="ghost"
                        icon={<Edit2 size={14} />}
                        onClick={() => onEdit(p)}
                        title="Редактировать"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        icon={<Trash2 size={14} />}
                        onClick={() => onDelete(p.id)}
                        title="Удалить"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.tableFooter}>
        <Pagination
          total={products.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[10, 20, 50]}
        />
      </div>
    </div>
  );
};
