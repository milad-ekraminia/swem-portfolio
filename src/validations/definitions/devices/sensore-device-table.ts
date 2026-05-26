import * as yup from 'yup';

export const deviceSensorTableSchema = yup.object({
  labelId: yup.number().required(),
  pin_Nr: yup.number().required(),
  description: yup.string().required(),
  unit: yup.string().required(),
});

export type deviceSensorTableSchemaType = yup.InferType<
  typeof deviceSensorTableSchema
>;
