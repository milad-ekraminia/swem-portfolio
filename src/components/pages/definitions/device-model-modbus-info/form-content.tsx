import { RegisterInput } from '@/components/ui/input/register-input/Input';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import {
  dataEditableTypeEnumOptions,
  dataTypeEnumOptions,
  deviceModelModbusFunctionTypeOptions,
  deviceMultiplierTypeOptions,
  qosTypeEnumOptions,
} from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { handleError } from '@/helpers/handle-error';
import { checkUsedLabelInPreviousData, getAsduTypesLookup } from '@/services/definitions/device-model-modbus/device-model-modbus-api';
import { displayNameListType } from '@/types/pages/definitions/multi-conditional-statuses';
import { useMutation, useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

const MemoDeviceModelModbusFormContent = ({
  errors,
  register,
  isEdit = false,
  deviceModelProtocolId,
  formulaList,
  labelList,
  setValue,
  control,
  checkImportFromExcelLabels = false,
}: {
  errors: any;
  register: any;
  isEdit?: boolean;
  deviceModelProtocolId: number;
  formulaList: displayNameListType;
  labelList: displayNameListType;
  setValue: any;
  control: any;
  checkImportFromExcelLabels?: boolean;
}) => {
  const formulaId = useWatch({ name: 'formulaId', control });
  const labelId = useWatch({ name: 'labelId', control });

  const { data: asduTypesLookup, isLoading: asduTypesLookupLoading } = useQuery({
    queryKey: ['ASDU Types Lookup'],
    queryFn: () => getAsduTypesLookup(),
    retry: false,
    enabled: deviceModelProtocolId === 11,
  });

  const mutationNewDefinitionDevicesModel = useMutation({
    mutationFn: checkUsedLabelInPreviousData,
    onSuccess: (data) => {
      if (data > 0) {
        setValue('labelId', data);
      } else {
        toast.error('Label have a problem (duplicated or not found)');
      }
    },
    onError: handleError,
  });
  const handleLabelChange = (selectedValue: any) => {
    mutationNewDefinitionDevicesModel.mutate({
      labelName:
        labelList?.find((item) => item.id == selectedValue)?.displayName || '',
    });
  };

  console.log("deviceModelProtocolId", deviceModelProtocolId)

  return (
    <div className="new-device-model-mod-bus-modal__content">
      <div className="description">
        <SearchableDropdown
          name="labelId"
          label={getTranslatedValue('Label')}
          searchParameterLabel={'title'}
          options={labelList?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
            disabled: item.disabled,
          }))}
          selectedVal={
            labelId
              ? labelList?.find((item: any) => item.id == labelId)?.displayName
              : null
          }
          placeholder={
            getTranslatedValue('Label') +
            ' ' +
            getTranslatedValue('Search', 'AbpUi.texts')
          }
          handleChange={
            checkImportFromExcelLabels
              ? handleLabelChange
              : (selectedValue: any) => setValue('labelId', selectedValue)
          }
          isLoading={mutationNewDefinitionDevicesModel.isPending}
        />
      </div>
      {deviceModelProtocolId === 10 && (
        <RegisterInput
          type="text"
          name="opcTagName"
          label={getTranslatedValue('OpcTagName')}
          error={errors?.opcTagName?.message}
          register={register}
        />
      )}

      {deviceModelProtocolId === 9 && (
        <>
          <RegisterInput
            type="text"
            name="topicName"
            label={getTranslatedValue('TopicName')}
            error={errors?.topicName?.message}
            register={register}
          />
          <RegisterInput
            type="text"
            name="subTopicName"
            label={getTranslatedValue('SubTopicName')}
            error={errors?.subTopicName?.message}
            register={register}
          />
          <RegisterSelectInput
            name="qosLevel"
            label={getTranslatedValue('QosLevel')}
            options={qosTypeEnumOptions}
            error={errors?.qosLevel?.message}
            register={register}
            disabled={isEdit}
            control={control}
            placeholder={getTranslatedValue('Select')}
          />
        </>
      )}

      {deviceModelProtocolId !== 9 && deviceModelProtocolId !== 10 && (
        <RegisterInput
          type="text"
          name="dataDescription"
          label={getTranslatedValue('DataDescription')}
          error={errors?.dataDescription?.message}
          register={register}
        />
      )}

      {deviceModelProtocolId !== 10 && (
        <RegisterSelectInput
          name="dataTypeId"
          label={getTranslatedValue(deviceModelProtocolId === 11 ? 'AsduType' : 'DataType')}
          options={
            deviceModelProtocolId === 11 ? asduTypesLookup?.items?.map((item: any) => ({
              value: item.id,
              title: item.displayName,
            })) : dataTypeEnumOptions}
          error={errors?.dataTypeId?.message}
          register={register}
          disabled={isEdit}
          control={control}
          placeholder={getTranslatedValue('Select')}
          isLoading={asduTypesLookupLoading}
        />
      )}

      <RegisterSelectInput
        name="deviceMultiplier"
        label={getTranslatedValue('DeviceMultiplier')}
        options={deviceMultiplierTypeOptions}
        error={errors?.deviceMultiplier?.message}
        register={register}
        disabled={isEdit}
        control={control}
        placeholder={getTranslatedValue('Select')}
      />

      <SearchableDropdown
        name="formulaId"
        label={getTranslatedValue('Formula')}
        searchParameterLabel={'title'}
        options={formulaList?.map((item: any) => ({
          value: item.id,
          title: item.displayName,
        }))}
        selectedVal={
          formulaId
            ? formulaList?.find((item: any) => item.id == formulaId)
              ?.displayName
            : null
        }
        placeholder={
          getTranslatedValue('Formula') +
          ' ' +
          getTranslatedValue('Search', 'AbpUi.texts')
        }
        handleChange={(e: any) => {
          setValue('formulaId', e);
        }}
      />

      {(deviceModelProtocolId === 1 ||
        deviceModelProtocolId === 2 ||
        deviceModelProtocolId === 3 ||
        deviceModelProtocolId === 6 ||
        deviceModelProtocolId === 7 ||
        deviceModelProtocolId === 8 || deviceModelProtocolId === 11) && (
          <RegisterInput
            type="number"
            name="modbusAddress"
            label={getTranslatedValue(deviceModelProtocolId === 11 ? 'InformationObjectAddress' : 'ModbusAddress')}
            error={errors?.modbusAddress?.message}
            register={register}
          />
        )}

      {
        deviceModelProtocolId !== 11 &&
        <RegisterInput
          type="number"
          name="dataLength"
          label={getTranslatedValue('DataLength')}
          error={errors?.dataLength?.message}
          register={register}
        />
      }

      {deviceModelProtocolId !== 0 && deviceModelProtocolId !== 4 && (
        <RegisterSelectInput
          name="dataEditable"
          label={getTranslatedValue('DataEditable')}
          options={dataEditableTypeEnumOptions}
          error={errors?.dataEditable?.message}
          register={register}
          disabled={isEdit}
          control={control}
          placeholder={getTranslatedValue('Select')}
        />
      )}
      {(deviceModelProtocolId === 1 ||
        deviceModelProtocolId === 2 ||
        deviceModelProtocolId === 3) && (
          <RegisterSelectInput
            name="functionType"
            label={getTranslatedValue('FunctionType')}
            options={deviceModelModbusFunctionTypeOptions}
            error={errors?.functionType?.message}
            register={register}
            disabled={isEdit}
            control={control}
            placeholder={getTranslatedValue('Select')}
          />
        )}
    </div>
  );
};
const DeviceModelModbusFormContent = memo(MemoDeviceModelModbusFormContent);

export default DeviceModelModbusFormContent;
