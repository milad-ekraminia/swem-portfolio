import { Button } from '@/components/ui/button/button';
import DateInput from '@/components/ui/input/date-input/date-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { NotificationModal } from '@/components/ui/notification/notification-modal/notification-modal';
import {
  workNotificationPriorityTypeList,
  workNotificationStatusTypeList,
} from '@/enum-data/bys/work-notifications';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { formatSelectOptionsWithoutItems } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  acceptWorkNotification,
  convertIntoWorkOrder,
  updateWorkNotificationDetails,
} from '@/services/bys/work-notifications';
import {
  WorkNotification,
  WorkNotificationFormData,
  WorkNotificationUsers,
} from '@/types/pages/bys/work-notifications';
import { createWorkNotificationValidation } from '@/validations/bys/work-notification-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
  onClose: () => void;
  users: WorkNotificationUsers;
  types: any[];
  organizations: any[];
  devices: any[];
  workNotification?: WorkNotification;
};

const EditWorkNotificationModal = ({
  onClose,
  users,
  types,
  organizations,
  devices,
  workNotification,
}: Props) => {
  const queryClient = useQueryClient();
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const deviceId = workNotification?.workOrderAssetTree?.device?.id;
  const organizationId = workNotification?.workOrderAssetTree?.organization?.id;
  const defaultValues = useMemo(
    () => ({
      notificationDescription:
        workNotification?.workNotification?.notificationDescription,
      startDate: workNotification?.workNotification?.startDate,
      endDate: workNotification?.workNotification?.endDate,
      notificationNo: workNotification?.workNotification?.notificationNo,
      assignedUserId: workNotification?.workNotification?.assignedUserId,
      assignedUserGuid: workNotification?.workNotification?.assignedUserId,
      workNotificationPriorityType:
        workNotification?.workNotification?.workNotificationPriorityType,
      workNotificationStatusType:
        workNotification?.workNotification?.workNotificationStatusType,
      deviceId:
        workNotification?.workOrderAssetTree?.device?.id ??
        workNotification?.workOrderAssetTree?.organization?.id ??
        null,
      workOrderAssetType:
        workNotification?.workNotification?.workOrderAssetType,
      workNotificationTypeId:
        workNotification?.workNotification?.workNotificationTypeId,
      assetNodeId: workNotification?.workNotification?.assetNodeId,
    }),
    [workNotification],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    control,
  } = useForm<WorkNotificationFormData>({
    resolver: yupResolver(createWorkNotificationValidation as any),
    defaultValues: defaultValues as any,
  });

  useEffect(() => {
    reset(defaultValues as any);
  }, [defaultValues, reset]);

  const mutation = useMutation({
    mutationFn: updateWorkNotificationDetails,
    onSuccess: async () => {
      reset();
      toast.success(getTranslatedValue('SaveSuccess'));
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['Organization Device Filtered List'],
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const convertToWorkOrderMutation = useMutation({
    mutationFn: convertIntoWorkOrder,
    onSuccess: async () => {
      setConfirmationVisible(false);
      toast.success(getTranslatedValue('ConvertToWorkOrderSuccessfully'));
      queryClient.invalidateQueries({
        queryKey: ['Organization Device Filtered List'],
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const acceptMutation = useMutation({
    mutationFn: acceptWorkNotification,
    onSuccess: async (data) => {
      convertToWorkOrderMutation.mutate({
        workNotificationId: workNotification?.workNotification.id as number,
        body: data,
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const handleSubmitConvertion = () => {
    acceptMutation.mutate({
      workNotificationId: workNotification?.workNotification.id as number,
    });
  };

  const onSubmit = (data: WorkNotificationFormData) =>
    mutation.mutate({
      body: data,
      workNotificationId: workNotification?.workNotification.id as number,
    });

  const handleCancelForm = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    reset();
    onClose();
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit as any)}>
      {confirmationVisible && (
        <NotificationModal
          isOpen={confirmationVisible}
          onClose={() => setConfirmationVisible(false)}
          title={getTranslatedValue("AlarmDetails")}
          onConfirm={handleSubmitConvertion}
          onCancel={() => setConfirmationVisible(false)}
          footerType="confirmationNotif"
          modalSize="sm"
          submitButtonText={getTranslatedValue('Save')}
          cancelButtonText={getTranslatedValue('Cancel')}
        >
          <div
            className="notification-form-content"
            style={{ textAlign: 'center' }}
          >
            {getTranslatedValue('ConvertToWorkOrderConfirmation')}
          </div>
        </NotificationModal>
      )}
      <ModalHeader
        isEdit={true}
        label="Update"
        setShowModal={() => {
          onClose();
        }}
      />
      <div className="notification-form-content ">
        <div className="column">
          <RegisterInput
            name="notificationNo"
            label={getTranslatedValue('NotificationNo')}
            type="string"
            register={register}
            required={true}
            disabled={true}
            error={errors?.notificationNo?.message}
            placeholder={getTranslatedValue('NotificationNo')}
          />

          <RegisterSelectInput
            name="workNotificationTypeId"
            label={getTranslatedValue('WorkNotificationType')}
            placeholder={getTranslatedValue('WorkNotificationType')}
            options={formatSelectOptionsWithoutItems(types)}
            required={true}
            isLoading={false}
            register={register}
            control={control}
            error={errors?.workNotificationTypeId?.message}
          />
          <div className="row">
            <RegisterSelectInput
              name="selectedOrganization"
              label={getTranslatedValue('Organization')}
              placeholder={getTranslatedValue('Organization')}
              options={formatSelectOptionsWithoutItems(organizations)}
              required={true}
              isLoading={false}
              disabled={true}
              error={undefined}
              register={() => ({})}
              defaultValue={organizationId}
              control={control}
            />
            <RegisterSelectInput
              name="deviceId_placeholder"
              label={getTranslatedValue('Device')}
              placeholder={getTranslatedValue('Device')}
              options={formatSelectOptionsWithoutItems(devices)}
              defaultValue={deviceId}
              required={true}
              isLoading={false}
              disabled={true}
              error={undefined}
              register={() => ({})}
              control={control}
            />
          </div>

          <RegisterSelectInput
            name="workNotificationStatusType"
            label={getTranslatedValue('WorkNotificationStatusType')}
            placeholder={getTranslatedValue('WorkNotificationStatusType')}
            options={formatSelectOptionsWithoutItems(
              workNotificationStatusTypeList,
            )}
            isLoading={false}
            register={register}
            control={control}
            error={errors?.workNotificationStatusType?.message}
          />

          <RegisterSelectInput
            name="assignedUserId"
            label={getTranslatedValue('WorkOrderAssignedUser')}
            required={true}
            options={formatSelectOptionsWithoutItems(users)}
            isLoading={false}
            register={register}
            placeholder={getTranslatedValue('WorkOrderAssignedUser')}
            control={control}
            error={errors?.assignedUserId?.message}
          />

          <RegisterInput
            name="notificationDescription"
            label={getTranslatedValue('NotificationDescription')}
            placeholder={getTranslatedValue('NotificationDescription')}
            type="text"
            error={errors?.notificationDescription?.message}
            register={register}
            required={true}
          />

          <div className="row">
            <DateInput
              name="startDate"
              label={getTranslatedValue('StartDate')}
              dateFormat="DD/MM/YYYY"
              onChange={(value) => setValue('startDate', value)}
              value={getValues('startDate')}
            />
            <DateInput
              name="endDate"
              label={getTranslatedValue('EndDate')}
              dateFormat="DD/MM/YYYY"
              onChange={(value) => setValue('endDate', value)}
              value={getValues('endDate') as any}
            />
          </div>

          <RegisterSelectInput
            name="workNotificationPriorityType"
            label={getTranslatedValue('WorkNotificationPriorityType')}
            placeholder={getTranslatedValue('WorkNotificationPriorityType')}
            options={formatSelectOptionsWithoutItems(
              workNotificationPriorityTypeList,
            )}
            isLoading={false}
            register={register}
            control={control}
            error={errors?.workNotificationPriorityType?.message}
          />
        </div>
      </div>
      <div className="dv-submit-or-cancel-buttons action-buttons">
        <Button
          type="button"
          style={{ width: 'fit-content' }}
          onClick={handleCancelForm}
          variant="secondary"
        >
          {getTranslatedValue('cancel')}
        </Button>
        <Button
          type="button"
          onClick={() => setConfirmationVisible(true)}
          style={{ width: 'fit-content' }}
          variant="secondary-blue"
        >
          {getTranslatedValue('ConvertToWorkOrder')}
        </Button>
        <Button
          style={{ width: 'fit-content' }}
          disabled={mutation?.isPending}
          type="submit"
          variant="primary"
        >
          {mutation?.isPending ? (
            <ComponentLoader variant="secondary" />
          ) : (
            getTranslatedValue('Save')
          )}
        </Button>
      </div>
    </form>
  );
};

export default EditWorkNotificationModal;
