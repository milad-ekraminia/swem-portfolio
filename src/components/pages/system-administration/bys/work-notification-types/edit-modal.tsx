import { memo, useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { createWorkNotificationTypes } from '@/validations/system-administration/bys/work-notification-types-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { updateWorkNotificationTypeDetails } from '@/services/system-administration/bys/work-notification-types-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import WorkNotificationTypeFormContent from './form-content';

const MemoNewWorkNotificationType = ({
  onClose,
  info,
}: {
  onClose: any;
  info: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(createWorkNotificationTypes),
  });

  const queryClient = useQueryClient();
  // Add this inside your component, after the useForm declaration:
  useEffect(() => {
    if (info) {
      reset({
        typeDescription: info?.typeDescription,
      });
    }
  }, [info, reset]);

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({
      queryKey: ['Get Work Notification Types List'],
    });
    toast.success(getTranslatedValue('EditSuccess'));
    onClose();
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationUpdateWorkNotificationType = useMutation({
    mutationFn: updateWorkNotificationTypeDetails,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: any) => {
    mutationUpdateWorkNotificationType.mutate({
      body: formData,
      workNotificationTypeId: info?.id,
    });
  };
  return (
    <form
      className="global-modal work-notification-types-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader isEdit label="Update" setShowModal={onClose} />
      <WorkNotificationTypeFormContent register={register} errors={errors} />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
        }}
        isPending={mutationUpdateWorkNotificationType?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const UpdateWorkNotificationTypeModal = memo(MemoNewWorkNotificationType);

export default UpdateWorkNotificationTypeModal;
