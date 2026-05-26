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
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { displayNameListItemType } from '@/types/pages/definitions/multi-conditional-statuses';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewProduct } from '@/services/inventory-management/products/create-product-api';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import WorkOrderFormContent from '../new-work-order/form-content';

const WorkOrderPreviewModal = ({
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
  categoryLookup: any;
  workOrderInfo: any;
  workOrdersTypeLookup: displayNameListItemType[];
  organizationsLookup: displayNameListItemType[];
  deviceLookup: displayNameListItemType[];
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
      deviceId: workOrderInfo?.workOrderDeviceId,
      deviceCaption: deviceCaption ?? '',
      active: workOrderInfo?.active ?? false,
      workOrderState: workOrderInfo?.workOrderState ?? false,
    });
  }, [workOrderInfo, reset]);

  const mutation = useMutation({
    mutationFn: createNewProduct,
    onSuccess: async () => {
      reset();
      toast.success(getTranslatedValue('SaveSuccess'));
      setIsVisible(false);
      queryClient.invalidateQueries({ queryKey: ['Products List'] });
    },

    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const onSubmit = (data: workOrderValuesTypes) => {
    mutation.mutate(data);
  };

  // const handleCancelForm = (e: any) => {
  //   e.preventDefault();
  //   reset();
  //   setIsVisible(false);
  // };

  return (
    <form
      className="global-modal bys-work-orders-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader
        isEdit={false}
        label="ShowWorkOrder"
        setShowModal={setIsVisible}
        isPreview
      />

      <WorkOrderFormContent
        workOrderInfo={workOrderInfo}
        errors={errors}
        register={register}
        isAllDisabled
        control={control}
        setValue={setValue}
        workOrdersTypeLookup={notificationTypeLookup}
        userLookup={userLookup}
        categoryLookup={categoryLookup}
      />
    </form>
  );
};

export default WorkOrderPreviewModal;
