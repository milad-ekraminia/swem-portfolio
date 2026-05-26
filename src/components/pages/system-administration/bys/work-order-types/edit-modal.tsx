import { memo, useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  workOrderTypeInitialValues,
  workOrderTypeInitialValuesTypes,
  workOrderTypeResolver,
} from '@/validations/system-administration/bys/work-order-types-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { updateWorkOrderTypeDetails } from '@/services/system-administration/bys/work-order-types-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import WorkOrderTypeFormContent from './form-content';

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
    formState: { errors },
    reset,
    control,
  } = useForm<workOrderTypeInitialValuesTypes>({
    resolver: yupResolver(workOrderTypeResolver) as any,
    defaultValues: workOrderTypeInitialValues,
  });

  // Add this inside your component, after the useForm declaration:
  useEffect(() => {
    if (info) {
      reset({
        active: Boolean(info?.active),
        typeDescription: info?.typeDescription,
      });
    }
  }, [info, reset]);

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['Get Work Order Types'] });
    toast.success(getTranslatedValue('EditSuccess'));
    onClose();
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationUpdateWorkOrderType = useMutation({
    mutationFn: updateWorkOrderTypeDetails,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: workOrderTypeInitialValuesTypes) => {
    mutationUpdateWorkOrderType.mutate({
      body: formData,
      workOrderTypeId: info?.id,
    });
  };

  return (
    <form
      className="global-modal work-notification-types-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        isPending={mutationUpdateWorkOrderType?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const UpdateWorkOrderTypeModal = memo(MemoNewWorkNotificationType);

export default UpdateWorkOrderTypeModal;
