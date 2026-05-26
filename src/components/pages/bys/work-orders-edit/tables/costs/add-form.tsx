import { memo } from 'react';
import { AddPlusSvg } from '@/assets/icons/add-plus-svg';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  addCostInitialValues,
  addCostResolver,
  addCostValuesTypes,
} from '@/validations/bys/work-order-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { addWorkOrderCostsApi } from '@/services/bys/work-orders/work-orders';
import { Button } from '@/components/ui/button/button';
import { DecimalInput } from '@/components/ui/input/decimal-input/Input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';

const WorkOrderCostsTableHeaderForm = ({
  workOrderCostTypeLookup,
}: {
  workOrderCostTypeLookup: any;
}) => {
  const queryClient = useQueryClient();
  const { workOrderId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<addCostValuesTypes>({
    resolver: yupResolver(addCostResolver) as any,
    defaultValues: {
      ...addCostInitialValues,
      workOrderId: Number(workOrderId),
    },
  });

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const handleSuccess = async () => {
    queryClient.invalidateQueries({
      queryKey: ['Get Work Order Costs'],
    });
    reset();
    toast.success(getTranslatedValue('SaveSuccess'));
  };

  const mutationNewWorkOrderCost = useMutation({
    mutationFn: addWorkOrderCostsApi,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = async (formData: addCostValuesTypes) => {
    mutationNewWorkOrderCost.mutate(formData);
  };

  return (
    <div className="dv-organization-table-header add-worker-form">
      <div className="dv-organization-table-header__title-section inputs-wrapper">
        <RegisterSelectInput
          name="workOrderCostTypeId"
          label={getTranslatedValue('TypeDescription')}
          options={workOrderCostTypeLookup?.map((item: any) => ({
            value: item.id,
            title: item.displayName,
          }))}
          required
          register={register}
          control={control}
          error={errors?.workOrderCostTypeId?.message}
        />

        <DecimalInput
          label={getTranslatedValue('Cost')}
          name="cost"
          register={register}
          setValue={setValue}
          required
          placeholder="0,00"
          step="0.01"
          error={errors?.cost?.message}
        />

        <RegisterInput
          name="description"
          label={getTranslatedValue('Description')}
          register={register}
          type={'text'}
          error={errors?.description?.message}
        />
      </div>
      <Button
        onClick={handleSubmit(onSubmit)}
        type="button"
        leftIcon={
          mutationNewWorkOrderCost?.isPending ? null : (
            <AddPlusSvg stroke="#FFFFFF" />
          )
        }
      >
        {mutationNewWorkOrderCost?.isPending ? (
          <ComponentLoader variant="secondary" />
        ) : (
          getTranslatedValue('Add')
        )}
      </Button>
    </div>
  );
};

export default memo(WorkOrderCostsTableHeaderForm);
