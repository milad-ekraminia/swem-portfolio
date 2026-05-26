import { memo } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  labelsInitialValues,
  labelsInitialValuesTypes,
  labelsResolver,
} from '@/validations/system-administration/definitions/labels-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { updateLabelApi } from '@/services/system-administration/bys/labels-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import LabelFormContent from './form-content';

const MemoNewLabelModal = ({ onClose, info }: { onClose: any; info?: any }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<labelsInitialValuesTypes>({
    resolver: yupResolver(labelsResolver) as any,
    defaultValues: labelsInitialValues,
  });

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['labels list'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    onClose();
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationUpdateLabel = useMutation({
    mutationFn: updateLabelApi,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: labelsInitialValuesTypes) => {
    delete formData?.deviceTypeLabelList;
    mutationUpdateLabel.mutate({
      formData: {
        ...formData,
        alarmDefinitionFlag: formData?.definitionFlag ? 1 : 0,
        hasFlagValue: formData?.hasFlag ? 1 : 0,
      },
      labelId: info?.id,
    });
  };
  return (
    <form
      className="global-modal work-notification-types-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader isEdit label="UpdateLabel" setShowModal={onClose} />
      <LabelFormContent
        isEdit={true}
        setValue={setValue}
        control={control}
        register={register}
        errors={errors}
        info={info}
        reset={reset}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
        }}
        isPending={mutationUpdateLabel?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const UpdateLabelModalModal = memo(MemoNewLabelModal);

export default UpdateLabelModalModal;
