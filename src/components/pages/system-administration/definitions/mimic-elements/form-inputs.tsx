import { RegisterInput } from '@/components/ui/input/register-input/Input';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { fileSelectionTypeOptions } from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';

export const formInputs = (
  control: any,
  register: any,
  errors: any,
  elements: any,
  isUpdate: boolean,
  setValue: any,
  {
    mimicElementBitZeroElementId,
    mimicElementDefaultElementId,
    mimicElementBitOneElementId,
    mimicElementBitOneZeroElementId,
    mimicElementBitZeroOneElementId,
  }: {
    mimicElementBitZeroElementId: any;
    mimicElementDefaultElementId: any;
    mimicElementBitOneElementId: any;
    mimicElementBitOneZeroElementId: any;
    mimicElementBitZeroOneElementId: any;
  },
) => {
  return {
    mimicElementName: (
      <RegisterInput
        name="mimicElementName"
        label={getTranslatedValue('MimicElementName')}
        placeholder={getTranslatedValue('MimicElementName')}
        type="text"
        error={errors?.mimicElementName?.message}
        register={register}
        required={true}
      />
    ),
    fileSelectionType: (
      <RegisterSelectInput
        name="fileSelectionType"
        label={getTranslatedValue('FileSelectionType')}
        options={fileSelectionTypeOptions}
        register={register}
        placeholder={getTranslatedValue('FileSelectionType')}
        control={control}
        disabled={isUpdate}
        error={errors?.fileSelectionType?.message}
      />
    ),
    mimicElementDefaultElementId: (
      <SearchableDropdown
        handleChange={(value: any) => {
          setValue('mimicElementDefaultElementId', value);
        }}
        placeholder={getTranslatedValue('MimicElementDefaultElementId')}
        label={getTranslatedValue('MimicElementDefaultElementId')}
        name="mimicElementDefaultElementId"
        options={elements}
        selectedVal={
          mimicElementDefaultElementId
            ? elements?.find(
              (item: any) => item.value == mimicElementDefaultElementId,
            )?.title
            : null
        }
        error={errors?.mimicElementDefaultElementId?.message}
        searchParameterLabel={'title'}
      />
    ),
    mimicElementBitZeroElementId: (
      <SearchableDropdown
        handleChange={(value: any) => {
          setValue('mimicElementBitZeroElementId', value);
        }}
        placeholder={getTranslatedValue('MimicElementBitZeroElementId')}
        label={getTranslatedValue('MimicElementBitZeroElementId')}
        name="mimicElementBitZeroElementId"
        options={elements}
        selectedVal={
          mimicElementBitZeroElementId
            ? elements?.find(
              (item: any) => item.value == mimicElementBitZeroElementId,
            )?.title
            : null
        }
        error={errors?.mimicElementBitZeroElementId?.message}
        searchParameterLabel={'title'}
      />
    ),
    mimicElementBitOneElementId: (
      <SearchableDropdown
        handleChange={(value: any) => {
          setValue('mimicElementBitOneElementId', value);
        }}
        placeholder={getTranslatedValue('MimicElementBitOneElementId')}
        label={getTranslatedValue('MimicElementBitOneElementId')}
        name="mimicElementBitOneElementId"
        options={elements}
        selectedVal={
          mimicElementBitOneElementId
            ? elements?.find(
              (item: any) => item.value == mimicElementBitOneElementId,
            )?.title
            : null
        }
        error={errors?.mimicElementBitOneElementId?.message}
        searchParameterLabel={'title'}
      />
    ),
    mimicElementBitOneZeroElementId: (
      <SearchableDropdown
        handleChange={(value: any) => {
          setValue('mimicElementBitOneZeroElementId', value);
        }}
        placeholder={getTranslatedValue('MimicElementBitOneZeroElementId')}
        label={getTranslatedValue('MimicElementBitOneZeroElementId')}
        name="mimicElementBitOneZeroElementId"
        options={elements}
        selectedVal={
          mimicElementBitOneZeroElementId
            ? elements?.find(
              (item: any) => item.value == mimicElementBitOneZeroElementId,
            )?.title
            : null
        }
        error={errors?.mimicElementBitOneZeroElementId?.message}
        searchParameterLabel={'title'}
      />
    ),
    mimicElementBitZeroOneElementId: (
      <SearchableDropdown
        handleChange={(value: any) => {
          setValue('mimicElementBitZeroOneElementId', value);
        }}
        placeholder={getTranslatedValue('MimicElementBitZeroOneElementId')}
        label={getTranslatedValue('MimicElementBitZeroOneElementId')}
        name="mimicElementBitZeroOneElementId"
        options={elements}
        selectedVal={
          mimicElementBitZeroOneElementId
            ? elements?.find(
              (item: any) => item.value == mimicElementBitZeroOneElementId,
            )?.title
            : null
        }
        error={errors?.mimicElementBitZeroOneElementId?.message}
        searchParameterLabel={'title'}
      />
    ),
  };
};
