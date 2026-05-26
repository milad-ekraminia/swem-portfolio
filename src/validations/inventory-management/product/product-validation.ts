import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';
import { newProductInitialValues } from '@/types/pages/inventory-management/inventory-management';

export const productInitialValues: newProductInitialValues = {
  productName: '',
  barcodeNumber: '',
  currentStockAmount: 0,
  purchaseNumber: null,
  status: true,
  isConsumable: false,
  stockNumber: '',
  productBrandId: 1,
  productBrandModelId: 0,
  productManufacturerId: 0,
  productTypeId: 0,
};
export const newProductResolver = yup.object({
  productName: yup
    .string()
    .required(
      `${getTranslatedValue('ProductName')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  barcodeNumber: yup
    .string()
    .required(
      `${getTranslatedValue('BarcodeNumber')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  currentStockAmount: yup.number().optional().default(0), // Optional
  purchaseNumber: yup.number().nullable().optional().default(null), // Optional
  status: yup.boolean().optional().default(false), // Optional
  isConsumable: yup.boolean().optional().default(false), // Optional
  stockNumber: yup.string().optional(), // Optional
  productBrandId: yup
    .number()
    .required(
      `${getTranslatedValue('ProductBrand')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  productBrandModelId: yup
    .number()
    .required(
      `${getTranslatedValue('ProductBrandModel')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  productManufacturerId: yup
    .number()
    .required(
      `${getTranslatedValue('ProductManufacturer')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  productTypeId: yup
    .number()
    .required(
      `${getTranslatedValue('ProductType')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
});
export type newProductInitialValuesTypes = yup.InferType<
  typeof newProductResolver
>;

// ********************* EDIT *************************

export const editProductResolver = yup.object({
  productId: yup.number().required(),
  productName: yup
    .string()
    .required(
      `${getTranslatedValue('ProductName')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  barcodeNumber: yup
    .string()
    .required(
      `${getTranslatedValue('BarcodeNumber')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  currentStockAmount: yup.number().optional().default(0), // Optional
  purchaseNumber: yup.number().nullable().optional().default(null), // Optional
  status: yup.boolean().optional().default(false), // Optional
  isConsumable: yup.boolean().optional().default(false), // Optional
  stockNumber: yup.string().optional(), // Optional
  productBrandId: yup
    .number()
    .required(
      `${getTranslatedValue('ProductBrand')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  productBrandModelId: yup
    .number()
    .required(
      `${getTranslatedValue('ProductBrandModel')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  productManufacturerId: yup
    .number()
    .required(
      `${getTranslatedValue('ProductManufacturer')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  productTypeId: yup
    .number()
    .required(
      `${getTranslatedValue('ProductType')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
});
export type editProductInitialValuesTypes = yup.InferType<
  typeof editProductResolver
>;
