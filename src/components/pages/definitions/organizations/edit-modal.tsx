import { memo, useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  addOrganizationInitialValues,
  AddOrganizationProps,
  addOrganizationResolver,
} from '@/validations/definitions/definitions-organizations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  fetchEditOrgPlantDetailLookup,
  fetchLocationNamesList,
  updateOrganization,
} from '@/services/definitions/organizations/organizations-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import OrganizationModalContent from './form-content';

const MemoUpdateOrganizationModal = ({
  setIsVisible,
  ng,
  re,
  organizationInfo,
}: {
  setIsVisible: (value: boolean) => void;
  ng: number;
  re: number;
  organizationInfo: any;
}) => {
  const queryClient = useQueryClient();
  const { org_id } = useSelector((state: any) => state.orgId.info);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<AddOrganizationProps>({
    resolver: yupResolver(addOrganizationResolver) as any,
    defaultValues: addOrganizationInitialValues,
    context: {
      ng,
      re,
    },
  });

  const { data: orgPlantDetailLookup, isLoading: orgPlantDetailLookupLoading } =
    useQuery({
      queryKey: ['organization plant details', organizationInfo?.id],
      queryFn: () => fetchEditOrgPlantDetailLookup(organizationInfo?.id),
      retry: false,
    });

  useEffect(() => {
    if (organizationInfo) {
      reset({
        ...organizationInfo,
        organizationPlantDetails: orgPlantDetailLookup,
      });
    }
  }, [organizationInfo, orgPlantDetailLookup]);

  useEffect(() => {
    if (org_id) {
      setValue('organizationParentId', org_id);
    }
  }, [org_id, setValue]);

  const { data: locationNames, isLoading: locationNamesLoading } = useQuery({
    queryKey: ['Location Names List'],
    queryFn: fetchLocationNamesList,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: updateOrganization,
    onSuccess: () => {
      toast.success(getTranslatedValue('SaveSuccess'));
      setIsVisible(false);
      reset();
      queryClient.invalidateQueries({ queryKey: ['sub organizations'] });
    },

    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate({ ...data, orgId: organizationInfo.id });
  };

  return (
    <Modal
      modalSize="md"
      isOpen={true}
      onClose={() => setIsVisible(false)}
      showCloseButton={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="dv-organization-modal">
        <ModalHeader isEdit label="Update" setShowModal={setIsVisible} />
        <OrganizationModalContent
          register={register}
          errors={errors}
          control={control}
          locationNames={locationNames}
          locationNamesLoading={locationNamesLoading}
          ng={ng}
          re={re}
          isEdit={true}
          setValue={setValue}
          isLoading={orgPlantDetailLookupLoading}
        />
        <SubmitOrCancelButtons
          handleCancelForm={() => setIsVisible(false)}
          isPending={mutation.isPending}
        />
      </form>
    </Modal>
  );
};

const UpdateOrganizationModal = memo(MemoUpdateOrganizationModal);

export default UpdateOrganizationModal;
