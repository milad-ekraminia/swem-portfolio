import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import { TextArea } from '@/components/ui/input/textarea/textarea';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewVersion,
  updateVersion,
} from '@/services/software-versions/software-versions';
import { softwareVersions } from '@/validations/software-versions/software-versions';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Props {
  onSuccess: () => void;
  data?: any;
}

const SoftwareVersionForm = ({ onSuccess, data: productUnit }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<{
    one: number;
    two: number;
    three: number;
    versionDescription?: string;
  }>({
    resolver: yupResolver(softwareVersions as any),
  });

  const handleMutationSuccess = async (message: string) => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['SoftwareVersions'] });
    toast.success(getTranslatedValue(message));
    onSuccess();
  };

  const handleMutationError = async (error: AxiosError) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const editMutation = useMutation({
    mutationFn: updateVersion,
    onSuccess: () => handleMutationSuccess('SuccessfullyUpdated'),
    onError: handleMutationError,
  });

  const createMutation = useMutation({
    mutationFn: createNewVersion,
    onSuccess: () => handleMutationSuccess('SaveSuccess'),
    onError: handleMutationError,
  });

  const onSubmit = (formData: any) => {
    if (productUnit) {
      editMutation.mutate({
        versionDescription: formData?.versionDescription,
        versionTitle: `${formData?.one}.${formData?.two}.${formData?.three}`,
        id: productUnit?.id,
      });
    } else {
      createMutation.mutate({
        versionDescription: formData?.versionDescription,
        versionTitle: `${formData?.one}.${formData?.two}.${formData?.three}`,
      });
    }
  };

  const handleCancelForm = (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    onSuccess();
  };

  const isEditMode = !!productUnit;
  const isPending = isEditMode
    ? editMutation.isPending
    : createMutation.isPending;

  useEffect(() => {
    if (productUnit) {
      const [one, two, three] = productUnit?.versionTitle?.split('.') ?? [];
      const versionDescription = productUnit?.versionDescription;
      reset({ one, two, three, versionDescription });
    }
  }, [productUnit, reset]);

  return (
    <form className={`global-modal`} onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={isEditMode}
        label={isEditMode ? 'Update' : 'NewECentralVersion'}
        setShowModal={onSuccess}
      />
      <div className={`notification-form-content `}>
        <div className="version-input-box">
          <RegisterInput
            name="one"
            label={getTranslatedValue('VersionTitle')}
            placeholder={'-'}
            type="number"
            error={errors?.one?.message as any}
            register={register}
            required
          />
          <span>.</span>
          <RegisterInput
            name="two"
            placeholder={getTranslatedValue('-')}
            type="number"
            error={errors?.two?.message as any}
            register={register}
            required
          />
          <span>.</span>
          <RegisterInput
            name="three"
            placeholder={getTranslatedValue('-')}
            type="number"
            register={register}
            error={errors?.three?.message as any}
            required
          />
        </div>
        <TextArea
          name="versionDescription"
          label={getTranslatedValue('VersionDescription')}
          placeholder={getTranslatedValue('VersionDescription')}
          type="number"
          textAreaHandler={(e) => {
            setValue('versionDescription', e?.target?.value);
          }}
          defaultValue={productUnit?.versionDescription}
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

export default SoftwareVersionForm;
