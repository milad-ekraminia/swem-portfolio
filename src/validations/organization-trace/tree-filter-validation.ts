import * as yup from 'yup';

// Extract allowed values

export const treeFilterInitialValues = {
  deviceStatus: null,
  treeFilterLevels: [],
};

export const treeFilterResolver = yup.object({
  treeFilterLevels: yup.array().of(yup.string()).nullable().notRequired(),

  deviceStatus: yup.string().nullable().notRequired(),
});

export type treeFilterInitialValuesTypes = yup.InferType<
  typeof treeFilterResolver
>;
