import { memo, useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  workOrderCostTypeInitialValues,
  workOrderCostTypeInitialValuesTypes,
  workOrderCostTypeResolver,
} from '@/validations/system-administration/bys/work-order-cost-type-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { updateWorkOrderCostTypeDetails } from '@/services/system-administration/bys/work-order-cost-types-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import WorkOrderCostTypeFormContent from './form-content';

const MemoNewWorkNotificationType = ({
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
    control,
    formState: { errors },
    reset,
  } = useForm<workOrderCostTypeInitialValuesTypes>({
    resolver: yupResolver(workOrderCostTypeResolver) as any,
    defaultValues: workOrderCostTypeInitialValues,
  });

  // Add this inside your component, after the useForm declaration:
  useEffect(() => {
    if (info) {
      reset({
        active: info.active,
        typeDescription: info.typeDescription,
      });
    }
  }, [info, reset]);

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['Work Order Cost Types List'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    onClose();
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationUpdateWorkOrderCostType = useMutation({
    mutationFn: updateWorkOrderCostTypeDetails,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: workOrderCostTypeInitialValuesTypes) => {
    mutationUpdateWorkOrderCostType.mutate({
      body: formData,
      workOrderCostTypeId: info?.id,
    });
  };
  return (
    <form
      className="global-modal work-notification-types-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader isEdit label="Update" setShowModal={onClose} />
      <WorkOrderCostTypeFormContent
        control={control}
        register={register}
        errors={errors}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
        }}
        isPending={mutationUpdateWorkOrderCostType?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const UpdateWorkNotificationTypeModal = memo(MemoNewWorkNotificationType);

export default UpdateWorkNotificationTypeModal;
