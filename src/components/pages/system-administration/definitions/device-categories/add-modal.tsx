import { memo } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  deviceCategoriesInitialValues,
  deviceCategoriesInitialValuesTypes,
  deviceCategoriesResolver,
} from '@/validations/system-administration/definitions/device-categories-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewDeviceCategory } from '@/services/system-administration/bys/device-categories-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import WorkOrderTypeFormContent from './form-content';

const MemoNewModal = ({ onClose }: { onClose: any }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<deviceCategoriesInitialValuesTypes>({
    resolver: yupResolver(deviceCategoriesResolver) as any,
    defaultValues: deviceCategoriesInitialValues,
  });

  const mutation = useMutation({
    mutationFn: createNewDeviceCategory,
    onSuccess: async () => {
      reset();
      toast.success(getTranslatedValue('SaveSuccess'));
      onClose(false);
      queryClient.invalidateQueries({
        queryKey: ['fetch device categories list'],
      });
    },

    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const onSubmit = (data: deviceCategoriesInitialValuesTypes) => {
    mutation.mutate(data);
  };

  return (
    <form className="global-modal " onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader label="NewDeviceCategory" setShowModal={onClose} />
      <WorkOrderTypeFormContent
        control={control}
        register={register}
        errors={errors}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
        }}
        isPending={mutation?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const NewDeviceCategoryModal = memo(MemoNewModal);

export default NewDeviceCategoryModal;
