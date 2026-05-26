import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import SkeletonLoader from '@/components/ui/skeleton/skeleton-loader';
import { calculationMethodOptions } from '@/enum-data/definitions/organizations-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  fetchDeviceModelCommunicationPeriodFormModel,
  fetchDeviceModelCommunicationPeriodReadability,
} from '@/services/definitions/devices/devices-api';
import { useQueries } from '@tanstack/react-query';
import { memo, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import ShouldRenderDeviceSelect from '../../should-render-device-select';

const MemoDeviceCommunicationPeriodFormContent = ({
  errors,
  register,
  control,
  reset,
}: {
  errors: any;
  register: any;
  control: any;
  reset: any;
}) => {
  const deviceModelId = Number(
    useWatch({
      control,
      name: 'device.deviceModelId',
    }),
  );

  const results = useQueries({
    queries: [
      {
        queryKey: [
          'device-model-communication-period-readability',
          deviceModelId,
        ],
        queryFn: () =>
          fetchDeviceModelCommunicationPeriodReadability({ deviceModelId }),
        retry: false,
        enabled: !!deviceModelId,
      },
      {
        queryKey: ['device-communication-period-from-model', deviceModelId],
        queryFn: () =>
          fetchDeviceModelCommunicationPeriodFormModel({ deviceModelId }),
        retry: false,
        enabled: !!deviceModelId,
      },
    ],
  });

  const [getDeviceReadabilityRes, getDeviceFormRes] = results;

  useEffect(() => {
    if (getDeviceFormRes?.data) {
      // set value with use getDeviceFormRes?.data key and value
      reset((prev: any) => ({
        ...prev,
        deviceCommunicationPeriod: getDeviceFormRes?.data,
      }));
    }
  }, [getDeviceFormRes?.data, reset]);
console.log(calculationMethodOptions,'calculationMethodOptions')
  return (
    <div className="device-communication-info-form-content">
      <RegisterSelectInput
        name="device.deviceConsCalcProfileId"
        label={getTranslatedValue('em_device_hourly_data_calculation_profile')}
        options={calculationMethodOptions}
        isFull={true}
        error={errors?.device?.deviceConsCalcProfileId?.message}
        register={register}
        // title={getTranslatedValue(
        //   "em_device_hourly_data_calculation_profile_desc"
        // )}
        control={control}
      />
      <RegisterSelectInput
        name="device.deviceConsCalcThreshold"
        label={getTranslatedValue(
          'em_device_hourly_data_calculation_threshold',
        )}
        options={Array.from({ length: 20 }, (_, index) => ({
          value: index + 1,
          title: `${index + 1}`,
        }))}
        error={errors?.device?.deviceConsCalcThreshold?.message}
        register={register}
        // title={getTranslatedValue(
        //   "em_device_hourly_data_calculation_threshold_desc"
        // )}
        control={control}
      />
      {getDeviceFormRes.data ? (
        <>
          <h5 className="category-type">{getTranslatedValue('ReadPeriod')}</h5>
          <h5 className="category-type">{getTranslatedValue('WritePeriod')}</h5>
        </>
      ) : null}

      {getDeviceReadabilityRes?.isLoading ? (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      ) : (
        <>
          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.elecInstantValue"
            readOnlyName="deviceCommunicationPeriod.elecInstantValueSave"
            label="ElecInstantValue"
            readOnlyLabel="ElecInstantValueSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.elecInstantValue?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.elecInstantValue > 0 ||
              getDeviceFormRes.data?.elecInstantValueSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.elecHarmonic"
            readOnlyName="deviceCommunicationPeriod.elecHarmonicSave"
            label="ElecHarmonic"
            readOnlyLabel="ElecHarmonicSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.elecHarmonic?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.elecHarmonic > 0 ||
              getDeviceFormRes.data?.elecHarmonicSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.elecIndexValue"
            readOnlyName="deviceCommunicationPeriod.elecIndexValueSave"
            label="ElecIndexValue"
            readOnlyLabel="ElecIndexValueSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.elecIndexValue?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.elecIndexValue > 0 ||
              getDeviceFormRes.data?.elecIndexValueSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.elecDemandInstant"
            readOnlyName="deviceCommunicationPeriod.elecDemandInstantSave"
            label="ElecDemandInstant"
            readOnlyLabel="ElecDemandInstantSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.elecDemandInstant?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.elecDemandInstant > 0 ||
              getDeviceFormRes.data?.elecDemandInstantSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.elecDemandMonthly"
            readOnlyName="deviceCommunicationPeriod.elecDemandMonthlySave"
            label="ElecDemandMonthly"
            readOnlyLabel="ElecDemandMonthlySave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.elecDemandMonthly?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.elecDemandMonthly > 0 ||
              getDeviceFormRes.data?.elecDemandMonthlySave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.elecAlarmLog"
            readOnlyName="deviceCommunicationPeriod.elecAlarmLogSave"
            label="ElecAlarmLog"
            readOnlyLabel="ElecAlarmLogSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.elecAlarmLog?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.elecAlarmLog > 0 ||
              getDeviceFormRes.data?.elecAlarmLogSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.elecMinMaxValue"
            readOnlyName="deviceCommunicationPeriod.elecMinMaxValueSave"
            label="ElecMinMaxValue"
            readOnlyLabel="ElecMinMaxValueSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.elecMinMaxValue?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.elecMinMaxValue > 0 ||
              getDeviceFormRes.data?.elecMinMaxValueSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.elecStep"
            readOnlyName="deviceCommunicationPeriod.elecStepSave"
            label="ElecStep"
            readOnlyLabel="ElecStepSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.elecStep?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.elecStep > 0 ||
              getDeviceFormRes.data?.elecStepSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.elecDigInputLog"
            readOnlyName="deviceCommunicationPeriod.elecDigInputLogSave"
            label="ElecDigInputLog"
            readOnlyLabel="ElecDigInputLogSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.elecDigInputLog?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.elecDigInputLog > 0 ||
              getDeviceFormRes.data?.elecDigInputLogSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.elecArchive"
            readOnlyName="deviceCommunicationPeriod.elecArchiveSave"
            label="ElecArchive"
            readOnlyLabel="ElecArchiveSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.elecArchive?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.elecArchive > 0 ||
              getDeviceFormRes.data?.elecArchiveSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.elecStatusValue"
            readOnlyName="deviceCommunicationPeriod.elecStatusValueSave"
            label="ElecStatusValue"
            readOnlyLabel="ElecStatusValueSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.elecStatusValue?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.elecStatusValue > 0 ||
              getDeviceFormRes.data?.elecStatusValueSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.ioDeviceSensorValue"
            readOnlyName="deviceCommunicationPeriod.ioDeviceSensorValueSave"
            label="IoDeviceSensorValue2"
            readOnlyLabel="IoDeviceSensorValueSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.ioDeviceSensorValue?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.ioDeviceSensorValue > 0 ||
              getDeviceFormRes.data?.ioDeviceSensorValueSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.ioDeviceCounterValue"
            readOnlyName="deviceCommunicationPeriod.ioDeviceCounterValueSave"
            label="IoDeviceCounterValue"
            readOnlyLabel="IoDeviceCounterValueSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.ioDeviceCounterValue?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.ioDeviceCounterValue > 0 ||
              getDeviceFormRes.data?.ioDeviceCounterValueSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.generatorValue"
            readOnlyName="deviceCommunicationPeriod.generatorValueSave"
            label="GeneratorValue"
            readOnlyLabel="GeneratorValueSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.generatorValue?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.generatorValue > 0 ||
              getDeviceFormRes.data?.generatorValueSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.compressorValue"
            readOnlyName="deviceCommunicationPeriod.compressorValueSave"
            label="CompressorValue"
            readOnlyLabel="CompressorValueSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.compressorValue?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.compressorValue > 0 ||
              getDeviceFormRes.data?.compressorValueSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.ngInstantMeasurementValue"
            readOnlyName="deviceCommunicationPeriod.ngInstantMeasurementValueSave"
            label="NGInstantMeasurementValue"
            readOnlyLabel="NGInstantMeasurementValueSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.ngInstantMeasurementValue?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.ngInstantMeasurementValue > 0 ||
              getDeviceFormRes.data?.ngInstantMeasurementValueSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.ngComponentValue"
            readOnlyName="deviceCommunicationPeriod.ngComponentValueSave"
            label="NGComponentValue"
            readOnlyLabel="NGComponentValueSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.ngComponentValue?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.ngComponentValue > 0 ||
              getDeviceFormRes.data?.ngComponentValueSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.ngArchive"
            readOnlyName="deviceCommunicationPeriod.ngArchiveSave"
            label="NGArchive"
            readOnlyLabel="NGArchiveSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.ngArchive?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.ngArchive > 0 ||
              getDeviceFormRes.data?.ngArchiveSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.fmInstantValue"
            readOnlyName="deviceCommunicationPeriod.fmInstantValueSave"
            label="FMInstantValue"
            readOnlyLabel="FMInstantValueSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.fmInstantValue?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.fmInstantValue > 0 ||
              getDeviceFormRes.data?.fmInstantValueSave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.ngChromatography"
            readOnlyName="deviceCommunicationPeriod.ngChromatographySave"
            label="NGChromatography"
            readOnlyLabel="NGChromatographySave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.ngChromatography?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.ngChromatography > 0 ||
              getDeviceFormRes.data?.ngChromatographySave > 0
            }
            control={control}
          />

          <ShouldRenderDeviceSelect
            name="deviceCommunicationPeriod.elecInverterInstantValue"
            readOnlyName="deviceCommunicationPeriod.elecInverterInstantValueSave"
            label="ElecInverterInstantValue"
            readOnlyLabel="ElecInverterInstantValueSave"
            isReadonly={getDeviceReadabilityRes?.data}
            errorMessage={errors?.device?.elecInverterInstantValue?.message}
            register={register}
            showSelect={
              getDeviceFormRes.data?.elecInverterInstantValue > 0 ||
              getDeviceFormRes.data?.elecInverterInstantValueSave > 0
            }
            control={control}
          />
        </>
      )}
    </div>
  );
};
const DeviceCommunicationPeriodFormContent = memo(
  MemoDeviceCommunicationPeriodFormContent,
);

export default DeviceCommunicationPeriodFormContent;
