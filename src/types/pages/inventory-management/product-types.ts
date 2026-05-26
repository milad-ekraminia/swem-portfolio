import { ProductUnit } from './product-units';

export interface ProductType {
  productType: {
    id: string;
    name: string;
    description: string;
  };
  productUnit: ProductUnit | null;
}
export interface ProductTypeFormData {
  id: string;
  name: string;
  description: string;
  productUnitId: number;
}
