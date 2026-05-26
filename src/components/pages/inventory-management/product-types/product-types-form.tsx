import { useEffect } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { formatSelectOptions } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { productTypeValidations } from '@/validations/inventory-management/product-types-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  ProductType,
  ProductTypeFormData,
} from '@/types/pages/inventory-management/product-types';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewProductType,
  fetchProductUnitLookup,
  updateProductType,
} from '@/services/inventory-management/product-types';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

const defaultValues = {};
interface Props {
  onSuccess: () => void;
  productType?: ProductType;
}
const ProductTypeForm = ({ onSuccess, productType }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ProductTypeFormData>({
    resolver: yupResolver(productTypeValidations as any),
    defaultValues,
  });

  const { data: productUnits } = useQuery({
    queryKey: ['Product Unit Lookup'],
    queryFn: fetchProductUnitLookup,
    retry: false,
  });

  useEffect(() => {
    if (productType) {
      reset({
        description: productType.productType.description,
        name: productType.productType.name,
        id: productType.productType.id,
        productUnitId: productType.productUnit?.id as any,
      });
    }
  }, [productType, reset]);
  const handleMutationSuccess = async (message: string) => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['productTypes'] });
    toast.success(getTranslatedValue(message));
    onSuccess();
  };

  const handleMutationError = async (error: AxiosError) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const editMutation = useMutation({
    mutationFn: updateProductType,
    onSuccess: () => handleMutationSuccess('SuccessfullyUpdated'),
    onError: handleMutationError,
  });

  const createMutation = useMutation({
    mutationFn: createNewProductType,
    onSuccess: () => handleMutationSuccess('SaveSuccess'),
    onError: handleMutationError,
  });

  const onSubmit = (formData: ProductTypeFormData) => {
    if (productType) {
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

  const isEditMode = !!productType;
  const isPending = isEditMode
    ? editMutation.isPending
    : createMutation.isPending;

  return (
    <form className={`global-modal`} onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={isEditMode}
        label={isEditMode ? 'Update' : 'NewProductType'}
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
        <RegisterInput
          name="description"
          label={getTranslatedValue('Description')}
          placeholder={getTranslatedValue('Description')}
          type="text"
          error={errors?.description?.message}
          register={register}
          required
        />
        <RegisterSelectInput
          name="productUnitId"
          label={getTranslatedValue('ProductUnit')}
          placeholder={getTranslatedValue('ProductUnit')}
          options={formatSelectOptions(productUnits)}
          required={true}
          register={register}
          control={control}
          error={errors?.productUnitId?.message}
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

export default ProductTypeForm;
