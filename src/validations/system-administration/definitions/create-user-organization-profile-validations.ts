import { getCookie } from '@/helpers/cookies';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const createUserOrganizationProfileInitialValues = {
  profileName: '',
};
export const createUserOrganizationProfileResolver = yup.object({
  profileName: yup
    .string()
    .required(
      `${getTranslatedValue(
        'ProfileName',
      )} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    )
    .min(
      4,
      `${getTranslatedValue(
        'ProfileName',
      )} ${getCookie('CultureName') === 'en' ? 'must be a string with a minimum length of 4 and a maximum length of 100.' : 'alanı en az 4, en fazla 100 uzunluğunda bir metin olmalıdır.'}`,
    )
    .max(
      100,
      `${getTranslatedValue(
        'ProfileName',
      )} ${getCookie('CultureName') === 'en' ? 'must be a string with a minimum length of 4 and a maximum length of 100.' : 'alanı en az 4, en fazla 100 uzunluğunda bir metin olmalıdır.'}`,
    ),
});

export type createUserOrganizationProfileInitialValuesTypes = yup.InferType<
  typeof createUserOrganizationProfileResolver
>;
