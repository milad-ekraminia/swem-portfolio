import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { editProductResolver } from '@/validations/inventory-management/product/product-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateProductInitialValues } from '@/types/pages/inventory-management/inventory-management';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { updateProducts } from '@/services/inventory-management/products/update-product-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import ProductFormContent from './form-content';

const EditProductModal = ({
  dataInfo,
  setShowModal,
}: {
  setShowModal: (data: any) => void;
  dataInfo: any;
}) => {
  const queryClient = useQueryClient();

  const initialValues: updateProductInitialValues = {
    productId: dataInfo?.product?.id,
    productName: dataInfo?.product?.productName,
    barcodeNumber: dataInfo?.product?.barcodeNumber,
    currentStockAmount: dataInfo?.product?.currentStockAmount,
    purchaseNumber: dataInfo?.product?.purchaseNumber,
    status: dataInfo?.product?.status,
    isConsumable: dataInfo?.product?.isConsumable,
    stockNumber: dataInfo?.product?.stockNumber,
    productBrandId: dataInfo?.productBrand?.id,
    productBrandModelId: dataInfo?.productBrandModel?.id,
    productManufacturerId: dataInfo?.productManufacturer?.id,
    productTypeId: dataInfo?.productType?.id,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<updateProductInitialValues>({
    resolver: yupResolver(editProductResolver as any),
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: updateProducts,
    onSuccess: async () => {
      reset();
      toast.success(getTranslatedValue('SaveSuccess'));
      setShowModal(null);
      queryClient.invalidateQueries({ queryKey: ['Products List'] });
    },

    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const onSubmit = (data: updateProductInitialValues) => {
    mutation.mutate(data);
  };

  const handleCancelForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    setShowModal(null);
  };

  const isConsumable = useWatch({ name: 'isConsumable', control }) || false;

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader isEdit label="Update" setShowModal={setShowModal} />

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

export default EditProductModal;
