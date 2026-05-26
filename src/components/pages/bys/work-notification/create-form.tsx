import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import DateInput from '@/components/ui/input/date-input/date-input';
import OrganizationInput from '@/components/ui/input/organization-picker/organization-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import {
  workNotificationPriorityTypeList,
  workNotificationStatusTypeList,
} from '@/enum-data/bys/work-notifications';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { formatSelectOptionsWithoutItems } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewWorkNotification,
  getLastWorkNotificationId,
} from '@/services/bys/work-notifications';
import {
  WorkNotificationFormData,
  WorkNotificationUsers,
} from '@/types/pages/bys/work-notifications';
import { createWorkNotificationValidation } from '@/validations/bys/work-notification-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const defaultValues = {
  // startDate: ""
};
interface Props {
  setShowModal?: (show: boolean) => void;
  users: WorkNotificationUsers;
  types: any[];
  lastWorkNotificationId: number;
  organizations?: any[];
  devices?: any[];
  deviceId?: number;
}
const NewWorkNotificationForm = ({
  setShowModal,
  users,
  types,
  lastWorkNotificationId,
  devices,
  organizations,
  deviceId,
}: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const deviceIdAsNumber = parseInt((deviceId as any) ?? '');

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
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: createNewWorkNotification,
    onSuccess: async () => {
      reset();
      toast.success(getTranslatedValue('SaveSuccess'));
      if (setShowModal) setShowModal(false);
      else navigate('/bys/asset-tree');
      queryClient.invalidateQueries({
        queryKey: ['Organization Device Filtered List'],
      });
      queryClient.invalidateQueries({
        queryKey: ['Last Work Notification Id'],
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  useEffect(() => {
    if (lastWorkNotificationId) {
      const today = new Date();
      const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');
      const deviceCaption =
        organizations?.find(
          (elem: { id: number }) => elem?.id === deviceIdAsNumber,
        )?.displayName ??
        devices?.find((elem: { id: number }) => elem?.id === deviceIdAsNumber)
          ?.displayName;

      reset({
        ...defaultValues,
        startDate: today.toISOString(),
        deviceId: deviceIdAsNumber,
        deviceCaption: deviceCaption ?? '',
        notificationNo:
          formattedDate + 'IB' + Number(lastWorkNotificationId + 1),
      });
    }
  }, [getLastWorkNotificationId, reset]);

  const onSubmit = (data: WorkNotificationFormData) => mutation.mutate(data);

  const handleCancelForm = (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    if (setShowModal) setShowModal(false);
  };

  // const handleDateChange = (value: string) => {
  //   const date = new Date(value);
  //   if (!isNaN(date.getTime())) {
  //     const year = date.getFullYear();
  //     const month = String(date.getMonth() + 1).padStart(2, "0");
  //     const day = String(date.getDate()).padStart(2, "0");
  //     setValue("startDate", `${year}-${month}-${day}`);
  //   }
  // };

  return (
    <form className={`global-modal`} onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={false}
        label="NewWorkNotification"
        setShowModal={(state: boolean) => {
          if (setShowModal) {
            setShowModal(state);
          }
        }}
      />
      <div className={`notification-form-content `}>
        <div className={`column`}>
          <RegisterInput
            name="notificationDescription"
            label={getTranslatedValue('NotificationDescription')}
            placeholder={getTranslatedValue('NotificationDescription')}
            type="text"
            error={errors?.notificationDescription?.message}
            register={register}
            required
          />
          <DateInput
            name="startDate"
            label={getTranslatedValue('StartDate')}
            dateFormat="DD/MM/YYYY"
            onChange={(value) => setValue('startDate', value)}
            value={getValues('startDate')}
          />
          <RegisterInput
            name="notificationNo"
            label={getTranslatedValue('NotificationNo')}
            type="string"
            register={register}
            required
            readOnly={true}
            error={errors?.notificationNo?.message}
            placeholder={getTranslatedValue('NotificationNo')}
          />
          <RegisterSelectInput
            name="assignedUserId"
            label={getTranslatedValue('WorkOrderAssignedUser')}
            required
            options={formatSelectOptionsWithoutItems(users)}
            isLoading={false}
            register={register}
            placeholder={getTranslatedValue('WorkOrderAssignedUser')}
            control={control}
            error={errors?.assignedUserId?.message}
          />
          <OrganizationInput
            isMulti={false}
            name="deviceId"
            control={control}
            onChange={(value) => setValue('deviceId', value as number)}
            assetTypeIdChange={(value) =>
              setValue('workOrderAssetType', value as number)
            }
          />
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
            name="workNotificationTypeId"
            label={getTranslatedValue('WorkNotificationType')}
            placeholder={getTranslatedValue('WorkNotificationType')}
            options={formatSelectOptionsWithoutItems(types)}
            required
            isLoading={false}
            register={register}
            control={control}
            error={errors?.workNotificationTypeId?.message}
          />
        </div>
      </div>
      <SubmitOrCancelButtons
        handleCancelForm={handleCancelForm}
        isPending={mutation.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default NewWorkNotificationForm;
