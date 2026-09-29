import { request } from '@shared/api/baseApi';
import { Category, CategoryPayload } from '../model/types';

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    return request<Category[]>('/categories');
  },

  getById: async (id: number): Promise<Category> => {
    return request<Category>(`/categories/${id}`);
  },

  create: async (data: CategoryPayload): Promise<Category> => {
    return request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: number, data: CategoryPayload): Promise<Category> => {
    return request<Category>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number): Promise<{ message: string }> => {
    return request<{ message: string }>(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};
