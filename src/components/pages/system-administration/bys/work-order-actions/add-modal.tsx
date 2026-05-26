import { memo } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  workOrderActionInitialValues,
  workOrderActionInitialValuesTypes,
  workOrderActionResolver,
} from '@/validations/system-administration/bys/work-order-action-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewWorkOrderAction } from '@/services/system-administration/bys/work-order-actions-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import SystemManagementWorkOrderActionFormContent from './form-content';

const MemoNewWorkOrderAction = ({ onClose }: { onClose: any }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<workOrderActionInitialValuesTypes>({
    resolver: yupResolver(workOrderActionResolver) as any,
    defaultValues: workOrderActionInitialValues,
  });

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({
      queryKey: ['Get Work Order Actions List'],
    });
    toast.success(getTranslatedValue('SaveSuccess'));
    onClose();
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewWorkOrderAction = useMutation({
    mutationFn: createNewWorkOrderAction,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: workOrderActionInitialValuesTypes) => {
    mutationNewWorkOrderAction.mutate(formData);
  };

  return (
    <form
      className="global-modal work-order-actions-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader label="NewWorkOrderAction" setShowModal={onClose} />
      <SystemManagementWorkOrderActionFormContent
        setValue={setValue}
        control={control}
        register={register}
        errors={errors}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
        }}
        isPending={mutationNewWorkOrderAction?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const NewSystemManagementWorkOrderActionModal = memo(MemoNewWorkOrderAction);

export default NewSystemManagementWorkOrderActionModal;
