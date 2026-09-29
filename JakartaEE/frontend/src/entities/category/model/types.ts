export interface Category {
  id: number;
  name: string;
  description?: string;
  productsCount?: number;
  createdAt?: string;
}

export interface CategoryPayload {
  name: string;
  description?: string;
}
