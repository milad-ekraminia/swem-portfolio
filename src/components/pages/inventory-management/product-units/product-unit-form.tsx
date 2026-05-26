import { useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { productUnitFormValidation } from '@/validations/inventory-management/product-units-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ProductUnitFormData } from '@/types/pages/inventory-management/product-units';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewProductUnit,
  updateProductUnit,
} from '@/services/inventory-management/product-units';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

const defaultValues = {};

interface Props {
  onSuccess: () => void;
  productUnit?: ProductUnitFormData;
}
const ProductUnitForm = ({ onSuccess, productUnit }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductUnitFormData>({
    resolver: yupResolver(productUnitFormValidation as any),
    defaultValues,
  });

  useEffect(() => {
    if (productUnit) {
      reset(productUnit);
    }
  }, [productUnit, reset]);

  const handleMutationSuccess = async (message: string) => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['productUnits'] });
    toast.success(getTranslatedValue(message));
    onSuccess();
  };

  const handleMutationError = async (error: AxiosError) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const editMutation = useMutation({
    mutationFn: updateProductUnit,
    onSuccess: () => handleMutationSuccess('SuccessfullyUpdated'),
    onError: handleMutationError,
  });

  const createMutation = useMutation({
    mutationFn: createNewProductUnit,
    onSuccess: () => handleMutationSuccess('SaveSuccess'),
    onError: handleMutationError,
  });

  const onSubmit = (formData: ProductUnitFormData) => {
    if (productUnit) {
      editMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
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

  return (
    <form className={`global-modal`} onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={isEditMode}
        label={isEditMode ? 'Update' : 'NewProductUnit'}
        setShowModal={onSuccess}
      />
      <div className={`notification-form-content `}>
        <RegisterInput
          name="name"
          label={getTranslatedValue('Name')}
          placeholder={getTranslatedValue('Name')}
          type="text"
          error={errors?.name?.message}
          register={register}
          required
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

export default ProductUnitForm;
