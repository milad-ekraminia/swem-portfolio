import * as yup from 'yup';
import { warehouseInitialValuesTypes } from '@/types/pages/inventory-management/warehouses';

export const warehouseInitialValues: warehouseInitialValuesTypes = {
  name: '',
  status: false,
  coordinate: '',
  address: '',
  warehouseId: undefined,
  isDiscard: false,
};

export const warehouserResolver = yup.object({
  warehouseId: yup.number().optional(),
  name: yup.string().required(),
  address: yup.string().required(),
  status: yup.bool().required(),
  isDiscard: yup.bool().required(),
  coordinate: yup.string().optional(),
});

export const updateWarehouserResolver = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  status: yup.bool().required(),
  coordinate: yup.string().optional(),
  // warehouseId: yup.number().optional(),
  isDiscard: yup.boolean().optional(),
  id: yup.number().optional(),
});
