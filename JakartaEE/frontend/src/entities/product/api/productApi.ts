import { request } from '@shared/api/baseApi';
import { Product, ProductPayload } from '../model/types';

export const productApi = {
  getAll: async (categoryId?: number | null): Promise<Product[]> => {
    const query = categoryId && categoryId > 0 ? `?categoryId=${categoryId}` : '';
    return request<Product[]>(`/products${query}`);
  },

  getById: async (id: number): Promise<Product> => {
    return request<Product>(`/products/${id}`);
  },

  create: async (data: ProductPayload): Promise<Product> => {
    return request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: number, data: ProductPayload): Promise<Product> => {
    return request<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number): Promise<{ message: string }> => {
    return request<{ message: string }>(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};
