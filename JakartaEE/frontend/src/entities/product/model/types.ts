export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  sku: string;
  categoryId: number;
  categoryName?: string;
  createdAt?: string;
}

export interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  sku: string;
  categoryId: number;
}
