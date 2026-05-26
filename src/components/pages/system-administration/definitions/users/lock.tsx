import { memo } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  lockInitialValues,
  lockResolver,
  lockValuesTypes,
} from '@/validations/system-administration/definitions/users-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserInfo } from '@/types/pages/system-administration/definitions/permissions';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { updateLock } from '@/services/system-administration/definitions/users';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import DateInput from '@/components/ui/input/date-input/date-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

interface Props {
  userInfo: UserInfo;
  setShowModal: (value: any) => void;
}

const MemoLock = ({ userInfo, setShowModal }: Props) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm<lockValuesTypes>({
    resolver: yupResolver(lockResolver as any),
    defaultValues: lockInitialValues,
  });
  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({
      queryKey: ['Get Users List'],
    });
    toast.success(getTranslatedValue('SaveSuccess'));
    setShowModal(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationLockUser = useMutation({
    mutationFn: updateLock,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: lockValuesTypes) => {
    mutationLockUser.mutate({
      userId: userInfo.id,
      date: formData.date ?? new Date(),
    });
  };

  const date = useWatch({
    control,
    name: 'date',
  });

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isLock
        label={getTranslatedValue('Lock', 'AbpIdentity.texts')}
        setShowModal={setShowModal}
      />

      <div className="lock-modal">
        <DateInput
          label={getTranslatedValue(
            'DisplayName:LockoutEnd',
            'AbpIdentity.texts',
          )}
          name="date"
          dateFormat={'YYYY-MM-DD'}
          onChange={(e: any) => setValue('date', e)}
          value={date}
          periodType={'2'}
          error={errors?.date?.message}
        />
      </div>

      <SubmitOrCancelButtons
        handleCancelForm={() => setShowModal(null)}
        isPending={mutationLockUser.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const Lock = memo(MemoLock);

export default Lock;
