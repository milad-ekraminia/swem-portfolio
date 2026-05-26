import { memo, useEffect } from 'react';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  createUserNewProfileDetailItemInitialValues,
  createUserNewProfileDetailItemInitialValuesTypes,
  createUserNewProfileDetailItemResolver,
} from '@/validations/system-administration/definitions/create-new-user-profile-detail-validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  editUserOrganizationProfileDetail,
  getUserOrganizationProfileDetails,
} from '@/services/system-administration/bys/user-organization-profiles';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import UserOrganizationDetailProfilesFormContent from './detail-form-content';

const MemoEditModal = ({
  onClose,
  info,
  organizationLookUp,
  expandedId,
}: {
  onClose: any;
  info?: any;
  organizationLookUp: any;
  expandedId: any;
}) => {
  const queryClient = useQueryClient();

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({
      queryKey: ['Get User Organization Profiles List'],
    });
    queryClient.invalidateQueries({
      queryKey: ['Get User Organization Profile Details', expandedId],
    });
    toast.success(getTranslatedValue('SaveSuccess'));
    onClose();
  };

  const mutation = useMutation({
    mutationFn: editUserOrganizationProfileDetail,
    onSuccess: handleSuccess,
  });

  useEffect(() => {
    const selectedOrganizationName = organizationLookUp?.items?.find(
      (item: any) => item.id === info?.organization?.id,
    );
    if (selectedOrganizationName) {
      reset({
        organizationId: selectedOrganizationName.id,
      });
    }
  }, [info]);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    control,
  } = useForm<createUserNewProfileDetailItemInitialValuesTypes>({
    resolver: yupResolver(createUserNewProfileDetailItemResolver),
    defaultValues: createUserNewProfileDetailItemInitialValues,
  });

  const onSubmit = (
    values: createUserNewProfileDetailItemInitialValuesTypes,
  ) => {
    const formData = {
      organizationId: values.organizationId,
      userOrganizationProfileId:
        info?.userOrganizationProfileDetail?.userOrganizationProfileId,
    };
    mutation?.mutate({
      formData,
      userOrganizationProfileId: info?.userOrganizationProfileDetail?.id,
    });
  };

  const { data: detail } = useQuery({
    queryKey: [
      'Get User Organization Profile Details',
      info?.userOrganizationProfileDetail?.userOrganizationProfileId,
    ],
    queryFn: () =>
      getUserOrganizationProfileDetails({
        id: expandedId,
        maxResultCount: 1000,
      }),
    retry: false,
  });

  const existingIds = detail?.items?.map((item: any) => item?.organization?.id);
  const filteredLookups = organizationLookUp?.items?.filter(
    (item: any) => !existingIds?.includes(item?.id),
  );

  return (
    <form className="global-modal " onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader label="Edit" setShowModal={onClose} />
      <UserOrganizationDetailProfilesFormContent
        register={register}
        errors={errors}
        control={control}
        organizationLookUp={filteredLookups ?? []}
      />
      {getPermission('WebNet.UserOrganizationProfileDetails.Edit') && (
        <SubmitOrCancelButtons
          handleCancelForm={() => {
            onClose();
          }}
          isPending={mutation?.isPending}
          confirmButtonText={getTranslatedValue('Save')}
        />
      )}
    </form>
  );
};

const UpdateDetailsUserOrganizationProfilesModal = memo(MemoEditModal);

export { UpdateDetailsUserOrganizationProfilesModal };
