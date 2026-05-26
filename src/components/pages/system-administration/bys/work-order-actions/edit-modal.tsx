import { memo, useEffect } from 'react';
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
import { updateWorkOrderActionDetails } from '@/services/system-administration/bys/work-order-actions-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import SystemManagementWorkOrderActionFormContent from './form-content';

const MemoUpdateWorkOrderActionsModal = ({
  onClose,
  info,
}: {
  onClose: any;
  info: any;
}) => {
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

  // Add this inside your component, after the useForm declaration:
  useEffect(() => {
    if (info) {
      reset({
        id: info.id,
        workOrderId: info.workOrderId,
        actionUserId: info.actionUserId,
        actionDateTime: info.actionDateTime,
        actionType: info.actionType,
        actionDescription: info.actionDescription,
      });
    }
  }, [info, reset]);

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({
      queryKey: ['Get Work Order Actions List'],
    });
    toast.success(getTranslatedValue('SaveSuccess'));
    onClose(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationUpdateWorkOrderAction = useMutation({
    mutationFn: updateWorkOrderActionDetails,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: any) => {
    mutationUpdateWorkOrderAction.mutate({
      body: formData,
      workOrderActionId: info?.id,
    });
  };

  return (
    <form
      className="global-modal work-order-actions-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader isEdit label="Update" setShowModal={onClose} />
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
        isPending={mutationUpdateWorkOrderAction?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const UpdateWorkOrdrActionsModal = memo(MemoUpdateWorkOrderActionsModal);

export default UpdateWorkOrdrActionsModal;
