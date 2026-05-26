import { plantEnergyTypeOptions } from '@/enum-data/definitions/organizations-data';
import { formatSelectOptionsWithoutItems } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';
import {
  fetchMimicDiagramLookup,
  fetchPlantDevicesLookup,
  fetchPlantSensorDeviceLookup,
} from '@/services/definitions/organizations/organizations-api';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import PlantDetailField from './plant-detail-field';

const OrganizationTypeFields = ({
  control,
  register,
  errors,
  isEdit,
  setValue,
  isLoading = false,
}: {
  control: any;
  register: any;
  errors: any;
  isEdit: boolean;
  isLoading?: boolean;
  setValue: any;
}) => {
  const orgTypeId = useWatch({
    control,
    name: 'organizationType',
  });

  const orgId =
    useWatch({
      control,
      name: 'organizationParentId',
    }) ?? 0;

  const { data: plantSensorDevice, isLoading: plantSensorDeviceLoading } =
    useQuery({
      queryKey: ['Plant Sensor Device Lookup', orgId],
      queryFn: () => fetchPlantSensorDeviceLookup(orgId),
      retry: false,
    });

  const { data: plantDevicesLookup, isLoading: plantDevicesLookupLoading } =
    useQuery({
      queryKey: ['Plant Devices Lookup', orgId],
      queryFn: () => fetchPlantDevicesLookup(orgId),
      retry: false,
    });

  const { data: mimicDiagramLookup, isLoading: mimicDiagramLookupLoading } =
    useQuery({
      queryKey: ['Mimic Diagram Lookup', orgId],
      queryFn: () => fetchMimicDiagramLookup(orgId),
      retry: false,
    });

  const organizationPlantMimicDiagramId = useWatch({
    control,
    name: 'organizationPlantMimicDiagramId',
  });

  return (
    <>
      {(orgTypeId == 3 || orgTypeId == 4) && (
        <RegisterSelectInput
          mainClass="dv-organization-modal__content-input-full"
          label={getTranslatedValue('OrganizationPlantEnergyType')}
          name="organizationPlantEnergyType"
          options={plantEnergyTypeOptions?.map((item) => ({
            value: item?.value,
            title: getTranslatedValue('Enum:PlantEnergyType.' + item?.title),
          }))}
          error={errors?.organizationPlantEnergyType?.message}
          register={register}
          control={control}
        />
      )}
      {orgTypeId == 3 && isEdit && (
        <>
          <RegisterSelectInput
            isLoading={plantDevicesLookupLoading}
            label={getTranslatedValue('OrganizationPlantLowVoltageDeviceId')}
            name="organizationPlantLowVoltageDeviceId"
            options={formatSelectOptionsWithoutItems(plantDevicesLookup)}
            error={errors?.organizationPlantLowVoltageDeviceId?.message}
            register={register}
            control={control}
          />

          <RegisterSelectInput
            isLoading={plantDevicesLookupLoading}
            label={getTranslatedValue('OrganizationPlantMediumVoltageDeviceId')}
            name="organizationPlantMediumVoltageDeviceId"
            options={formatSelectOptionsWithoutItems(plantDevicesLookup)}
            error={errors?.organizationPlantMediumVoltageDeviceId?.message}
            register={register}
            control={control}
          />

          <RegisterSelectInput
            isLoading={plantSensorDeviceLoading}
            label={getTranslatedValue('OrganizationPlantSensorDeviceId')}
            name="organizationPlantSensorDeviceId"
            options={formatSelectOptionsWithoutItems(plantSensorDevice)}
            error={errors?.organizationPlantSensorDeviceId?.message}
            register={register}
            control={control}
          />

          <RegisterSelectInput
            isLoading={plantDevicesLookupLoading}
            label={getTranslatedValue(
              'OrganizationPlantProtectionRelayDeviceId',
            )}
            name="organizationPlantProtectionRelayDeviceId"
            options={formatSelectOptionsWithoutItems(plantDevicesLookup)}
            error={errors?.organizationPlantProtectionRelayDeviceId?.message}
            register={register}
            control={control}
          />
        </>
      )}

      {(orgTypeId == 3 || orgTypeId == 4) && (
        <SearchableDropdown
          mainClass="dv-organization-modal__content-input-full"
          name="organizationPlantMimicDiagramId"
          label={getTranslatedValue('OrganizationPlantMimicDiagramId')}
          searchParameterLabel="title"
          isRequiredInput
          options={mimicDiagramLookup?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
            disabled: item.disabled,
          }))}
          selectedVal={
            organizationPlantMimicDiagramId
              ? mimicDiagramLookup?.find(
                  (item: any) => item.id == organizationPlantMimicDiagramId,
                )?.displayName
              : mimicDiagramLookup?.length > 0
                ? mimicDiagramLookup[0]?.displayName
                : null
          }
          placeholder={getTranslatedValue('Search')}
          handleChange={(e: any) => {
            setValue('organizationPlantMimicDiagramId', e);
          }}
          isLoading={mimicDiagramLookupLoading}
          error={errors?.organizationPlantMimicDiagramId?.message}
        />
      )}
      {orgTypeId == 3 && (
        <PlantDetailField isLoading={isLoading} control={control} />
      )}
    </>
  );
};

export default OrganizationTypeFields;
