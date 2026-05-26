import { useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { productBrandFormValidation } from '@/validations/inventory-management/product-brands-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ProductBrandFormData } from '@/types/pages/inventory-management/product-brands';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewProductsBrands,
  updateProductsBrands,
} from '@/services/inventory-management/product-brands';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

const defaultValues = {};

interface Props {
  onSuccess: () => void;
  brand?: ProductBrandFormData;
}
const ProductBrandForm = ({ onSuccess, brand }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductBrandFormData>({
    resolver: yupResolver(productBrandFormValidation as any),
    defaultValues,
  });

  useEffect(() => {
    if (brand) {
      reset(brand);
    }
  }, [brand, reset]);

  const handleMutationSuccess = async (message: string) => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['productBrands'] });
    toast.success(getTranslatedValue(message));
    onSuccess();
  };

  const handleMutationError = async (error: AxiosError) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const editMutation = useMutation({
    mutationFn: updateProductsBrands,
    onSuccess: () => handleMutationSuccess('SuccessfullyUpdated'),
    onError: handleMutationError,
  });

  const createMutation = useMutation({
    mutationFn: createNewProductsBrands,
    onSuccess: () => handleMutationSuccess('SaveSuccess'),
    onError: handleMutationError,
  });

  const onSubmit = (formData: ProductBrandFormData) => {
    if (brand) {
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

  const isEditMode = !!brand;
  const isPending = isEditMode
    ? editMutation.isPending
    : createMutation.isPending;

  return (
    <form className={`global-modal`} onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={isEditMode}
        label={isEditMode ? 'Update' : 'NewProductBrand'}
        setShowModal={onSuccess}
      />
      <div className={`notification-form-content `}>
        <RegisterInput
          name="brandName"
          label={getTranslatedValue('BrandName')}
          placeholder={getTranslatedValue('BrandName')}
          type="text"
          error={errors?.brandName?.message}
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

export default ProductBrandForm;
