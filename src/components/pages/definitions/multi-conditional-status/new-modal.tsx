import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  multiConditionalStatusInitialValues,
  multiConditionalStatusInitialValuesTypes,
  multiConditionalStatusResolver,
} from '@/validations/definitions/multi-conditional-status/multi-conditional-statuses-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { multiConditionalStatusesListType } from '@/types/pages/definitions/multi-conditional-statuses';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewConditionalStatus } from '@/services/definitions/multi-conditional-status/multi-conditional-status-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import MultiConditionalStatusFormContent from './form-content';

const NewMultiConditionalStatusModal = ({
  setShowEditModal,
  timePeriodLookupResponse,
  deviceLookupResponse,
  labelLookupyResponse,
  derivedValueLookupResponse,
  userLookupResponse,
}: {
  setShowEditModal: any;
  timePeriodLookupResponse: multiConditionalStatusesListType;
  deviceLookupResponse: multiConditionalStatusesListType;
  labelLookupyResponse: multiConditionalStatusesListType;
  derivedValueLookupResponse: multiConditionalStatusesListType;
  userLookupResponse: multiConditionalStatusesListType;
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<multiConditionalStatusInitialValuesTypes>({
    resolver: yupResolver(multiConditionalStatusResolver as any),
    defaultValues: multiConditionalStatusInitialValues,
  });

  const handleSuccess = async () => {
    queryClient.invalidateQueries({
      queryKey: ['Get Multi Conditional Statuses List'],
    });
    toast.success(getTranslatedValue('SaveSuccess'));
    setShowEditModal(false);
    reset();
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewMultiConditionalStatus = useMutation({
    mutationFn: createNewConditionalStatus,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: any) => {
    mutationNewMultiConditionalStatus.mutate({ formData });
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={false}
        label="NewMultiConditionalStatus"
        setShowModal={setShowEditModal}
      />
      <MultiConditionalStatusFormContent
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
        timePeriodLookupResponse={timePeriodLookupResponse}
        deviceLookupResponse={deviceLookupResponse}
        labelLookupyResponse={labelLookupyResponse}
        derivedValueLookupResponse={derivedValueLookupResponse}
        userLookupResponse={userLookupResponse}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          setShowEditModal(false);
        }}
        isPending={mutationNewMultiConditionalStatus?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default NewMultiConditionalStatusModal;
