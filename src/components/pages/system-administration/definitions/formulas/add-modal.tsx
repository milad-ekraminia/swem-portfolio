import { memo } from 'react';
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
import { createNewFormula } from '@/services/system-administration/bys/formulas-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import FormulaFormContent from './form-content';

const MemoNewFormulaModal = ({ onClose }: { onClose: any }) => {
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

  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['formulas list'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    onClose();
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewFormula = useMutation({
    mutationFn: createNewFormula,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: formulasInitialValuesTypes) => {
    mutationNewFormula.mutate(formData);
  };

  return (
    <form
      className="global-modal work-notification-types-modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader label="NewFormula" setShowModal={onClose} />
      <FormulaFormContent
        setValue={setValue}
        control={control}
        register={register}
        errors={errors}
      />
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
        }}
        isPending={mutationNewFormula?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const NewFormulaModal = memo(MemoNewFormulaModal);

export default NewFormulaModal;
