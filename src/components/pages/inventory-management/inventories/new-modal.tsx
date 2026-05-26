import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  addInventorySchema,
  addInventorySchemaType,
} from '@/validations/inventory-management/inventories/add-edit-inventory-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewInventory } from '@/services/inventory-management/inventories/create-new-inventory';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import InventoryFormContent from './form-content';

const NewInventoryModal = ({
  setShowModal,
  warehouseId,
  productId,
}: {
  setShowModal: any;
  warehouseId: string;
  productId: string | null;
}) => {
  const queryClient = useQueryClient();

  const initialValues: addInventorySchemaType = {
    guaranteeStart: '',
    guaranteeEnd: '',
    amount: 1,
    serialNumber: '',
    inUse: false,
    warehouseId: Number(warehouseId),
    productId: productId ? Number(productId) : 0,
    description: '',
    consumables: [],
    inventoryImages: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
  } = useForm<addInventorySchemaType>({
    resolver: yupResolver(addInventorySchema as any),
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: createNewInventory,
    onSuccess: () => {
      toast.success(getTranslatedValue('SaveSuccess'));
      setShowModal(false);
      reset();
      queryClient.invalidateQueries({ queryKey: ['inventories detailed'] });
      queryClient.invalidateQueries({ queryKey: ['inventories general'] });
    },

    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  const handleCancelForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(false);
    reset();
  };

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        isEdit={false}
        label="NewInventory"
        setShowModal={setShowModal}
      />

      <InventoryFormContent
        watch={watch}
        setValue={setValue}
        register={register}
        errors={errors}
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

export default NewInventoryModal;
