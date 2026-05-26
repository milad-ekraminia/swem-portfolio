import * as yup from 'yup';

export const userOrganizationProfileFilterInitialValues = {
  profileName: '',
};
export const userOrganizationProfileFilterResolver = yup.object({
  profileName: yup.string().nullable(),
});

export type userOrganizationProfileFilterInitialValuesTypes = yup.InferType<
  typeof userOrganizationProfileFilterResolver
>;
