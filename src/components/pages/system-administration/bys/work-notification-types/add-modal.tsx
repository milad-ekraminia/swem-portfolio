import { memo } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { createWorkNotificationTypes } from '@/validations/system-administration/bys/work-notification-types-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewWorkNotificationType } from '@/services/system-administration/bys/work-notification-types-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import WorkNotificationTypeFormContent from './form-content';

const MemoNewWorkNotificationType = ({ onClose }: { onClose: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(createWorkNotificationTypes),
  });

  const queryClient = useQueryClient();

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({
      queryKey: ['Get Work Notification Types List'],
    });
    toast.success(getTranslatedValue('SaveSuccess'));
    onClose();
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewWorkNotificationType = useMutation({
    mutationFn: createNewWorkNotificationType,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: any) => {
    mutationNewWorkNotificationType.mutate(formData);
  };
  return (
    <form
      className="global-modal work-notification-types-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader label="NewWorkNotificationType" setShowModal={onClose} />
      <WorkNotificationTypeFormContent register={register} errors={errors} />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
        }}
        isPending={mutationNewWorkNotificationType?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const NewWorkNotificationTypeModal = memo(MemoNewWorkNotificationType);

export default NewWorkNotificationTypeModal;
