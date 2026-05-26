import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as Yup from 'yup';

export const consumableSchema = Yup.object({
  description: Yup.string().nullable(),
  amount: Yup.number().required(),
  inventoryId: Yup.string().nullable(),
  productId: Yup.number().required(),
});

export type consumableSchemaType = Yup.InferType<typeof consumableSchema>;

export const imageSchema = Yup.object({
  image: Yup.string().nullable(),
  inventoryId: Yup.number().nullable(),
});

export const addInventorySchema = Yup.object({
  inventoryId: Yup.number(),
  productId: Yup.number()
    .test(
      'non-zero',
      getTranslatedValue('Product') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
      (value: number | undefined) => value !== 0,
    )
    .required(
      `${getTranslatedValue('Product')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  // when amount value clear from input field get this error : amount must be a `number` type, but the final value was: `NaN` (cast from the value `""`).

  amount: Yup.number()
    .transform((value) => (isNaN(value) || value === '' ? undefined : value))
    .required(
      `${getTranslatedValue('Amount')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  warehouseId: Yup.number()
    .test((value) => value !== 0)
    .required(
      `${getTranslatedValue('Warehouse')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  serialNumber: Yup.string(),
  inUse: Yup.boolean().nullable(),
  guaranteeStart: Yup.string().nullable(),
  guaranteeEnd: Yup.string().nullable(),
  description: Yup.string().optional(),
  concurrencyStamp: Yup.string(),
  consumables: Yup.array().of(consumableSchema).nullable(),
  inventoryImages: Yup.array().of(imageSchema).nullable(),
});

export type addInventorySchemaType = Yup.InferType<typeof addInventorySchema>;
