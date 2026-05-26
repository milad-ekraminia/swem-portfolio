import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import DateInput from '@/components/ui/input/date-input/date-input';
import { DecimalInput } from '@/components/ui/input/decimal-input/Input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import ToggleRegister from '@/components/ui/input/toggle-button/toggle-register';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { DeviceStartupFormData } from '@/types/pages/system-administration/definitions/device-startup-data';
import { deviceStartupDataValidation } from '@/validations/system-administration/definitions/device-startup-data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

const defaultValues = {
  active: true,
};

interface Props {
  onClose: () => void;
  deviceStartupData?: any;
}

const DeviceStartupForm = ({ onClose, deviceStartupData }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<DeviceStartupFormData>({
    resolver: yupResolver(deviceStartupDataValidation as any),
    defaultValues,
  });

  // Set Device Initial data thats being edited
  useEffect(() => {
    if (deviceStartupData) {
      reset(deviceStartupData);
    }
  }, [deviceStartupData, reset]);

  const handleMutationSuccess = async (message: string) => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['deviceS'] });
    toast.success(getTranslatedValue(message));
    onClose();
  };
  const handleMutationError = async (error: AxiosError) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const editMutation = useMutation({
    // TODO -> Change to actual API
    mutationFn: ({ formData, id }: any) => {
      return new Promise((resolve) => {
        resolve({ formData, id });
      });
    },
    onSuccess: () => handleMutationSuccess('SuccessfullyUpdated'),
    onError: handleMutationError,
  });
  const createMutation = useMutation({
    // TODO -> Change to actual API
    mutationFn: (formData) => {
      return new Promise((resolve) => {
        resolve(formData);
      });
    },
    onSuccess: () => handleMutationSuccess('SaveSuccess'),
    onError: handleMutationError,
  });

  const isEditMode = !!deviceStartupData;
  const isPending = isEditMode
    ? editMutation.isPending
    : createMutation.isPending;

  const onSubmit = (formData: DeviceStartupFormData) => {
    if (deviceStartupData) {
      editMutation.mutate({
        formData,
        id: deviceStartupData.id as any,
      });
    } else {
      createMutation.mutate(formData as any);
    }
  };
  const handleCancelForm = (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    onClose();
  };
  const [startDate, endDate] = useWatch({
    name: ['startDate', 'endDate'],
    control,
  });

  return (
    <form className={`global-modal`} onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={isEditMode}
        label={isEditMode ? 'Update' : 'NewDeviceStartupData'}
        setShowModal={onClose}
      />
      <div className={`notification-form-content `}>
        <ToggleRegister
          control={control}
          register={register}
          name="active"
          label={getTranslatedValue('Active')}
        />

        <RegisterInput
          name="device"
          label={getTranslatedValue('Device')}
          placeholder={getTranslatedValue('Device')}
          type="text"
          error={errors?.device?.message}
          register={register}
          required={true}
        />

        <RegisterSelectInput
          name="timeInformation"
          control={control}
          options={[{ title: 'test', value: 1 }]}
          label={getTranslatedValue('TimeInformation')}
          placeholder={getTranslatedValue('TimeInformation')}
          error={errors?.timeInformation?.message}
          register={register}
          required={true}
        />
        <div style={{ width: '100%' }}>
          <DateInput
            name="startDate"
            label={getTranslatedValue('StartDate')}
            dateFormat="DD/MM/YYYY"
            onChange={(value) => setValue('startDate', value)}
            value={startDate}
            required={true}
            error={errors.startDate?.message}
            hasMax
          />
        </div>
        <div style={{ width: '100%' }}>
          <DateInput
            name="endDate"
            required={true}
            error={errors.endDate?.message}
            label={getTranslatedValue('EndDate')}
            dateFormat="DD/MM/YYYY"
            onChange={(value) => setValue('endDate', value)}
            value={endDate}
            minDate={new Date(startDate)}
          />
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-3xl)',
          }}
        >
          <DecimalInput
            name="imp"
            label={getTranslatedValue('Imp')}
            placeholder={'0.0000'}
            error={errors?.imp?.message}
            register={register}
            required={true}
            setValue={setValue}
          />
          <DecimalInput
            name="exp"
            placeholder={'0.0000'}
            label={getTranslatedValue('Exp')}
            error={errors?.exp?.message}
            register={register}
            required={true}
            setValue={setValue}
          />
        </div>
      </div>
      <SubmitOrCancelButtons
        handleCancelForm={handleCancelForm}
        isPending={isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default DeviceStartupForm;
