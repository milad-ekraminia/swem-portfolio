import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  newProductResolver,
  productInitialValues,
} from '@/validations/inventory-management/product/product-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { newProductInitialValues } from '@/types/pages/inventory-management/inventory-management';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewProduct } from '@/services/inventory-management/products/create-product-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import ProductFormContent from './form-content';

const NewProductModal = ({ setShowModal }: { setShowModal: any }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<newProductInitialValues>({
    resolver: yupResolver(newProductResolver as any),
    defaultValues: productInitialValues,
  });

  const mutation = useMutation({
    mutationFn: createNewProduct,
    onSuccess: async () => {
      reset();
      toast.success(getTranslatedValue('SaveSuccess'));
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ['Products List'] });
    },

    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const onSubmit = (data: newProductInitialValues) => {
    mutation.mutate(data);
  };

  const handleCancelForm = (e: any) => {
    e.preventDefault();
    reset();
    setShowModal(false);
  };

  const isConsumable = useWatch({ name: 'isConsumable', control }) || false;

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={false}
        label="NewProduct"
        setShowModal={setShowModal}
      />

      <ProductFormContent
        errors={errors}
        register={register}
        setValue={setValue}
        isConsumable={isConsumable}
        control={control}
      />

      <SubmitOrCancelButtons
        handleCancelForm={handleCancelForm}
        isPending={mutation?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default NewProductModal;
