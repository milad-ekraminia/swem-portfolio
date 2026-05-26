import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import { Loader } from '@/components/ui/loader/loader';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { timePeriodTypeOptions } from '@/enum-data/definitions/enum';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewTimePeriod,
  fetchGetTimePeriodForEdit,
  updateTimePeriodDetails,
} from '@/services/definitions/time-periods/time-periods';
import {
  TimePeriod,
  TimePeriodFormData,
} from '@/types/pages/definitions/time-periods';
import { timePeriodValidation } from '@/validations/definitions/time-periods';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import AddedPeriodsTable from './period-detail-tables/added-periods-table';
import PeriodSelectionTable from './period-detail-tables/period-selection-table';

const defaultValues = {
  active: true,
  timePeriodType: 1,
  timePeriodDetails: [],
};

interface Props {
  onSuccess: () => void;
  timePeriod?: TimePeriod;
}
const TimePeriodForm = ({ onSuccess, timePeriod }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    setValue,
  } = useForm<TimePeriodFormData>({
    resolver: yupResolver(timePeriodValidation) as any,
    defaultValues,
  });

  const userTimePeriodsResponse = useQuery({
    queryKey: ['timePeriodDetail', timePeriod?.id],
    queryFn: () =>
      fetchGetTimePeriodForEdit({
        timePeriodlId: timePeriod?.id as number,
      }),
    retry: false,
    enabled: !!timePeriod?.id,
  });

  useEffect(() => {
    if (userTimePeriodsResponse.data) {
      reset(userTimePeriodsResponse.data);
    }
  }, [reset, userTimePeriodsResponse.data]);

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['timePeriods'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    onSuccess?.();
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationTimePeriod = useMutation({
    mutationFn: createNewTimePeriod,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const mutationUpdateTimePeriod = useMutation({
    mutationFn: updateTimePeriodDetails,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: TimePeriodFormData) => {
    if (timePeriod) {
      mutationUpdateTimePeriod.mutate({ formData });
    } else {
      mutationTimePeriod.mutate(formData);
    }
  };

  const handleCancelForm = (e?: React.MouseEvent) => {
    e?.preventDefault();
    reset();
    onSuccess?.();
  };

  const isActive = useWatch({ control, name: 'active' });
  const timePeriodDetails = useWatch({ control, name: 'timePeriodDetails' });
  const isEditing = !!timePeriod;
  const isPending = isEditing
    ? mutationUpdateTimePeriod.isPending
    : mutationTimePeriod.isPending;
  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={isEditing}
        label={isEditing ? 'Edit' : 'NewTimePeriod'}
        setShowModal={onSuccess}
      />
      {userTimePeriodsResponse.isLoading ? (
        <Loader />
      ) : (
        <div className="time-period-form-content">
          <div style={{ marginLeft: 'auto' }}>
            <Checkbox
              label={getTranslatedValue('Active')}
              onChange={(state) => setValue('active', state)}
              checked={isActive}
            />
          </div>
          <div className="row">
            <RegisterInput
              name="timePeriodName"
              label={getTranslatedValue('TimePeriodName')}
              placeholder={getTranslatedValue('TimePeriodName')}
              type="text"
              error={errors?.timePeriodName?.message}
              register={register}
              required
            />
            <RegisterSelectInput
              name="timePeriodType"
              label={getTranslatedValue('TimePeriodType')}
              required
              options={timePeriodTypeOptions}
              isLoading={false}
              register={register}
              placeholder={getTranslatedValue('TimePeriodType')}
              control={control}
              error={errors?.timePeriodType?.message}
            />
          </div>
          <RegisterInput
            name="timePeriodDescription"
            label={getTranslatedValue('TimePeriodDescription')}
            placeholder={getTranslatedValue('TimePeriodDescription')}
            type="text"
            error={errors?.timePeriodDescription?.message}
            register={register}
          />
          <PeriodSelectionTable control={control} />
          {timePeriodDetails.length > 0 && (
            <AddedPeriodsTable
              control={control}
              timePeriods={getValues('timePeriodDetails')}
            />
          )}
        </div>
      )}
      <SubmitOrCancelButtons
        handleCancelForm={handleCancelForm}
        isPending={isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default TimePeriodForm;
