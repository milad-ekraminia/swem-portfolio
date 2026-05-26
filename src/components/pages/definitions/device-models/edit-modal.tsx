import { memo, useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  addDeviceModelResolver,
  deviceModelInitialValues,
  deviceModelInitialValuesTypes,
} from '@/validations/definitions/device-models/device-model-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  fetchDefinitionsDeviceModel,
  fetchDefinitionsDeviceModelCommunicationPeriods,
  updateDefinitionDeviceModel,
  updateDefinitionDeviceModelCommunicationPeriods,
} from '@/services/definitions/device-models';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { Loader } from '@/components/ui/loader/loader';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import DeviceModelFormContent from './form-content';

const MemoEditDeviceModel = ({
  setIsVisible,
  deviceModelId,
}: {
  setIsVisible: (value: any) => void;
  deviceModelId: number;
}) => {
  const queryClient = useQueryClient();

  // get device model info
  const deviceModelInfoResponse = useQuery({
    queryKey: ['device model info', deviceModelId],
    queryFn: () =>
      fetchDefinitionsDeviceModel({
        deviceModelId,
      }),
    retry: false,
  });

  const deviceModelCommunicationPeriodsInfoResponse = useQuery({
    queryKey: ['device model communication periods info', deviceModelId],
    queryFn: () =>
      fetchDefinitionsDeviceModelCommunicationPeriods({
        deviceModelId,
      }),
    retry: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<deviceModelInitialValuesTypes>({
    resolver: yupResolver(addDeviceModelResolver),
    defaultValues: deviceModelInitialValues,
  });

  // Add this inside your component, after the useForm declaration:
  useEffect(() => {
    if (
      deviceModelInfoResponse.data &&
      deviceModelCommunicationPeriodsInfoResponse.data
    ) {
      reset({
        ...deviceModelInfoResponse.data,
        ...deviceModelCommunicationPeriodsInfoResponse.data,
        active: Boolean(deviceModelInfoResponse.data?.active),
      });
    }
  }, [
    deviceModelInfoResponse.data,
    deviceModelCommunicationPeriodsInfoResponse.data,
    reset,
  ]);

  const mutationUpdateDefinitionDeviceModelCommunicationPeriods = useMutation({
    mutationFn: updateDefinitionDeviceModelCommunicationPeriods,
    onSuccess: async () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['device models list'] });
      toast.success(getTranslatedValue('SaveSuccess'));
      setIsVisible(false);
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const mutationUpdateDefinitionDeviceModel = useMutation({
    mutationFn: updateDefinitionDeviceModel,
    onSuccess: async ({ data, response }) => {
      const definitionDeviceModelCommunicationPeriods = {
        deviceModelId: response?.id,
        elecInstantValue: data?.elecInstantValue,
        elecInstantValueSave: data?.elecInstantValueSave,
        elecInstantValueLMED: data?.elecInstantValueLMED,
        elecHarmonic: data?.elecHarmonic,
        elecHarmonicSave: data?.elecHarmonicSave,
        elecHarmonicLMED: data?.elecHarmonicLMED,
        elecIndexValue: data?.elecIndexValue,
        elecIndexValueSave: data?.elecIndexValueSave,
        elecIndexValueLMED: data?.elecIndexValueLMED,
        elecDemandInstant: data?.elecDemandInstant,
        elecDemandInstantSave: data?.elecDemandInstantSave,
        elecDemandInstantLMED: data?.elecDemandInstantLMED,
        elecDemandMonthly: data?.elecDemandMonthly,
        elecDemandMonthlySave: data?.elecDemandMonthlySave,
        elecDemandMonthlyLMED: data?.elecDemandMonthlyLMED,
        elecAlarmLog: data?.elecAlarmLog,
        elecAlarmLogSave: data?.elecAlarmLogSave,
        elecAlarmLogLMED: data?.elecAlarmLogLMED,
        elecMinMaxValue: data?.elecMinMaxValue,
        elecMinMaxValueSave: data?.elecMinMaxValueSave,
        elecMinMaxValueLMED: data?.elecMinMaxValueLMED,
        elecStep: data?.elecStep,
        elecStepSave: data?.elecStepSave,
        elecStepLMED: data?.elecStepLMED,
        elecDigInputLog: data?.elecDigInputLog,
        elecDigInputLogSave: data?.elecDigInputLogSave,
        elecDigInputLogLMED: data?.elecDigInputLogLMED,
        elecArchive: data?.elecArchive,
        elecArchiveSave: data?.elecArchiveSave,
        elecArchiveLMED: data?.elecArchiveLMED,
        elecStatusValue: data?.elecStatusValue,
        elecStatusValueSave: data?.elecStatusValueSave,
        elecStatusValueLMED: data?.elecStatusValueLMED,
        ioDeviceSensorValue: data?.ioDeviceSensorValue,
        ioDeviceSensorValueSave: data?.ioDeviceSensorValueSave,
        ioDeviceSensorValueLMED: data?.ioDeviceSensorValueLMED,
        ioDeviceCounterValue: data?.ioDeviceCounterValue,
        ioDeviceCounterValueSave: data?.ioDeviceCounterValueSave,
        ioDeviceCounterValueLMED: data?.ioDeviceCounterValueLMED,
        generatorValue: data?.generatorValue,
        generatorValueSave: data?.generatorValueSave,
        generatorValueLMED: data?.generatorValueLMED,
        compressorValue: data?.compressorValue,
        compressorValueSave: data?.compressorValueSave,
        compressorValueLMED: data?.compressorValueLMED,
        ngInstantMeasurementValue: data?.ngInstantMeasurementValue,
        ngInstantMeasurementValueSave: data?.ngInstantMeasurementValueSave,
        ngInstantMeasurementValueLMED: data?.ngInstantMeasurementValueLMED,
        ngComponentValue: data?.ngComponentValue,
        ngComponentValueSave: data?.ngComponentValueSave,
        ngComponentValueLMED: data?.ngComponentValueLMED,
        ngArchive: data?.ngArchive,
        ngArchiveSave: data?.ngArchiveSave,
        ngArchiveLMED: data?.ngArchiveLMED,
        fmInstantValue: data?.fmInstantValue,
        fmInstantValueSave: data?.fmInstantValueSave,
        fmInstantValueLMED: data?.fmInstantValueLMED,
        ngChromatography: data?.ngChromatography,
        ngChromatographySave: data?.ngChromatographySave,
        ngChromatographyLMED: data?.ngChromatographyLMED,
        elecInverterInstantValue: data?.elecInverterInstantValue,
        elecInverterInstantValueSave: data?.elecInverterInstantValueSave,
        elecInverterInstantValueLMED: data?.elecInverterInstantValueLMED,
      };
      mutationUpdateDefinitionDeviceModelCommunicationPeriods.mutate({
        formData: definitionDeviceModelCommunicationPeriods,
        deviceModelId: deviceModelCommunicationPeriodsInfoResponse.data?.id,
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const onSubmit = (data: deviceModelInitialValuesTypes) => {
    const definitionDeviceModelData = {
      active: data?.active,
      deviceModelCode: data?.deviceModelCode,
      deviceModelTypeId: data?.deviceModelTypeId,
      deviceModelName: data?.deviceModelName,
      deviceModelProtocolId: data?.deviceModelProtocolId,
      deviceModelDescription: data?.deviceModelDescription,
      willTopic: data?.willTopic,
      writeFunction: data?.writeFunction,
      deviceModelIsOur: true,
      deviceModelBaudRate: 0,
      deviceModelDataBit: 0,
      deviceModelParity: 0,
      deviceModelStopBit: 0,
      archivePeriodRegisterCount: 0,
      hourlyArchiveTotalCount: 0,
      hourlyArchiveStartAddress: 0,
      dailyArchiveTotalCount: 0,
      dailyArchiveStartAddress: 0,
      monthlyArchiveTotalCount: 0,
      monthlyArchiveStartAddress: 0,
    };

    mutationUpdateDefinitionDeviceModel.mutate({
      data,
      body: definitionDeviceModelData,
      deviceModelId,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-device-model-form">
      <ModalHeader isEdit label="Update" setShowModal={setIsVisible} />
      <DeviceModelFormContent
        control={control}
        errors={errors}
        register={register}
        isEdit={true}
        setValue={setValue}
      />
      {deviceModelInfoResponse?.isLoading ||
      deviceModelCommunicationPeriodsInfoResponse?.isFetching ? (
        <Loader />
      ) : null}
      <SubmitOrCancelButtons
        handleCancelForm={() => setIsVisible(false)}
        isPending={
          mutationUpdateDefinitionDeviceModel.isPending ||
          mutationUpdateDefinitionDeviceModelCommunicationPeriods.isPending
        }
      />
    </form>
  );
};

const EditDeviceModel = memo(MemoEditDeviceModel);

export default EditDeviceModel;
