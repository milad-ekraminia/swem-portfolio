import { Checkbox } from '@/components/ui/input/check-box/check-box';
import DateInput from '@/components/ui/input/date-input/date-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { deviceModelTypeOptionsForCreateEnum } from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  fetchDefinitionsDeviceModelLookupModelTypeList,
  fetchDefinitionsOrganizationPassiveDeviceLookupList,
  fetchUserFilteredOrganizationLookupList,
} from '@/services/definitions/devices/devices-api';
import { useQuery } from '@tanstack/react-query';
import { memo, useEffect } from 'react';
import { useWatch } from 'react-hook-form';

const MemoDeviceFormContent = ({
  errors,
  register,
  control,
  setValue,
  deviceAccessPointResponse,
  deviceCategoryResponse,
  isEdit,
}: {
  errors: any;
  register: any;
  control: any;
  setValue: any;
  deviceAccessPointResponse: any;
  deviceCategoryResponse: any;
  isEdit?: boolean;
}) => {
  const deviceModelTypeId = Number(
    useWatch({
      control,
      name: 'device.deviceModelTypeId',
    }),
  );

  const deviceModelId = Number(
    useWatch({
      control,
      name: 'device.deviceModelId',
    }),
  );

  const deviceOrganizationId = Number(
    useWatch({
      control,
      name: 'device.deviceOrganizationId',
    }),
  );

  const active = useWatch({
    control,
    name: 'device.active',
  });
  const useForCalculation = useWatch({
    control,
    name: 'device.useForCalculation',
  });

  const deviceAccessPointId = Number(
    useWatch({
      control,
      name: 'device.deviceAccessPointId',
    }),
  );

  const deviceCategoryId = Number(
    useWatch({
      control,
      name: 'device.deviceCategoryId',
    }),
  );

  const replaceDevice = useWatch({
    control,
    name: 'device.replaceDevice',
  });

  const installationDate = useWatch({
    control,
    name: 'device.installationDate',
  });

  const uninstallDevice = useWatch({
    control,
    name: 'device.uninstallDevice',
  });

  const uninstallationDate = useWatch({
    control,
    name: 'device.uninstallationDate',
  });

  const replaceDeviceId = Number(
    useWatch({
      control,
      name: 'device.replaceDeviceId',
    }),
  );

  const {
    data: deviceModelTypeResponseData,
    isLoading: deviceModelTypeResponseLoading,
  } = useQuery({
    queryKey: ['Device Model Lookup by Model Type Id', deviceModelTypeId],
    queryFn: () =>
      fetchDefinitionsDeviceModelLookupModelTypeList({
        Id: deviceModelTypeId || 1,
      }),
    retry: false,
  });

  const {
    data: organizationDeviceResponseData,
    isLoading: organizationDeviceResponseLoading,
  } = useQuery({
    queryKey: ['Organization Device Lookup'],
    queryFn: () => fetchUserFilteredOrganizationLookupList({}),
    retry: false,
  });

  const {
    data: organizationPassiveDeviceResponseData,
    isLoading: organizationPassiveDeviceResponseLoading,
  } = useQuery({
    queryKey: ['Organization Passive Device Lookup', deviceOrganizationId],
    queryFn: () =>
      fetchDefinitionsOrganizationPassiveDeviceLookupList({
        Id: deviceOrganizationId,
      }),
    retry: false,
    enabled: !!deviceOrganizationId,
  });

  useEffect(() => {
    if (uninstallDevice) setValue('device.active', false);
  }, [uninstallDevice]);

  return (
    <div className="device-information-level">
      <div className="device-information-level__header">
        <div className="checkbox-group">
          <Checkbox
            onChange={(value: any) => setValue('device.active', value)}
            checked={active}
            label={getTranslatedValue('Active')}
          />
          {isEdit ? (
            <Checkbox
              onChange={(value: any) =>
                setValue('device.uninstallDevice', value)
              }
              checked={uninstallDevice}
              label={getTranslatedValue('UninstallDevice')}
            />
          ) : null}
          {!isEdit ? (
            <Checkbox
              onChange={(value: any) => setValue('device.replaceDevice', value)}
              checked={replaceDevice}
              label={getTranslatedValue('ReplaceDevice')}
            />
          ) : null}{' '}
          <Checkbox
            onChange={(value: any) =>
              setValue('device.useForCalculation', value)
            }
            checked={useForCalculation}
            label={getTranslatedValue('UseForCalculation')}
          />
        </div>
        <div className="date-box">
          {isEdit && uninstallDevice ? (
            <DateInput
              name="device.uninstallationDate"
              dateFormat={'DD/MM/YYYY HH:mm'}
              onChange={(value: any) =>
                setValue('device.uninstallationDate', value)
              }
              value={uninstallationDate}
              periodType={'1'}
              hasTime
              placeHolder={getTranslatedValue('Date')}
            />
          ) : null}
          {!isEdit && replaceDevice ? (
            <DateInput
              // label={""}
              name="device.installationDate"
              dateFormat={'DD/MM/YYYY HH:mm'}
              onChange={(value: any) =>
                setValue('device.installationDate', value)
              }
              value={installationDate}
              periodType={'1'}
              placeHolder={getTranslatedValue('Date')}
              hasTime
            // customIcon={<Mail color="#667085" />}
            />
          ) : null}
        </div>
      </div>
      <div className="device-information-level__content">
        <RegisterInput
          type="text"
          name="device.deviceDescription"
          label={getTranslatedValue('em_device_description')}
          error={errors?.device?.deviceDescription?.message}
          register={register}
          placeholder={getTranslatedValue('DeviceDescriptionPlaceHolder')}
          required={true}
        />
        <RegisterInput
          type="number"
          name="device.deviceSerialNr"
          label={getTranslatedValue('em_device_serial_nr')}
          error={errors?.device?.deviceSerialNr?.message}
          register={register}
          placeholder={getTranslatedValue('DeviceSerialNumPlaceHolder')}
          required={true}
        />
        <RegisterSelectInput
          name={'device.deviceModelTypeId'}
          label={getTranslatedValue('em_device_type')}
          options={deviceModelTypeOptionsForCreateEnum}
          error={errors?.device?.deviceModelTypeId?.message}
          // value={deviceModelTypeId || 0}
          isLoading={false}
          register={register}
          control={control}
          required={true}
        />
        <SearchableDropdown
          name={'device.deviceModelId'}
          label={getTranslatedValue('em_device_model')}
          searchParameterLabel={'title'}
          options={deviceModelTypeResponseData?.items?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          selectedVal={
            deviceModelId
              ? deviceModelTypeResponseData?.items?.find(
                (item: any) => item.id == deviceModelId,
              )?.displayName
              : null
          }
          placeholder={getTranslatedValue('DeviceModelPlaceHolder')}
          handleChange={(e: any) => {
            setValue('device.deviceModelId', e);
          }}
          isLoading={deviceModelTypeResponseLoading}
          isRequiredInput={true}
          error={errors?.device?.deviceModelId?.message}
        />
        <SearchableDropdown
          name="device.deviceOrganizationId"
          label={getTranslatedValue('em_device_organization')}
          searchParameterLabel={'title'}
          options={organizationDeviceResponseData?.items?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          selectedVal={
            deviceOrganizationId
              ? organizationDeviceResponseData?.items?.find(
                (item: any) => item.id == deviceOrganizationId,
              )?.displayName
              : null
          }
          placeholder={getTranslatedValue('OrganizationPlaceHolder')}
          handleChange={(e: any) => {
            setValue('device.deviceOrganizationId', e);
          }}
          isLoading={organizationDeviceResponseLoading}
          isRequiredInput={true}
          error={errors?.device?.deviceOrganizationId?.message}
        />
        {replaceDevice ? (
          <SearchableDropdown
            name="device.replaceDeviceId"
            label={getTranslatedValue('DeviceId')}
            searchParameterLabel={'title'}
            options={organizationPassiveDeviceResponseData?.items?.map(
              (item: any) => ({
                value: item.id,
                title: item.displayName,
              }),
            )}
            selectedVal={
              replaceDeviceId
                ? organizationPassiveDeviceResponseData?.items?.find(
                  (item: any) => item.id == replaceDeviceId,
                )?.displayName
                : null
            }
            placeholder={getTranslatedValue('DeviceNumPlaceHolder')}
            handleChange={(e: any) => {
              setValue('device.replaceDeviceId', e);
            }}
            isLoading={organizationPassiveDeviceResponseLoading}
            // disabled={!deviceOrganizationId}
            error={errors?.device?.replaceDeviceId?.message}
          />
        ) : (
          <div></div>
        )}
        <SearchableDropdown
          name="device.deviceAccessPointId"
          label={getTranslatedValue('em_device_access_point')}
          searchParameterLabel={'title'}
          options={deviceAccessPointResponse?.items?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          selectedVal={
            deviceAccessPointId
              ? deviceAccessPointResponse?.items?.find(
                (item: any) => item.id == deviceAccessPointId,
              )?.displayName
              : null
          }
          placeholder={getTranslatedValue('AccessPointsPlaceHolder')}
          handleChange={(e: any) => {
            setValue('device.deviceAccessPointId', e);
          }}
          isLoading={false}
          error={errors?.device?.deviceAccessPointId?.message}
        />
        <RegisterInput
          type="number"
          name="device.deviceCommAddress"
          label={getTranslatedValue('em_device_comm_address')}
          error={errors?.device?.deviceCommAddress?.message}
          register={register}
          placeholder={getTranslatedValue('DeviceCommAddressPlaceHolder')}
          title={`${getTranslatedValue(
            'em_device_comm_address_desc_1',
          )}<br/>  ${getTranslatedValue(
            'em_device_comm_address_desc_2',
          )}<br/> ${getTranslatedValue(
            'em_device_comm_address_desc_3',
          )}<br/> ${getTranslatedValue(
            'em_device_comm_address_desc_4',
          )} ${getTranslatedValue(
            'em_device_comm_address_desc_5',
          )} <br/>  ${getTranslatedValue(
            'em_device_comm_address_desc_2',
          )}<br/> ${getTranslatedValue(
            'em_device_comm_address_desc_3',
          )}<br/> ${getTranslatedValue(
            'em_device_comm_address_desc_4',
          )} ${getTranslatedValue('em_device_comm_address_desc_5')}`}
          required={true}
        />
        <SearchableDropdown
          name="device.deviceCategoryId"
          label={getTranslatedValue('em_device_category')}
          searchParameterLabel={'title'}
          options={deviceCategoryResponse?.items?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          selectedVal={
            deviceCategoryId
              ? deviceCategoryResponse?.items?.find(
                (item: any) => item.id == deviceCategoryId,
              )?.displayName
              : null
          }
          placeholder={getTranslatedValue('Search')}
          handleChange={(e: any) => {
            setValue('device.deviceCategoryId', e);
          }}
          isLoading={false}
          error={errors?.device?.deviceCategoryId?.message}
        />
        <RegisterInput
          type="text"
          name="device.deviceDescription2"
          label={getTranslatedValue('em_device_description2')}
          error={errors?.device?.deviceDescription2?.message}
          register={register}
          placeholder={getTranslatedValue('DeviceDetailsPlaceHolder')}
        />
        <RegisterInput
          type="text"
          name="device.devicePassword"
          label={getTranslatedValue('em_device_password')}
          error={errors?.device?.devicePassword?.message}
          register={register}
          placeholder={getTranslatedValue('DevicePasswordPlaceHolder')}
        />
        <RegisterInput
          type="number"
          name="device.latitude"
          label={getTranslatedValue('Latitude')}
          error={errors?.device?.latitude?.message}
          step={0.0000000000001}
          register={register}
          placeholder={getTranslatedValue('LatitudePlaceHolder')}
        />
        <RegisterInput
          type="number"
          name="device.longitude"
          label={getTranslatedValue('Longitude')}
          error={errors?.device?.longitude?.message}
          step={0.0000000000001}
          register={register}
          placeholder={getTranslatedValue('LongitudePlaceHolder')}
        />{' '}
        <RegisterInput
          type="text"
          name="device.deviceWebAddress"
          label={getTranslatedValue('em_device_web_address')}
          error={errors?.device?.deviceWebAddress?.message}
          register={register}
          placeholder={getTranslatedValue('DeviceWebAddressPlaceHolder')}
        />
      </div>
    </div>
  );
};

const DeviceFormContent = memo(MemoDeviceFormContent);

export default DeviceFormContent;
