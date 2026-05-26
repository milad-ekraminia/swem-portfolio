import { memo } from 'react';
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
  createUserOrganizationProfileDetail,
  getUserOrganizationProfileDetails,
} from '@/services/system-administration/bys/user-organization-profiles';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import UserOrganizationDetailProfilesFormContent from './detail-form-content';

const MemoNewModal = ({
  onClose,
  info,
  organizationLookUp,
  expandedId,
}: {
  onClose: any;
  info?: any;
  expandedId?: any;
  organizationLookUp: any;
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
    mutationFn: createUserOrganizationProfileDetail,
    onSuccess: handleSuccess,
  });

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
      userOrganizationProfileId: info?.id,
    };
    mutation?.mutate(formData);
  };

  const { data: detail } = useQuery({
    queryKey: ['Get User Organization Profile Details', info?.id],
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
      <ModalHeader label="NewUserOrganizationProfile" setShowModal={onClose} />
      <UserOrganizationDetailProfilesFormContent
        register={register}
        errors={errors}
        control={control}
        organizationLookUp={filteredLookups ?? []}
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

const NewDetailsUserOrganizationProfilesModal = memo(MemoNewModal);

export { NewDetailsUserOrganizationProfilesModal };
