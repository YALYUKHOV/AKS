import React, { useState, useMemo } from 'react';
import { Plus, RotateCw } from 'lucide-react';
import { Button } from '@shared/ui/button/Button';
import { Product, ProductPayload } from '@entities/product/model/types';
import { Category } from '@entities/category/model/types';
import { ProductsTable } from '@widgets/products-table/ui/ProductsTable';
import { MetricsBar } from '@widgets/metrics-bar/ui/MetricsBar';
import { ProductFilters } from '@features/product-filters/ui/ProductFilters';
import { ProductModal } from '@features/product-crud/ui/ProductModal';
import styles from './ProductsPage.module.scss';

interface ProductsPageProps {
  products: Product[];
  categories: Category[];
  loading: boolean;
  onRefresh: () => void;
  onCreateProduct: (data: ProductPayload) => Promise<void>;
  onUpdateProduct: (id: number, data: ProductPayload) => Promise<void>;
  onDeleteProduct: (id: number) => Promise<void>;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  categories,
  loading,
  onRefresh,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategoryId) {
      result = result.filter((p) => p.categoryId === selectedCategoryId);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    return result;
  }, [products, selectedCategoryId, search]);

  const totalValue = useMemo(() => {
    return products.reduce((acc, p) => acc + (Number(p.price) || 0) * (Number(p.quantity) || 0), 0);
  }, [products]);

  const lowStockCount = useMemo(() => {
    return products.filter((p) => p.quantity < 10).length;
  }, [products]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: ProductPayload, id?: number) => {
    if (id) {
      await onUpdateProduct(id, data);
    } else {
      await onCreateProduct(data);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div className={styles.titleArea}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Каталог товаров и техники</h1>
            <span className={styles.countBadge}>{products.length}</span>
          </div>
          <p className={styles.subtitle}>
            Управление складскими запасами компьютерной техники, гаджетов и комплектующих
          </p>
        </div>

        <div className={styles.actionsBar}>
          <Button
            variant="secondary"
            icon={<RotateCw size={16} />}
            onClick={onRefresh}
            title="Синхронизировать с базой данных"
          >
            Обновить
          </Button>

          <Button
            variant="primary"
            icon={<Plus size={18} />}
            onClick={handleOpenCreate}
          >
            Добавить товар
          </Button>
        </div>
      </div>

      <MetricsBar
        totalItems={products.length}
        totalCategories={categories.length}
        totalValue={totalValue}
        lowStockCount={lowStockCount}
      />

      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
        categories={categories}
        searchPlaceholder="Поиск товара по названию, артикулу (SKU), описанию..."
      />

      <ProductsTable
        products={filteredProducts}
        onEdit={handleOpenEdit}
        onDelete={onDeleteProduct}
        loading={loading}
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialProduct={editingProduct}
        categories={categories}
      />
    </div>
  );
};
