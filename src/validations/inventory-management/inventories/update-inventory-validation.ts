import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const editInventoryResolver = yup.object({
  productId: yup
    .number()
    .test(
      'non-zero',
      'Value must not be empty',
      (value: number | undefined) => value !== 0,
    )
    .required(
      `${getTranslatedValue('ProductId')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  warehouseId: yup
    .number()
    .test(
      (value) => value !== 0, // Ensure the user has selected a valid option
    )
    .required(
      `${getTranslatedValue('Warehouse')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  serialNumber: yup.string().nullable(),
  inUse: yup.boolean().nullable(),
  guaranteeStart: yup.string().nullable(),
  guaranteeEnd: yup.string().nullable(),
  description: yup.string().optional(),
});

export const addConsumableResolver = yup.object({
  productId: yup
    .number()
    .test(
      (value) => value !== 0, // Ensure the user has selected a valid option
    )
    .required(
      `${getTranslatedValue('ProductId')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  amount: yup
    .number()
    .transform((value) => (isNaN(value) || value === '' ? undefined : value)) // Convert empty strings to undefined
    .optional(),
  inventoryId: yup
    .number()
    .test(
      (value) => value !== 0, // Ensure the user has selected a valid option
    )
    .required(
      `${getTranslatedValue('InventoryId')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  description: yup.string().optional(),
});
