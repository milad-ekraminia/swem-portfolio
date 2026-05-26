import { ProductBrand } from './product-brands';

export interface ProductBrandModel {
  productBrand: ProductBrand;

  productBrandModel: {
    modelName: string;
    id: number;
    concurrencyStamp: string;
  };
}
export interface ProductBrandModelFormData {
  id: number;
  modelName: string;
  concurrencyStamp: string;
  productBrandId: number;
}
