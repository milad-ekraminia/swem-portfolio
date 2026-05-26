import { memo, useCallback, useMemo } from 'react';
import { AddPlusSvg } from '@/assets/icons/add-plus-svg';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { generateTimeOptions } from '@/helpers/generate-time-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  addWorkerInitialValues,
  addWorkerResolver,
  addWorkerValuesTypes,
} from '@/validations/bys/work-order-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { addWorkOrderWorkerApi } from '@/services/bys/work-orders/work-orders';
import { Button } from '@/components/ui/button/button';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';

const WorkersTableHeaderForm = ({ usersList }: { usersList: any }) => {
  const queryClient = useQueryClient();
  const { workOrderId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<addWorkerValuesTypes>({
    resolver: yupResolver(addWorkerResolver) as any,
    defaultValues: {
      ...addWorkerInitialValues,
      workOrderId: Number(workOrderId),
    },
  });

  const timeOptions = useMemo(() => generateTimeOptions(), []);
  const workerOptions = useMemo(
    () =>
      usersList?.map((item: any) => ({
        value: item.id,
        title: item.displayName,
      })),
    [usersList],
  );

  const handleError = useCallback(async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  }, []);

  const handleSuccess = useCallback(async () => {
    queryClient.invalidateQueries({
      queryKey: ['Get Work Order workers', workOrderId],
    });
    reset();
    toast.success(getTranslatedValue('SaveSuccess'));
  }, [reset, queryClient, workOrderId]);

  const mutationNewWorkOrderWorker = useMutation({
    mutationFn: addWorkOrderWorkerApi,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = async (formData: addWorkerValuesTypes) => {
    mutationNewWorkOrderWorker.mutate(formData);
  };

  return (
    <div className="dv-organization-table-header add-worker-form">
      <div className="dv-organization-table-header__title-section inputs-wrapper">
        <RegisterSelectInput
          name="userId"
          required
          label={getTranslatedValue('Worker')}
          options={workerOptions}
          register={register}
          control={control}
          error={errors?.userId?.message}
        />
        <RegisterSelectInput
          name="workerWorkTime"
          label={getTranslatedValue('WorkerWorkTime')}
          options={timeOptions}
          register={register}
          control={control}
          error={errors?.workerWorkTime?.message}
        />
      </div>
      <Button
        onClick={handleSubmit(onSubmit)}
        onSubmit={handleSubmit(onSubmit)}
        type="button"
        leftIcon={
          mutationNewWorkOrderWorker.isPending ? null : (
            <AddPlusSvg stroke="#FFFFFF" />
          )
        }
      >
        {mutationNewWorkOrderWorker.isPending ? (
          <ComponentLoader variant="secondary" />
        ) : (
          getTranslatedValue('Add')
        )}
      </Button>
    </div>
  );
};

export default memo(WorkersTableHeaderForm);
