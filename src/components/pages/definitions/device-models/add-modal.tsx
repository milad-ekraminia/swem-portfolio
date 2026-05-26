import { memo } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  addDeviceModelResolver,
  deviceModelInitialValues,
  deviceModelInitialValuesTypes,
} from '@/validations/definitions/device-models/device-model-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewDefinitionDeviceModel,
  createNewDefinitionDeviceModelCommunicationPeriods,
} from '@/services/definitions/device-models';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import DeviceModelFormContent from './form-content';

export const MemoAddDeviceModel = ({
  setIsVisible,
}: {
  setIsVisible: (value: boolean) => void;
}) => {
  const queryClient = useQueryClient();

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

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['device models list'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    setIsVisible(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewDefinitionDeviceModelCommunicationPeriods = useMutation({
    mutationFn: createNewDefinitionDeviceModelCommunicationPeriods,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const mutationNewDefinitionDeviceModel = useMutation({
    mutationFn: createNewDefinitionDeviceModel,
    onSuccess: ({ data, response }) => {
      const communicationPeriods = Object.keys(data).reduce(
        (acc, key) => {
          if (
            key.startsWith('elec') ||
            key.startsWith('ng') ||
            key.startsWith('fm')
          ) {
            acc[key] = data[key];
          }
          return acc;
        },
        {} as Record<string, any>,
      );

      mutationNewDefinitionDeviceModelCommunicationPeriods.mutate({
        deviceModelId: response?.id,
        ...communicationPeriods,
      });
    },
    onError: handleError,
  });

  const onSubmit = (formData: deviceModelInitialValuesTypes) => {
    const newDefinitionDeviceModelData = {
      ...formData,
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

    mutationNewDefinitionDeviceModel.mutate({
      data: formData,
      body: newDefinitionDeviceModelData,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-device-model-form">
      <ModalHeader label="CreateNewDeviceModel" setShowModal={setIsVisible} />
      <DeviceModelFormContent
        control={control}
        errors={errors}
        register={register}
        isEdit={false}
        setValue={setValue}
      />

      <SubmitOrCancelButtons
        handleCancelForm={() => setIsVisible(false)}
        isPending={mutationNewDefinitionDeviceModel.isPending}
      />
    </form>
  );
};
const AddDeviceModel = memo(MemoAddDeviceModel);

export default AddDeviceModel;
