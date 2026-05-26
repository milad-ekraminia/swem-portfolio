import { useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { formatSelectOptionsWithoutItems } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { mimicProfileResolver } from '@/validations/system-administration/scada/mimic-profiles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  MimicProfile,
  MimicProfileFormData,
} from '@/types/pages/system-administration/scada/mimic-profiles';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewMimicProfile,
  fetchAllMimicDiagrams,
  updateMimicProfile,
} from '@/services/system-administration/scada/mimic-profiles';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import MultiSelectInput from '@/components/ui/input/multi-select-input/multi-select-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

const defaultValues = {
  mimicProfileDetail: [],
};

interface Props {
  onSuccess: () => void;
  mimicProfile?: MimicProfile;
}

const MimicProfilesForm = ({ onSuccess, mimicProfile }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<MimicProfileFormData>({
    resolver: yupResolver(mimicProfileResolver as any),
    defaultValues,
  });

  const { data } = useQuery({
    queryKey: ['mimicDiagramList'],
    queryFn: () => fetchAllMimicDiagrams(),
    retry: false,
  });

  useEffect(() => {
    if (mimicProfile) {
      reset({
        mimicProfileDetail: mimicProfile.mimicProfileDetail.split('|') as any,
        mimicProfileName: mimicProfile.mimicProfileName,
      });
    }
  }, [mimicProfile, reset]);

  const handleMutationSuccess = async (message: string) => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['mimicProfiles'] });
    toast.success(getTranslatedValue(message));
    onSuccess();
  };

  const handleMutationError = async (error: AxiosError) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const editMutation = useMutation({
    mutationFn: updateMimicProfile,
    onSuccess: () => handleMutationSuccess('SuccessfullyUpdated'),
    onError: handleMutationError,
  });

  const createMutation = useMutation({
    mutationFn: createNewMimicProfile,
    onSuccess: () => handleMutationSuccess('SaveSuccess'),
    onError: handleMutationError,
  });

  const isEditMode = !!mimicProfile;
  const isPending = isEditMode
    ? editMutation.isPending
    : createMutation.isPending;

  const onSubmit = (formData: MimicProfileFormData) => {
    if (mimicProfile) {
      editMutation.mutate({
        formData: {
          ...formData,
          mimicProfileDetail: formData.mimicProfileDetail.join(' | ') as any,
        },
        id: mimicProfile.id as any,
      });
    } else {
      createMutation.mutate({
        ...formData,
        mimicProfileDetail: formData.mimicProfileDetail.join(' | ') as any,
      });
    }
  };

  const handleCancelForm = (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    onSuccess();
  };

  return (
    <form className={`global-modal`} onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={isEditMode}
        label={isEditMode ? 'Update' : 'NewMimicProfile'}
        setShowModal={onSuccess}
      />
      <div className={`notification-form-content `}>
        <RegisterInput
          name="mimicProfileName"
          label={getTranslatedValue('ProfileName')}
          placeholder={getTranslatedValue('ProfileName')}
          type="text"
          error={errors?.mimicProfileName?.message}
          register={register}
          required={true}
        />
        <MultiSelectInput
          useTranslation={false}
          name="mimicProfileDetail"
          label={getTranslatedValue('Plant')}
          isRequiredInput={true}
          placeholder={getTranslatedValue('Plant')}
          options={formatSelectOptionsWithoutItems(data)}
          register={register}
          onChange={(vals) => setValue('mimicProfileDetail', vals)}
          watch={watch}
          error={errors?.mimicProfileDetail?.message}
        />
      </div>
      <SubmitOrCancelButtons
        handleCancelForm={handleCancelForm}
        isPending={isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default MimicProfilesForm;
