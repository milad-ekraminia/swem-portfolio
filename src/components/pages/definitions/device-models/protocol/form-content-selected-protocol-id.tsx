import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { deviceModelPeriodOptionsEnumOptions } from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';
import ProtocolSpecificFields from './protocol-specific-fields';

const MemoizedMainSelect = memo(RegisterSelectInput);

const MemoDeviceModelFormContentSelectedProtocolId = ({
  errors,
  register,
  deviceModelProtocolId,
  disableInputField = false,
  control,
}: {
  control: any;
  errors: any;
  register: any;
  deviceModelProtocolId: number;
  disableInputField?: boolean;
}) => {
  const renderMainSelect = (
    name: string,
    label: string,
    options: any,
    disabled = false,
  ) => (
    <MemoizedMainSelect
      name={name}
      label={getTranslatedValue(label)}
      options={options}
      error={errors[name]?.message}
      disabled={disabled}
      register={register}
      control={control}
    />
  );

  return (
    <>
      <ProtocolSpecificFields
        deviceModelProtocolId={deviceModelProtocolId}
        errors={errors}
        register={register}
        control={control}
      />
      <RegisterInput
        type="text"
        name="deviceModelDescription"
        label={getTranslatedValue('DeviceDescription')}
        error={errors?.deviceModelDescription?.message}
        register={register}
        mainClass="deviceModelDescription"
        placeholder={getTranslatedValue('DeviceDescriptionPlaceHolder')}
      />
      {renderMainSelect(
        'elecInstantValue',
        'ElecInstantValue',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}

      {renderMainSelect(
        'elecInstantValueSave',
        'ElecInstantValueSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'elecHarmonic',
        'ElecHarmonic',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'elecHarmonicSave',
        'ElecHarmonicSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'elecIndexValue',
        'ElecIndexValue',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'elecIndexValueSave',
        'ElecIndexValueSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'elecDemandInstant',
        'ElecDemandInstant',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'elecDemandInstantSave',
        'ElecDemandInstantSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'elecDemandMonthly',
        'ElecDemandMonthly',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'elecDemandMonthlySave',
        'ElecDemandMonthlySave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'elecAlarmLog',
        'ElecAlarmLog',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'elecAlarmLogSave',
        'ElecAlarmLogSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'elecMinMaxValue',
        'ElecMinMaxValue',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'elecMinMaxValueSave',
        'ElecMinMaxValueSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'elecStep',
        'ElecStep',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'elecStepSave',
        'ElecStepSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'elecDigInputLog',
        'ElecDigInputLog',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'elecDigInputLogSave',
        'ElecDigInputLogSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'elecArchive',
        'ElecArchive',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'elecArchiveSave',
        'ElecArchiveSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'elecStatusValue',
        'ElecStatusValue',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'elecStatusValueSave',
        'ElecStatusValueSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'ioDeviceSensorValue',
        'IoDeviceSensorValue2',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'ioDeviceSensorValueSave',
        'IoDeviceSensorValueSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'ioDeviceCounterValue',
        'IoDeviceCounterValue',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'ioDeviceCounterValueSave',
        'IoDeviceCounterValueSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'generatorValue',
        'GeneratorValue',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'generatorValueSave',
        'GeneratorValueSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'compressorValue',
        'CompressorValue',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'compressorValueSave',
        'CompressorValueSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'ngInstantMeasurementValue',
        'NGInstantMeasurementValue',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'ngInstantMeasurementValueSave',
        'NGInstantMeasurementValueSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'ngComponentValue',
        'NGComponentValue',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'ngComponentValueSave',
        'NGComponentValueSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'ngArchive',
        'NGArchive',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'ngArchiveSave',
        'NGArchiveSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'fmInstantValue',
        'FMInstantValue',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'fmInstantValueSave',
        'FMInstantValueSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'ngChromatography',
        'NGChromatography',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'ngChromatographySave',
        'NGChromatographySave',
        deviceModelPeriodOptionsEnumOptions,
      )}
      {renderMainSelect(
        'elecInverterInstantValue',
        'ElecInverterInstantValue',
        deviceModelPeriodOptionsEnumOptions,
        disableInputField,
      )}
      {renderMainSelect(
        'elecInverterInstantValueSave',
        'ElecInverterInstantValueSave',
        deviceModelPeriodOptionsEnumOptions,
      )}
    </>
  );
};

const DeviceModelFormContentSelectedProtocolId = memo(
  MemoDeviceModelFormContentSelectedProtocolId,
);

export default DeviceModelFormContentSelectedProtocolId;
