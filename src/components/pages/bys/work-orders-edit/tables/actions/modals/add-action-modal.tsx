import { toastError } from '@/helpers/error-boundary/toast-error';
import { formatDateTime } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  addActionInitialValues,
  addActionResolver,
  addActionValuesTypes,
} from '@/validations/bys/work-order-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  addWorkOrderActionsApi,
  addWorkOrderActionsImageApi,
} from '@/services/bys/work-orders/work-orders';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import AddActionSubmitOrCancelButtons from './custom-submit-or-cancel-button';
import WorkOrderActionFormContent from './form-content';

const NewWorkOrderActionModal = ({
  setShowModal,
  workOrderInfo,
}: {
  setShowModal: any;
  workOrderInfo: any;
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<addActionValuesTypes>({
    resolver: yupResolver(addActionResolver) as any,
    defaultValues: {
      ...addActionInitialValues,
      workOrderId: workOrderInfo?.id,
      actionUserId: workOrderInfo?.workOrderAssignedUserId,
    },
  });

  const actionDescription = useWatch({
    control,
    name: 'actionDescription',
  });
  const actionType = useWatch({
    control,
    name: 'actionType',
  });
  const inventoryImages = useWatch({
    control,
    name: 'inventoryImages' as any,
  });

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };
  const handleSuccess = async () => {
    if (inventoryImages?.length > 0) {
      const file = inventoryImages[0]?.image;
      const formattedImage = {
        image: `data:image/png;base64,${file}`,
      };

      mutationNewWorkOrderImageAction.mutate({
        ...formattedImage,
        workOrderId: workOrderInfo?.id,
      });
    } else {
      reset();
      queryClient.invalidateQueries({
        queryKey: ['Work Order Actions'],
      });
      toast.success(getTranslatedValue('SaveSuccess'));
      setShowModal(false);
    }
  };

  const mutationNewWorkOrderImageAction = useMutation({
    mutationFn: addWorkOrderActionsImageApi,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ['Work Order Actions'],
      });

      toast.success(getTranslatedValue('SaveSuccess'));
      setShowModal(false);
    },
    // onError: handleError,
  });

  const mutationNewWorkOrderAction = useMutation({
    mutationFn: addWorkOrderActionsApi,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = async () => {
    mutationNewWorkOrderAction.mutate({
      actionDescription,
      actionType,
      actionUserId: workOrderInfo?.workOrderAssignedUserId,
      workOrderId: workOrderInfo?.id,
      actionDateTime: formatDateTime(String(new Date())),
    });
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={false}
        label="NewWorkOrderAction"
        setShowModal={setShowModal}
      />

      <WorkOrderActionFormContent
        register={register}
        errors={errors}
        control={control}
      />

      <AddActionSubmitOrCancelButtons
        onConfirm={onSubmit}
        handleCancelForm={() => setShowModal(false)}
        isPending={
          mutationNewWorkOrderAction?.isPending ||
          mutationNewWorkOrderImageAction?.isPending
        }
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default NewWorkOrderActionModal;
