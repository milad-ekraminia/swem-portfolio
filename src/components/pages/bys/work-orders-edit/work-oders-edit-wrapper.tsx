import { Button } from '@/components/ui/button/button';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { TextArea } from '@/components/ui/input/textarea/textarea';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import TextAreaBox from '@/components/ui/textarea-box/textarea-box';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchWorkOrderDetail } from '@/services/bys/work-orders/work-order-edit';
import {
  addResolveWorkOrderApi,
  updateWorkOrderDetails,
} from '@/services/bys/work-orders/work-orders';
import { workOrderValuesTypes } from '@/validations/bys/work-order-validation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import WorkOrderEditHeader from './edit-form-header';
import ActionsGlobalTableHeader from './table-header';
import { WorkOrderActionsLogsTable } from './tables/actions-logs/table';
import { WorkOrderActionsTable } from './tables/actions/table';
import WorkOrderCostsTable from './tables/costs/table';
import WorkOrderWorkersTable from './tables/workers/table';
import WorkOrderEditWrapperForm from './work-order-edit-form';

const MemoWorkOrdersEdit = ({
  categoryLookup,
  workOrdersTypeLookup,
  userLookup,
  deviceLookup,
  organizationsLookup,
}: {
  categoryLookup: any;
  workOrdersTypeLookup: any;
  userLookup: any;
  deviceLookup: any;
  organizationsLookup: any;
}) => {
  const [desc, setDesc] = useState('');

  const { workOrderId } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['work order info', workOrderId],
    queryFn: () =>
      fetchWorkOrderDetail({
        workOrderId: Number(workOrderId),
      }),
    retry: false,
    enabled: !!workOrderId,
  });
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    // trigger
  } = useForm<any>();

  useEffect(() => {
    if (!data) return;

    const deviceCaption =
      organizationsLookup?.find(
        (elem: { id: number | string }) => elem?.id === data?.workOrderDeviceId,
      )?.displayName ??
      deviceLookup?.find(
        (elem: { id: number | string }) => elem?.id === data?.workOrderDeviceId,
      )?.displayName;

    reset({
      // required string
      workOrderAssetType: data.workOrderAssetType,
      workOrderAssetNodeId: data.workOrderAssetNodeId ?? -1,
      workOrderDescription: data.workOrderDescription,
      // dates (nullable strings)
      workOrderStartDateTime: data.workOrderStartDateTime ?? null,
      workOrderEndDateTime: data.workOrderEndDateTime ?? null,
      // required string
      workOrderNo: data.workOrderNo,
      // required string
      workOrderAssignedUserId: data.workOrderAssignedUserId,
      // numbers (can be undefined, but your initialValues gives defaults)
      workOrderPriority: data.workOrderPriority,
      workOrderType: data.workOrderType,
      workOrderCategory: data.workOrderCategory,
      // choose deviceId from asset tree
      workOrderDeviceId: data?.workOrderDeviceId ?? undefined,
      // deviceId: data?.workOrderDeviceId,
      deviceCaption: deviceCaption ?? '',
      active: data?.active ?? false,
      workOrderState: data?.workOrderState ?? false,
      workOrderSolutionDescription: data?.workOrderSolutionDescription ?? '',
    });
  }, [data, reset]);

  const handleSuccess = async () => {
    // reset();
    queryClient.invalidateQueries({
      queryKey: ['work order info', workOrderId],
    });
    toast.success(getTranslatedValue('SaveSuccess'));
    navigate(-1);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationUpdateWorkOrder = useMutation({
    mutationFn: updateWorkOrderDetails,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: workOrderValuesTypes) => {
    mutationUpdateWorkOrder.mutate({
      body: formData,
      workOrderId: workOrderId ? +workOrderId : 0,
    });
  };

  const mutationResolveWorkOrderApi = useMutation({
    mutationFn: addResolveWorkOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Work Order Actions'],
      });
      queryClient.invalidateQueries({
        queryKey: ['Work Orders Organization Device Filtered List'],
      });
      toast.success(getTranslatedValue('Success'));
      navigate(-1);
    },
    onError: handleError,
  });

  const handleCloseWorkOrderForm = () => {
    if (desc) {
      mutationResolveWorkOrderApi.mutate({
        workOrderId: workOrderId ? +workOrderId : 0,
        solutionDescription: desc,
      });
    } else {
      toast.error(
        getTranslatedValue('WorkOrderSolutionDescription2') +
        ' ' +
        getTranslatedValue('Required', 'AbpIdentity.texts'),
      );
    }
  };

  const header = useMemo(
    () => <ActionsGlobalTableHeader label="WorkOrderSolutionDescription2" />,
    [],
  );

  return (
    <form className="work-orders-edit" onSubmit={handleSubmit(onSubmit)}>
      <WorkOrderEditHeader />
      <div className="work-orders-edit-form-content">
        <WorkOrderEditWrapperForm
          control={control}
          setValue={setValue}
          errors={errors}
          register={register}
          categoryLookup={categoryLookup}
          workOrdersTypeLookup={workOrdersTypeLookup}
          userLookup={userLookup}
          deviceLookup={deviceLookup}
        />

        <WorkOrderActionsTable workOrderInfo={data} userLookup={userLookup} />

        <WorkOrderWorkersTable usersList={userLookup} userLookup={userLookup} />

        <WorkOrderCostsTable />

        <SubmitOrCancelButtons
          handleCancelForm={() => navigate(-1)}
          isPending={mutationUpdateWorkOrder?.isPending}
          confirmButtonText={getTranslatedValue('Save')}
        />
        <TextAreaBox headerChildren={header}>
          <TextArea
            value={desc}
            textAreaHandler={(e) => setDesc(e?.target?.value)}
          />
        </TextAreaBox>
        <Button
          onClick={handleCloseWorkOrderForm}
          type="button"
          variant="secondary-blue"
        >
          {mutationResolveWorkOrderApi?.isPending ? (
            <ComponentLoader variant="secondary" />
          ) : (
            getTranslatedValue('CloseWorkOrder')
          )}
        </Button>
        <WorkOrderActionsLogsTable userLookup={userLookup} />
      </div>
    </form>
  );
};

const WorkOrdersEditWrapper = memo(MemoWorkOrdersEdit);

export default WorkOrdersEditWrapper;
