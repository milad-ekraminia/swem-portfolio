import { memo, useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  formulasInitialValues,
  formulasInitialValuesTypes,
  formulasResolver,
} from '@/validations/system-administration/definitions/formulas-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { updateFormulaDetails } from '@/services/system-administration/bys/formulas-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import WorkOrderTypeFormContent from './form-content';

const MemoUpdateFormulaModal = ({
  onClose,
  info,
}: {
  onClose: any;
  info: any;
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<formulasInitialValuesTypes>({
    resolver: yupResolver(formulasResolver) as any,
    defaultValues: formulasInitialValues,
  });
  // Add this inside your component, after the useForm declaration:
  useEffect(() => {
    if (info) {
      reset({
        active: Boolean(info?.active),
        formulaName: info?.formulaName,
        formulaType: info?.formulaType,
        formulaMultiplier: info?.formulaMultiplier,
        formulaInputMinimum: info?.formulaInputMinimum,
        formulaInputMaximum: info?.formulaInputMaximum,
        formulaOutputMinimum: info?.formulaOutputMinimum,
        formulaOutputMaximum: info?.formulaOutputMaximum,
      });
    }
  }, [info, reset]);

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['formulas list'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    onClose(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationUpdateFormula = useMutation({
    mutationFn: updateFormulaDetails,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: formulasInitialValuesTypes) => {
    mutationUpdateFormula.mutate({
      formData,
      formulaId: info?.id,
    });
  };

  return (
    <form
      className="global-modal work-notification-types-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader isEdit label="Update" setShowModal={onClose} />
      <WorkOrderTypeFormContent
        setValue={setValue}
        control={control}
        register={register}
        errors={errors}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
        }}
        isPending={mutationUpdateFormula?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const UpdateFormulaModal = memo(MemoUpdateFormulaModal);

export default UpdateFormulaModal;
