import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { alarmConfDeviceSelectionTypeOptions } from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  fetchAlarmConfigurationsGESLookup,
  fetchDeviceLookupBasedSelectedOrganization,
  fetchInvManStatusLablesStatus,
  fetchLablesLookupBasedDeviceId,
} from '@/services/definitions/alarm-configurations/alarm-configurations-api';
import { displayNameListItemType } from '@/types/pages/definitions/multi-conditional-statuses';
import { useQueries } from '@tanstack/react-query';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';
import AlarmConfigurationInvManStatusLabelFormContent from './InvManStatus-label-form-content';
import AlarmConfigurationsOrganizationField from './organization-tree/organization-field';

const MemoAlarmConfigurationDeviceFormContent = ({
  errors,
  register,
  control,
  setValue,
  labelsList,
  isEdit,
}: {
  errors: any;
  register: any;
  control: any;
  setValue: any;
  labelsList: displayNameListItemType[];
  isEdit: boolean;
}) => {
  const alarmConfDeviceSelectionType = useWatch({
    control,
    name: 'alarmConfDeviceSelectionType',
  });

  const alarmConfOrganizationId = Number(
    useWatch({
      control,
      name: 'alarmConfOrganizationId',
    }),
  );

  const alarmConfDeviceId = Number(
    useWatch({
      control,
      name: 'alarmConfDeviceId',
    }),
  );

  const alarmConfLabelId = Number(
    useWatch({
      control,
      name: 'alarmConfLabelId',
    }),
  );

  const results = useQueries({
    queries: [
      {
        queryKey: ['GES Lookup'],
        queryFn: () => fetchAlarmConfigurationsGESLookup(),
        retry: false,
      },
      {
        queryKey: [
          'Device Lookup Based on Selected Organization',
          alarmConfOrganizationId,
        ],
        queryFn: () =>
          fetchDeviceLookupBasedSelectedOrganization(alarmConfOrganizationId),
        retry: false,
        // enabled: !!alarmConfOrganizationId,
      },
      {
        queryKey: ['Lables Lookup Based on Device Id', alarmConfDeviceId],
        queryFn: () => fetchLablesLookupBasedDeviceId(alarmConfDeviceId),
        retry: false,
        enabled: !!alarmConfDeviceId,
      },
      {
        queryKey: ['Get Device Status Offline', alarmConfLabelId],
        queryFn: () => fetchInvManStatusLablesStatus(alarmConfLabelId),
        retry: false,
        enabled: alarmConfLabelId === 2034,
      },
    ],
  });

  const [getGESLookup, getDevicesLookup, getLabelsLookup, getLabelStatus] =
    results;

  const gesList = getGESLookup?.data?.items ?? [];
  const devicesList = getDevicesLookup?.data?.items ?? [];
  const labelsWithDeviceList = getLabelsLookup?.data ?? [];
  const labelStatus = getLabelStatus?.data ?? false;

  return (
    <>
      {!isEdit && (
        <RegisterSelectInput
          name="alarmConfDeviceSelectionType"
          label={getTranslatedValue('em_alarm_device_selection')}
          options={alarmConfDeviceSelectionTypeOptions}
          error={errors?.alarmConfDeviceSelectionType?.message}
          register={register}
          disabled={isEdit}
          control={control}
        />
      )}
      {alarmConfDeviceSelectionType === 1 || alarmConfDeviceId ? (
        <>
          <SearchableDropdown
            name="alarmConfOrganizationId"
            label={getTranslatedValue('em_organization')}
            searchParameterLabel={'title'}
            options={gesList?.map((item: any) => ({
              value: item.id,
              title: item.displayName,
            }))}
            selectedVal={
              alarmConfOrganizationId
                ? gesList?.find(
                  (item: any) => item.id == alarmConfOrganizationId,
                )?.displayName
                : null
            }
            placeholder={getTranslatedValue('Search')}
            handleChange={(e: any) => {
              setValue('alarmConfOrganizationId', e);
            }}
            isLoading={false}
            isRequiredInput={true}
            error={errors?.alarmConfOrganizationId?.message}
          />
          <SearchableDropdown
            name="alarmConfDeviceId"
            label={getTranslatedValue('Device')}
            searchParameterLabel={'title'}
            options={devicesList?.map((item: any) => ({
              value: item.id,
              title: item.displayName,
            }))}
            selectedVal={
              alarmConfDeviceId
                ? devicesList?.find((item: any) => item.id == alarmConfDeviceId)
                  ?.displayName
                : null
            }
            placeholder={getTranslatedValue('Search')}
            handleChange={(e: any) => {
              setValue('alarmConfDeviceId', e);
            }}
            isLoading={false}
            isRequiredInput={true}
            error={errors?.alarmConfDeviceId?.message}
            disabled={!alarmConfOrganizationId}
          />
          <SearchableDropdown
            name="alarmConfLabelId"
            label={getTranslatedValue('Label')}
            searchParameterLabel={'title'}
            options={labelsWithDeviceList?.map((item: any) => ({
              value: item.id,
              title: item.displayName,
            }))}
            selectedVal={
              alarmConfLabelId
                ? labelsWithDeviceList?.find(
                  (item: any) => item.id == alarmConfLabelId,
                )?.displayName
                : null
            }
            placeholder={getTranslatedValue('Search')}
            handleChange={(e: any) => {
              setValue('alarmConfLabelId', e);
            }}
            isLoading={false}
            isRequiredInput={true}
            error={errors?.alarmConfLabelId?.message}
            disabled={!alarmConfDeviceId}
          />
          {labelStatus && (
            <AlarmConfigurationInvManStatusLabelFormContent
              register={register}
              errors={errors}
            />
          )}
        </>
      ) : (
        <>
          <AlarmConfigurationsOrganizationField
            control={control}
            setValue={setValue}
            error={errors?.alarmConfDeviceIds?.message}
          />
          <SearchableDropdown
            name="alarmConfLabelId"
            label={getTranslatedValue('Label')}
            searchParameterLabel={'title'}
            options={labelsList?.map((item: any) => ({
              value: item.id,
              title: item.displayName,
            }))}
            selectedVal={
              alarmConfLabelId
                ? labelsList?.find((item: any) => item.id == alarmConfLabelId)
                  ?.displayName
                : null
            }
            placeholder={getTranslatedValue('Search')}
            handleChange={(e: any) => {
              setValue('alarmConfLabelId', e);
            }}
            isLoading={false}
            isRequiredInput={true}
            error={errors?.alarmConfLabelId?.message}
          />

          {labelStatus && (
            <AlarmConfigurationInvManStatusLabelFormContent
              register={register}
              errors={errors}
            />
          )}
        </>
      )}
    </>
  );
};
const AlarmConfigurationDeviceFormContent = memo(
  MemoAlarmConfigurationDeviceFormContent,
);

export default AlarmConfigurationDeviceFormContent;
