import { useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { productManufacturersFormValidation } from '@/validations/inventory-management/product-manufacturers-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ProductManufacturerFormData } from '@/types/pages/inventory-management/product-manufacturers';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewProductsManufacturers,
  updateProductsManufacturers,
} from '@/services/inventory-management/product-manufacturers';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

const defaultValues = {};

interface Props {
  onSuccess: () => void;
  manufacturer?: ProductManufacturerFormData;
}
const ProductManufacturerForm = ({ onSuccess, manufacturer }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductManufacturerFormData>({
    resolver: yupResolver(productManufacturersFormValidation as any),
    defaultValues,
  });

  useEffect(() => {
    if (manufacturer) {
      reset(manufacturer);
    }
  }, [manufacturer, reset]);

  const handleMutationSuccess = async (message: string) => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['productManufacturers'] });
    toast.success(getTranslatedValue(message));
    onSuccess();
  };

  const handleMutationError = async (error: AxiosError) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const editMutation = useMutation({
    mutationFn: updateProductsManufacturers,
    onSuccess: () => handleMutationSuccess('SuccessfullyUpdated'),
    onError: handleMutationError,
  });

  const createMutation = useMutation({
    mutationFn: createNewProductsManufacturers,
    onSuccess: () => handleMutationSuccess('SaveSuccess'),
    onError: handleMutationError,
  });

  const onSubmit = (formData: ProductManufacturerFormData) => {
    if (manufacturer) {
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

  const isEditMode = !!manufacturer;
  const isPending = isEditMode
    ? editMutation.isPending
    : createMutation.isPending;

  return (
    <form className={`global-modal`} onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={isEditMode}
        label={isEditMode ? 'Update' : 'NewProductManufacturer'}
        setShowModal={onSuccess}
      />
      <div className={`notification-form-content `}>
        <RegisterInput
          name="manufacturerTitle"
          label={getTranslatedValue('ManufacturerTitle')}
          placeholder={getTranslatedValue('ManufacturerTitle')}
          type="text"
          error={errors?.manufacturerTitle?.message}
          register={register}
          required
        />
        <RegisterInput
          name="manufacturerNo"
          label={getTranslatedValue('ManufacturerNo')}
          placeholder={getTranslatedValue('ManufacturerNo')}
          type="number"
          error={errors?.manufacturerNo?.message}
          register={register}
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

export default ProductManufacturerForm;
