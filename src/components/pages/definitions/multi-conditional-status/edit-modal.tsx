import { useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  multiConditionalStatusInitialValues,
  multiConditionalStatusInitialValuesTypes,
  multiConditionalStatusResolver,
} from '@/validations/definitions/multi-conditional-status/multi-conditional-statuses-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { multiConditionalStatusesListType } from '@/types/pages/definitions/multi-conditional-statuses';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  fetchDefinitionsConditionalDetail,
  updateConditionalStatus,
} from '@/services/definitions/multi-conditional-status/multi-conditional-status-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import MultiConditionalStatusFormContent from './form-content';

const EditMultiConditionalStatusModal = ({
  setShowEditModal,
  timePeriodLookupResponse,
  deviceLookupResponse,
  labelLookupyResponse,
  derivedValueLookupResponse,
  userLookupResponse,
  conditionalId,
}: {
  setShowEditModal: any;
  timePeriodLookupResponse: multiConditionalStatusesListType;
  deviceLookupResponse: multiConditionalStatusesListType;
  labelLookupyResponse: multiConditionalStatusesListType;
  derivedValueLookupResponse: multiConditionalStatusesListType;
  userLookupResponse: multiConditionalStatusesListType;
  conditionalId: number;
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

  const { data } = useQuery({
    queryKey: ['conditionalDetail', conditionalId],
    queryFn: () => fetchDefinitionsConditionalDetail({ conditionalId }),
    retry: false,
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

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
    mutationFn: updateConditionalStatus,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: any) => {
    mutationNewMultiConditionalStatus.mutate({ formData, conditionalId });
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader isEdit label="Update" setShowModal={setShowEditModal} />
      <MultiConditionalStatusFormContent
        control={control}
        errors={errors}
        register={register}
        setValue={setValue}
        timePeriodLookupResponse={timePeriodLookupResponse}
        deviceLookupResponse={deviceLookupResponse}
        labelLookupyResponse={labelLookupyResponse}
        derivedValueLookupResponse={derivedValueLookupResponse}
        userLookupResponse={userLookupResponse}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          setShowEditModal(null);
        }}
        isPending={mutationNewMultiConditionalStatus?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default EditMultiConditionalStatusModal;
