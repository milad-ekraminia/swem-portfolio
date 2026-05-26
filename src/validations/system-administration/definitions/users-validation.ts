import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const usersInitialValues = {
  password: '',
  sendConfirmationEmail: false,
  emailConfirmed: false,
  phoneNumberConfirmed: false,
  userName: '',
  name: '',
  surname: '',
  email: '',
  phoneNumber: undefined,
  isActive: true,
  shouldChangePasswordOnNextLogin: false,
  lockoutEnabled: true,
  roleNames: [],
  organizationUnitIds: [],
  extraProperties: {
    AppUserMimicProfileId: undefined,
    AppUserMimicProfileId_Text: '',
    AppUserOrganizationProfileId: undefined,
    AppUserOrganizationId: undefined,
    AppUserOrganizationProfileId_Text: '',
    AppUserOrganizationId_Text: '',
  },
};

export const usersResolver = ({ isEditMode }: { isEditMode: boolean }) => {
  return yup.object({
    password: yup.string().when([], {
      is: () => !isEditMode,
      then: (schema) =>
        schema.required(
          `${getTranslatedValue('Password', 'AbpIdentity.texts')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
    sendConfirmationEmail: yup.boolean(),
    emailConfirmed: yup.boolean(),
    phoneNumberConfirmed: yup.boolean(),
    userName: yup
      .string()
      .required(
        `${getTranslatedValue('UserName', 'AbpIdentity.texts')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
      ),
    name: yup.string().nullable(),
    surname: yup.string().nullable(),
    email: yup
      .string()
      .required(
        `${getTranslatedValue('Email', 'AbpIdentity.texts')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
      ),
    phoneNumber: yup.string().nullable(),
    isActive: yup.boolean(),
    shouldChangePasswordOnNextLogin: yup.boolean(),
    lockoutEnabled: yup.boolean(),
    roleNames: yup.array().of(yup.string()),
    organizationUnitIds: yup.array().of(yup.string()),
    extraProperties: yup.object({
      AppUserMimicProfileId: yup
        .string()
        .required(
          `${getTranslatedValue('AppUserMimicProfileId')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
        ),
      AppUserMimicProfileId_Text: yup.string().nullable(),
      AppUserOrganizationProfileId: yup
        .string()
        .required(
          `${getTranslatedValue('AppUserOrganizationProfileId')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
        ),
      AppUserOrganizationId: yup
        .string()
        .required(
          `${getTranslatedValue('AppUserOrganizationId')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
        ),
      AppUserOrganizationProfileId_Text: yup.string().nullable(),
      AppUserOrganizationId_Text: yup.string().nullable(),
    }),
  });
};

export type usersValuesTypes = yup.InferType<ReturnType<typeof usersResolver>>;

export const lockInitialValues = {
  date: '',
};

export const lockResolver = yup.object({
  date: yup
    .string()
    .required(
      `${getTranslatedValue('LockoutEnd', 'AbpIdentity.texts')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
});

export type lockValuesTypes = yup.InferType<typeof lockResolver>;

// filter modal :
export const userFilterModalInitialValues = {
  RoleId: '',
  OrganizationUnitId: '',
  userName: '',
  phoneNumber: undefined,
  MinCreationTime: '',
  MaxCreationTime: '',
  MinModifitionTime: '',
  MaxModifitionTime: '',
  EmailAddress: '',
  Name: '',
  Surname: '',
  NotActive: false,
  EmailConfirmed: false,
  IsLockedOut: false,
  IsExternal: false,
};

export const userFilterModalResolver = yup.object({
  RoleId: yup.string(),
  OrganizationUnitId: yup.string(),
  userName: yup.string(),
  phoneNumber: yup
    .number()
    .transform((_value, originalValue) => {
      return originalValue === '' ? undefined : Number(originalValue);
    })
    .typeError(
      `${getTranslatedValue('PhoneNumber', 'AbpIdentity.texts')} ${getTranslatedValue('MustBeNumber', 'AbpIdentity.texts')}`,
    ),
  MinCreationTime: yup.string(),
  MaxCreationTime: yup.string(),
  MinModifitionTime: yup.string(),
  MaxModifitionTime: yup.string(),
  EmailAddress: yup.string(),
  Name: yup.string(),
  Surname: yup.string(),
  NotActive: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue === '') return undefined;
      return value;
    })
    .notRequired()
    .nullable(),
  EmailConfirmed: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue === '') return undefined;
      return value;
    })
    .notRequired()
    .nullable(),
  IsLockedOut: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue === '') return undefined;
      return value;
    })
    .notRequired()
    .nullable(),
  IsExternal: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue === '') return undefined;
      return value;
    })
    .notRequired()
    .nullable(),
});

export type userFilterModalValuesTypes = yup.InferType<
  typeof userFilterModalResolver
>;

export const claimInitialValues = {
  userId: '',
  claimValue: '',
  claimType: '',
};

export const claimResolver = yup.object({
  userId: yup.string(),
  claimValue: yup.string(),
  claimType: yup.string(),
});

export type claimValuesTypes = yup.InferType<typeof claimResolver>;
