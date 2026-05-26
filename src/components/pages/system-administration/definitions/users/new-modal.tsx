import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  usersInitialValues,
  usersResolver,
  usersValuesTypes,
} from '@/validations/system-administration/definitions/users-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewUser } from '@/services/system-administration/definitions/users';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { UserFormContent } from './form-content';

const NewUserModal = ({
  setShowModal,
  userOrganizationProfileLookup,
  mimicProfilesLookup,
  organizationLookup,
  assignableRolesList,
  // availableOrganizationUnits,
}: {
  setShowModal: any;
  userOrganizationProfileLookup: any;
  mimicProfilesLookup: any;
  organizationLookup: any;
  assignableRolesList: any;
  // availableOrganizationUnits: any;
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<usersValuesTypes>({
    resolver: yupResolver(usersResolver({ isEditMode: false }) as any),
    defaultValues: usersInitialValues,
  });

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({
      queryKey: ['Get Users List'],
    });
    toast.success(getTranslatedValue('SaveSuccess'));
    setShowModal(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewWorkUser = useMutation({
    mutationFn: createNewUser,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: usersValuesTypes) => {
    if (formData.phoneNumber?.length === 0) formData['phoneNumber'] = null;
    mutationNewWorkUser.mutate(formData);
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isUserAdd
        label={getTranslatedValue('NewUser', 'AbpIdentity.texts')}
        setShowModal={setShowModal}
      />
      <UserFormContent
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
        userOrganizationProfileLookup={userOrganizationProfileLookup}
        mimicProfilesLookup={mimicProfilesLookup}
        organizationLookup={organizationLookup}
        assignableRolesList={assignableRolesList}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          setShowModal(false);
        }}
        isPending={mutationNewWorkUser?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default NewUserModal;
