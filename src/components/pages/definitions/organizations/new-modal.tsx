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
  createNewOrganization,
  fetchLocationNamesList,
} from '@/services/definitions/organizations/organizations-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import OrganizationModalContent from './form-content';

const MemoAddNewOrganizationModal = ({
  setIsVisible,
  ng,
  re,
}: {
  setIsVisible: (value: boolean) => void;
  ng: number;
  re: number;
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
    mutationFn: createNewOrganization,
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
    mutation.mutate(data);
  };

  return (
    <Modal
      modalSize="md"
      isOpen={true}
      onClose={() => setIsVisible(false)}
      showCloseButton={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="dv-organization-modal">
        <ModalHeader label="NewOrganization" setShowModal={setIsVisible} />
        <OrganizationModalContent
          register={register}
          errors={errors}
          control={control}
          locationNames={locationNames}
          locationNamesLoading={locationNamesLoading}
          ng={ng}
          re={re}
          isEdit={false}
          setValue={setValue}
        />
        <SubmitOrCancelButtons
          handleCancelForm={() => setIsVisible(false)}
          isPending={mutation.isPending}
        />
      </form>
    </Modal>
  );
};

const AddNewOrganizationModal = memo(MemoAddNewOrganizationModal);

export default AddNewOrganizationModal;
