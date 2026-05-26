import { useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  usersInitialValues,
  usersResolver,
  usersValuesTypes,
} from '@/validations/system-administration/definitions/users-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  getUserUnits,
  updateUser,
} from '@/services/system-administration/definitions/users';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { UserFormContent } from './form-content';

const EditUserModal = ({
  setShowModal,
  userOrganizationProfileLookup,
  mimicProfilesLookup,
  organizationLookup,
  assignableRolesList,
  // availableOrganizationUnits,
  userInfo,
}: {
  setShowModal: any;
  userOrganizationProfileLookup: any;
  mimicProfilesLookup: any;
  organizationLookup: any;
  assignableRolesList: any;
  // availableOrganizationUnits: any;
  userInfo: any;
}) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['Get User Organization Units', userInfo?.id],
    queryFn: () => getUserUnits(userInfo?.id),
    retry: false,
    enabled: !!userInfo?.id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<usersValuesTypes>({
    resolver: yupResolver(usersResolver({ isEditMode: true }) as any),
    defaultValues: usersInitialValues,
  });

  useEffect(() => {
    if (data) {
      reset({
        ...userInfo,
        organizationUnitIds: data?.map((item: any) => item.id),
      });
    } else {
      reset(userInfo);
    }
  }, [userInfo, reset, data]);

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

  const mutationUpdateUser = useMutation({
    mutationFn: updateUser,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: usersValuesTypes) => {
    if (formData.phoneNumber?.length === 0) formData['phoneNumber'] = null;
    mutationUpdateUser.mutate({ formData, userId: userInfo?.id });
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader isEdit label="Update" setShowModal={setShowModal} />
      <UserFormContent
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
        userOrganizationProfileLookup={userOrganizationProfileLookup}
        mimicProfilesLookup={mimicProfilesLookup}
        organizationLookup={organizationLookup}
        assignableRolesList={assignableRolesList}
        // availableOrganizationUnits={availableOrganizationUnits}
        isEdit
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          setShowModal(null);
        }}
        isPending={mutationUpdateUser?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default EditUserModal;
