import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar, NavTab } from '@widgets/sidebar/ui/Sidebar';
import { Header } from '@widgets/header/ui/Header';
import { ProductsPage } from '@pages/products/ui/ProductsPage';
import { CategoriesPage } from '@pages/categories/ui/CategoriesPage';
import { DashboardPage } from '@pages/dashboard/ui/DashboardPage';
import { ArchitecturePage } from '@pages/architecture/ui/ArchitecturePage';
import { useTheme } from './providers/ThemeProvider';
import { useToast } from './providers/ToastProvider';
import { Product, ProductPayload } from '@entities/product/model/types';
import { Category, CategoryPayload } from '@entities/category/model/types';
import { productApi } from '@entities/product/api/productApi';
import { categoryApi } from '@entities/category/api/categoryApi';

export const App: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<NavTab>('products');

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [serverOnline, setServerOnline] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [cats, prods] = await Promise.all([
        categoryApi.getAll().catch(() => []),
        productApi.getAll().catch(() => []),
      ]);
      setCategories(cats);
      setProducts(prods);
      setServerOnline(true);
    } catch (err: any) {
      console.warn('Сервер недоступен или вернул ошибку:', err);
      setServerOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateProduct = async (data: ProductPayload) => {
    try {
      await productApi.create(data);
      showToast('Товар успешно добавлен в каталог', 'success');
      await loadData();
    } catch (err: any) {
      showToast(err.message || 'Ошибка создания товара', 'error');
      throw err;
    }
  };

  const handleUpdateProduct = async (id: number, data: ProductPayload) => {
    try {
      await productApi.update(id, data);
      showToast('Данные товара успешно обновлены', 'success');
      await loadData();
    } catch (err: any) {
      showToast(err.message || 'Ошибка обновления товара', 'error');
      throw err;
    }
  };

  const handleDeleteProduct = async (id: number) => {
    const item = products.find((p) => p.id === id);
    const title = item ? item.name : `#${id}`;
    if (!window.confirm(`Вы уверены, что хотите списать/удалить "${title}"?`)) return;

    try {
      await productApi.delete(id);
      showToast('Товар успешно удален из базы', 'success');
      await loadData();
    } catch (err: any) {
      showToast(err.message || 'Ошибка удаления товара', 'error');
    }
  };

  const handleCreateCategory = async (data: CategoryPayload) => {
    try {
      await categoryApi.create(data);
      showToast('Категория успешно создана', 'success');
      await loadData();
    } catch (err: any) {
      showToast(err.message || 'Ошибка создания категории', 'error');
      throw err;
    }
  };

  const handleUpdateCategory = async (id: number, data: CategoryPayload) => {
    try {
      await categoryApi.update(id, data);
      showToast('Категория обновлена', 'success');
      await loadData();
    } catch (err: any) {
      showToast(err.message || 'Ошибка обновления категории', 'error');
      throw err;
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const item = categories.find((c) => c.id === id);
    const title = item ? item.name : `#${id}`;
    if (!window.confirm(`Вы уверены, что хотите удалить категорию "${title}"?`)) return;

    try {
      await categoryApi.delete(id);
      showToast('Категория успешно удалена', 'success');
      await loadData();
    } catch (err: any) {
      showToast(err.message || 'Ошибка удаления категории', 'error');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <ProductsPage
            products={products}
            categories={categories}
            loading={loading}
            onRefresh={loadData}
            onCreateProduct={handleCreateProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );

      case 'categories':
        return (
          <CategoriesPage
            categories={categories}
            loading={loading}
            onRefresh={loadData}
            onCreateCategory={handleCreateCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        );

      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={setActiveTab}
            productsCount={products.length}
            categoriesCount={categories.length}
          />
        );

      case 'architecture':
        return <ArchitecturePage />;

      default:
        return (
          <ProductsPage
            products={products}
            categories={categories}
            loading={loading}
            onRefresh={loadData}
            onCreateProduct={handleCreateProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        productsCount={products.length}
        categoriesCount={categories.length}
        serverOnline={serverOnline}
      />

      <div className="main-wrapper">
        <Header
          theme={theme}
          onThemeChange={setTheme}
        />

        <main className="content-container">{renderContent()}</main>
      </div>
    </div>
  );
};
