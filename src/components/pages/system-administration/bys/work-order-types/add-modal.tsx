import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewWorkOrderType } from '@/services/system-administration/bys/work-order-types-api';
import {
  workOrderTypeInitialValues,
  workOrderTypeInitialValuesTypes,
  workOrderTypeResolver,
} from '@/validations/system-administration/bys/work-order-types-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import WorkOrderTypeFormContent from './form-content';

const MemoNewWorkOrderType = ({ onClose }: { onClose: any }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<workOrderTypeInitialValuesTypes>({
    resolver: yupResolver(workOrderTypeResolver) as any,
    defaultValues: workOrderTypeInitialValues,
  });

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['Get Work Order Types'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    onClose();
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewWorkOrderType = useMutation({
    mutationFn: createNewWorkOrderType,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: workOrderTypeInitialValuesTypes) => {
    mutationNewWorkOrderType.mutate(formData);
  };

  return (
    <form
      className="global-modal work-notification-types-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader label="NewWorkOrderType" setShowModal={onClose} />
      <WorkOrderTypeFormContent
        control={control}
        register={register}
        errors={errors}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
        }}
        isPending={mutationNewWorkOrderType?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const NewWorkOrdreTypeModal = memo(MemoNewWorkOrderType);

export default NewWorkOrdreTypeModal;
