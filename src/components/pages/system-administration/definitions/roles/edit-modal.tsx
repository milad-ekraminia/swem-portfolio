import { useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  roleInitialValues,
  roleResolver,
  roleValuesTypes,
} from '@/validations/system-administration/definitions/roles-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { updateRole } from '@/services/system-administration/definitions/roles';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { RoleFormContent } from './form-content';

const EditRoleModal = ({
  setShowModal,
  roleInfo,
}: {
  setShowModal: any;
  roleInfo: any;
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<roleValuesTypes>({
    resolver: yupResolver(roleResolver),
    defaultValues: roleInitialValues,
  });

  useEffect(() => {
    reset({
      name: roleInfo?.name,
      isDefault: roleInfo?.isDefault,
      isPublic: roleInfo?.isPublic,
    });
  }, [roleInfo]);

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({
      queryKey: ['Get Roles List'],
    });
    toast.success(getTranslatedValue('SaveSuccess'));
    setShowModal(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewRole = useMutation({
    mutationFn: updateRole,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: roleValuesTypes) => {
    mutationNewRole.mutate({
      roleId: roleInfo?.id,
      formData,
    });
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader isEdit label="Update" setShowModal={setShowModal} />
      <RoleFormContent
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          setShowModal(null);
        }}
        isPending={mutationNewRole?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default EditRoleModal;
