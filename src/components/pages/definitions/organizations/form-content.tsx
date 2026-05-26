import { RegisterInput } from '@/components/ui/input/register-input/Input';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import { formatSelectOptionsWithExtraInfo } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';
import NgReBasedFields from './form-fields/ng-re-based-fields';
import NgSpecificFields from './form-fields/ng-specific-fields';
import OrganizationTypeFields from './form-fields/organization-type-fields';

const MemoOrganizationModalContent = ({
  errors,
  register,
  control,
  locationNames,
  locationNamesLoading,
  ng,
  re,
  isEdit,
  setValue,
  isLoading = false,
}: {
  errors: any;
  register: any;
  control: any;
  locationNames: any;
  locationNamesLoading: boolean;
  ng: number;
  re: number;
  isEdit: boolean;
  setValue: any;
  isLoading?: boolean;
}) => {
  const locationId = useWatch({
    control,
    name: 'locationId',
  });

  return (
    <div className="dv-organization-modal__content">
      <RegisterInput
        mainClass="dv-organization-modal__content-input-full"
        type="text"
        name="organizationName"
        label={getTranslatedValue('OrganizationName')}
        required
        autoFocus
        error={errors?.organizationName?.message}
        register={register}
      />

      <RegisterInput
        mainClass="dv-organization-modal__content-input-full"
        type="text"
        name="organizationDescription"
        label={getTranslatedValue('OrganizationDescription')}
        textarea={true}
        error={errors?.organizationDescription?.message}
        register={register}
      />
      <SearchableDropdown
        name="locationId"
        label={getTranslatedValue('LocationName')}
        searchParameterLabel="title"
        isRequiredInput
        options={formatSelectOptionsWithExtraInfo(locationNames)}
        selectedVal={
          locationId
            ? formatSelectOptionsWithExtraInfo(locationNames)?.find(
              (item: any) => item.value == locationId,
            )?.title
            : null
        }
        placeholder={getTranslatedValue('Search')}
        handleChange={(e: any) => {
          setValue('locationId', e);
        }}
        isLoading={locationNamesLoading}
        error={errors?.locationId?.message}
      />
      <RegisterInput
        type="text"
        name="coordinateInformation"
        label={getTranslatedValue('CoordinateInformation')}
        error={errors?.coordinateInformation?.message}
        register={register}
      />
      <NgReBasedFields
        register={register}
        control={control}
        setValue={setValue}
        errors={errors}
        ng={ng}
        re={re}
      />
      <OrganizationTypeFields
        control={control}
        register={register}
        errors={errors}
        isEdit={isEdit}
        setValue={setValue}
        isLoading={isLoading}
      />
      {ng == 1 && (
        <NgSpecificFields
          register={register}
          errors={errors}
          control={control}
          setValue={setValue}
        />
      )}
    </div>
  );
};

const OrganizationModalContent = memo(MemoOrganizationModalContent);

export default OrganizationModalContent;
