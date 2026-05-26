import { useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { formatSelectOptions } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { productBrandModelsValidations } from '@/validations/inventory-management/product-brand-models-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  ProductBrandModel,
  ProductBrandModelFormData,
} from '@/types/pages/inventory-management/product-brand-models';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewProductsBrandModels,
  fetchAllProductsBrands,
  updateProductsBrandModels,
} from '@/services/inventory-management/product-brand-models';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

const defaultValues = {};
interface Props {
  onSuccess: () => void;
  brandModel?: ProductBrandModel;
}
const ProductBrandModelForm = ({ onSuccess, brandModel }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ProductBrandModelFormData>({
    resolver: yupResolver(productBrandModelsValidations as any),
    defaultValues,
  });

  const { data: productBrands, isLoading: isProductBrandsLoading } = useQuery({
    queryKey: ['all product brands'],
    queryFn: () => fetchAllProductsBrands(),
    retry: false,
  });

  useEffect(() => {
    if (brandModel) {
      reset({
        id: brandModel.productBrandModel.id,
        modelName: brandModel.productBrandModel.modelName,
        productBrandId: brandModel.productBrand?.id as any,
      });
    }
  }, [brandModel, reset]);
  const handleMutationSuccess = async (message: string) => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['productBrandModels'] });
    toast.success(getTranslatedValue(message));
    onSuccess();
  };

  const handleMutationError = async (error: AxiosError) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const editMutation = useMutation({
    mutationFn: updateProductsBrandModels,
    onSuccess: () => handleMutationSuccess('SuccessfullyUpdated'),
    onError: handleMutationError,
  });

  const createMutation = useMutation({
    mutationFn: createNewProductsBrandModels,
    onSuccess: () => handleMutationSuccess('SaveSuccess'),
    onError: handleMutationError,
  });

  const onSubmit = (formData: ProductBrandModelFormData) => {
    if (brandModel) {
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

  const isEditMode = !!brandModel;
  const isPending = isEditMode
    ? editMutation.isPending
    : createMutation.isPending;

  return (
    <form className={`global-modal`} onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={isEditMode}
        label={isEditMode ? 'Update' : 'NewProductBrandModel'}
        setShowModal={onSuccess}
      />
      <div className={`notification-form-content `}>
        <RegisterInput
          name="modelName"
          label={getTranslatedValue('ModelName')}
          placeholder={getTranslatedValue('ModelName')}
          type="text"
          error={errors?.modelName?.message}
          register={register}
          required
        />
        <RegisterSelectInput
          name="productBrandId"
          label={getTranslatedValue('ProductBrand')}
          placeholder={getTranslatedValue('ProductBrand')}
          options={formatSelectOptions(productBrands)}
          required={true}
          isLoading={isProductBrandsLoading}
          register={register}
          control={control}
          error={errors?.productBrandId?.message}
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

export default ProductBrandModelForm;
