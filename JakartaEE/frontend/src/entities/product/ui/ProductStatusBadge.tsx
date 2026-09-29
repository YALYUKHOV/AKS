import React from 'react';
import { Badge } from '@shared/ui/badge/Badge';

interface ProductStatusBadgeProps {
  quantity: number;
}

export const ProductStatusBadge: React.FC<ProductStatusBadgeProps> = ({ quantity }) => {
  if (quantity === 0) {
    return <Badge variant="danger" dot>Нет на складе</Badge>;
  }
  if (quantity < 10) {
    return <Badge variant="warning" dot>Мало ({quantity} шт.)</Badge>;
  }
  return <Badge variant="success" dot>В наличии ({quantity} шт.)</Badge>;
};
