import { memo, useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  createUserOrganizationProfileInitialValues,
  createUserOrganizationProfileInitialValuesTypes,
  createUserOrganizationProfileResolver,
} from '@/validations/system-administration/definitions/create-user-organization-profile-validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { editUserOrganizationProfile } from '@/services/system-administration/bys/user-organization-profiles';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import UserOrganizationProfilesFormContent from './form-content';

const MemoEditModal = ({ onClose, info }: { onClose: any; info: any }) => {
  const queryClient = useQueryClient();

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({
      queryKey: ['Get User Organization Profiles List'],
    });
    toast.success(getTranslatedValue('SaveSuccess'));
    onClose();
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutation = useMutation({
    mutationFn: editUserOrganizationProfile,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createUserOrganizationProfileInitialValuesTypes>({
    resolver: yupResolver(createUserOrganizationProfileResolver),
    defaultValues: createUserOrganizationProfileInitialValues,
  });

  const onSubmit = (
    values: createUserOrganizationProfileInitialValuesTypes,
  ) => {
    const formData = {
      profileName: values?.profileName,
      concurrencyStamp: info?.concurrencyStamp,
    };
    mutation?.mutate({ formData, userId: info?.id });
  };
  useEffect(() => {
    if (info.profileName) {
      reset({
        profileName: info.profileName,
      });
    }
  }, [info, reset]);
  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader isEdit label="Update" setShowModal={onClose} />
      <UserOrganizationProfilesFormContent
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
