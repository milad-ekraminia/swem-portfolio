import { useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  workOrderInitialValues,
  workOrderResolver,
  workOrderValuesTypes,
} from '@/validations/bys/work-order-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { displayNameListItemType } from '@/types/pages/definitions/multi-conditional-statuses';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewWorkOrder } from '@/services/bys/work-orders/work-orders';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import WorkOrderFormContent from './form-content';

const NewWorkOrderModal = ({
  setIsVisible,
  notificationTypeLookup,
  userLookup,
  getLastWorkOrderId,
  categoryLookup,
  refetchId,
  deviceId,
}: {
  setIsVisible: (value: any) => void;
  notificationTypeLookup: displayNameListItemType[];
  userLookup: displayNameListItemType[];
  getLastWorkOrderId: any;
  categoryLookup: any;
  refetchId: any;
  deviceId?: number;
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<workOrderValuesTypes>({
    resolver: yupResolver(workOrderResolver) as any,
    defaultValues: workOrderInitialValues,
  });

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({
      queryKey: ['Work Orders Organization Device Filtered List'],
    });
    queryClient.invalidateQueries({
      queryKey: ['Get Last Work Order Id'],
    });
    refetchId();
    toast.success(getTranslatedValue('SaveSuccess'));
    setIsVisible(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewWorkOrder = useMutation({
    mutationFn: createNewWorkOrder,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: workOrderValuesTypes) => {
    if (formData?.deviceId) {
      formData['workOrderDeviceId'] = formData?.deviceId ?? null;
    }
    mutationNewWorkOrder.mutate(formData);
  };

  const handleCancelForm = (e: any) => {
    e.preventDefault();
    reset();
    setIsVisible(false);
  };

  useEffect(() => {
    if (getLastWorkOrderId) {
      const today = new Date();
      const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');
      reset({
        ...workOrderInitialValues,
        // workOrderStartDateTime: today?.toISOString()?.slice(0, 10),
        workOrderNo: formattedDate + 'IE' + Number(getLastWorkOrderId + 1),
        ...(deviceId && { deviceId }),
      });
    }
  }, [getLastWorkOrderId, reset, deviceId]);

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={false}
        label="NewWorkOrder"
        setShowModal={setIsVisible}
      />

      <WorkOrderFormContent
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
        workOrdersTypeLookup={notificationTypeLookup}
        userLookup={userLookup}
        categoryLookup={categoryLookup}
      />

      <SubmitOrCancelButtons
        handleCancelForm={handleCancelForm}
        isPending={mutationNewWorkOrder?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default NewWorkOrderModal;
