import { memo, useEffect } from 'react';
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
import { updateDeviceCategory } from '@/services/system-administration/bys/device-categories-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import WorkOrderTypeFormContent from './form-content';

const MemoEditModal = ({ onClose, info }: { onClose: any; info: any }) => {
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

  useEffect(() => {
    if (info) {
      reset({
        categoryName: info?.categoryName,
        active: info?.active,
        categoryDescription: info?.categoryDescription,
      });
    }
  }, [info, reset]);

  const mutation = useMutation({
    mutationFn: updateDeviceCategory,
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
    if (info.concurrencyStamp) {
      mutation.mutate({
        formData: {
          ...data,
          categoryDescription: data.categoryDescription ?? undefined,
          concurrencyStamp: info.concurrencyStamp,
        },
        deviceCategoryId: info?.id,
      });
    }
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader isEdit label="Update" setShowModal={onClose} />
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

const UpdateDeviceCategoryModal = memo(MemoEditModal);

export default UpdateDeviceCategoryModal;
