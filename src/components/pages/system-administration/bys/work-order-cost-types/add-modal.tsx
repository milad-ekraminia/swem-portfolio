import { memo } from 'react';
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
import { createNewWorkOrderCostType } from '@/services/system-administration/bys/work-order-cost-types-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import WorkOrderCostTypeFormContent from './form-content';

const MemoNewWorkOrderCostType = ({ onClose }: { onClose: any }) => {
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

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({
      queryKey: ['Work Order Cost Types List'],
    });
    toast.success(getTranslatedValue('SaveSuccess'));
    onClose();
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewWorkOrderCostType = useMutation({
    mutationFn: createNewWorkOrderCostType,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: any) => {
    mutationNewWorkOrderCostType.mutate(formData);
  };
  return (
    <form
      className="global-modal work-notification-types-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader label="NewWorkOrderCostType" setShowModal={onClose} />
      <WorkOrderCostTypeFormContent
        control={control}
        register={register}
        errors={errors}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
        }}
        isPending={mutationNewWorkOrderCostType?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const NewWorkOrderCostTypeModal = memo(MemoNewWorkOrderCostType);

export default NewWorkOrderCostTypeModal;
