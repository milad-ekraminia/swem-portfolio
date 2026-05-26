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
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewDeviceType,
  createNewLabel,
} from '@/services/system-administration/bys/labels-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import LabelFormContent from './form-content';

const MemoNewLabelModal = ({ onClose }: { onClose: any }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<labelsInitialValuesTypes>({
    resolver: yupResolver(labelsResolver) as any,
    defaultValues: labelsInitialValues,
  });

  const deviceTypeLabelList =
    useWatch({
      control,
      name: 'deviceTypeLabelList',
    }) || [];

  const handleSuccess = async (data: any) => {
    deviceTypeLabelList?.forEach((element) => {
      mutationNewDeviceTypeLabel.mutate({
        deviceTypeId: element,
        labelId: data?.id,
      });
    });
    reset();
    queryClient.invalidateQueries({ queryKey: ['labels list'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    onClose();
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewLabel = useMutation({
    mutationFn: createNewLabel,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const mutationNewDeviceTypeLabel = useMutation({
    mutationFn: createNewDeviceType,
    onError: handleError,
  });

  const onSubmit = (formData: labelsInitialValuesTypes) => {
    mutationNewLabel.mutate({
      ...formData,
      alarmDefinitionFlag: formData?.definitionFlag ? 1 : 0,
      hasFlagValue: formData?.hasFlag ? 1 : 0,
    });
  };

  return (
    <form
      className="global-modal work-notification-types-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader label="NewLabel" setShowModal={onClose} />
      <LabelFormContent
        setValue={setValue}
        control={control}
        register={register}
        errors={errors}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
        }}
        isPending={mutationNewLabel?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const NewLabelModal = memo(MemoNewLabelModal);

export default NewLabelModal;
