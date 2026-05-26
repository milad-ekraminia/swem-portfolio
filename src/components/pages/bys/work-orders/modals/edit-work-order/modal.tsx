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
import {
  acceptWorkOrderApi,
  rejectWorkOrderApi,
} from '@/services/bys/work-orders/work-orders';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import CustomSubmitOrCancelButtons from './custom-submit-buttons';
import EditWorkOrderFormContent from './form-content';

const EditWorkOrderModal = ({
  setIsVisible,
  notificationTypeLookup,
  userLookup,
  categoryLookup,
  workOrderInfo,
  organizationsLookup,
  deviceLookup,
}: {
  setIsVisible: (value: any) => void;
  notificationTypeLookup: displayNameListItemType[];
  userLookup: displayNameListItemType[];
  getLastWorkOrderId: any;
  categoryLookup: any;
  workOrderInfo: any;
  organizationsLookup: any;
  deviceLookup: any;
}) => {
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

  // const handleCancelForm = (e: any) => {
  //   e.preventDefault();
  //   reset();
  //   setIsVisible(false);
  // };
  useEffect(() => {
    if (!workOrderInfo) return;

    const deviceCaption =
      organizationsLookup?.find(
        (elem: { id: number | string }) =>
          elem?.id === workOrderInfo?.workOrderDeviceId,
      )?.displayName ??
      deviceLookup?.find(
        (elem: { id: number | string }) =>
          elem?.id === workOrderInfo?.workOrderDeviceId,
      )?.displayName;

    reset({
      // required string
      workOrderAssetType: workOrderInfo.workOrderAssetType,
      workOrderAssetNodeId: workOrderInfo.workOrderAssetNodeId ?? -1,
      workOrderDescription: workOrderInfo.workOrderDescription,
      // dates (nullable strings)
      workOrderStartDateTime: workOrderInfo.workOrderStartDateTime ?? null,
      workOrderEndDateTime: workOrderInfo.workOrderEndDateTime ?? null,
      // required string
      workOrderNo: workOrderInfo.workOrderNo,
      // required string
      workOrderAssignedUserId: workOrderInfo.workOrderAssignedUserId,
      // numbers (can be undefined, but your initialValues gives defaults)
      workOrderPriority: workOrderInfo.workOrderPriority,
      workOrderType: workOrderInfo.workOrderType,
      workOrderCategory: workOrderInfo.workOrderCategory,
      // choose deviceId from asset tree
      workOrderDeviceId: workOrderInfo?.workOrderDeviceId ?? undefined,
      // deviceId: workOrderInfo?.workOrderDeviceId,
      deviceCaption: deviceCaption ?? '',
      active: workOrderInfo?.active ?? false,
      workOrderState: workOrderInfo?.workOrderState ?? false,
      workOrderSolutionDescription:
        workOrderInfo?.workOrderSolutionDescription ?? '',
    });
  }, [workOrderInfo, reset]);

  const queryClient = useQueryClient();

  const handleSuccess = async () => {
    queryClient.invalidateQueries({
      queryKey: ['Work Orders Organization Device Filtered List'],
    });
    toast.success(getTranslatedValue('success'));
    setIsVisible(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationAcceptWorkOrder = useMutation({
    mutationFn: acceptWorkOrderApi,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleAcceptWorkOrder = () => {
    mutationAcceptWorkOrder.mutate({ workOrderId: workOrderInfo?.id });
  };

  const mutationRejectWorkOrder = useMutation({
    mutationFn: rejectWorkOrderApi,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleRejectWorkOrder = () => {
    mutationRejectWorkOrder.mutate({ workOrderId: workOrderInfo?.id });
  };

  return (
    <form
      className="global-modal"
      onSubmit={handleSubmit(handleAcceptWorkOrder)}
    >
      <ModalHeader isEdit label="Edit" setShowModal={setIsVisible} />

      <EditWorkOrderFormContent
        errors={errors}
        register={register}
        control={control}
        isAllDisabled
        setValue={setValue}
        workOrdersTypeLookup={notificationTypeLookup}
        userLookup={userLookup}
        categoryLookup={categoryLookup}
      />

      <CustomSubmitOrCancelButtons
        handleCancelForm={() => {
          handleRejectWorkOrder();
          setIsVisible(false);
        }}
        isPending={false}
        rejectButtonText={getTranslatedValue('RejectWorkOrder')}
        confirmButtonText={getTranslatedValue('AcceptWorkOrder')}
      />
    </form>
  );
};

export default EditWorkOrderModal;
