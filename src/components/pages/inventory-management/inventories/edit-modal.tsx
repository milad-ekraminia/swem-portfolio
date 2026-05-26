import { useEffect, useMemo } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { formatDateForInput } from '@/helpers/format-date-for-input';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { addInventorySchemaType } from '@/validations/inventory-management/inventories/add-edit-inventory-validation';
import { editInventoryResolver } from '@/validations/inventory-management/inventories/update-inventory-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { fetchInventoryConsumables } from '@/services/inventory-management/inventories/inventory-consumable-api';
import { fetchInventoryImages } from '@/services/inventory-management/inventories/inventory-images-api';
import { updateInventory } from '@/services/inventory-management/inventories/update-inventory';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { Loader } from '@/components/ui/loader/loader';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import InventoryFormContent from './form-content';

const EditInventoryModal = ({
  dataInfo,
  setShowModal,
}: {
  dataInfo: any;
  setShowModal: any;
}) => {
  const queryClient = useQueryClient();
  const inventoryId = dataInfo?.inventory?.id;
  const { data: inventoryImagesData, isLoading: inventoryImagesDataLoading } =
    useQuery({
      queryKey: ['edit inventories Images', inventoryId],
      queryFn: async () =>
        await fetchInventoryImages({
          InventoryId: inventoryId,
        }),
      retry: false,
      enabled: !!inventoryId,
    });

  const {
    data: inventoryConsumablesData,
    isLoading: inventoryConsumablesDataLoading,
  } = useQuery({
    queryKey: ['inventories consumable', inventoryId],
    queryFn: () =>
      fetchInventoryConsumables({
        InventoryId: inventoryId,
      }),
    retry: false,
    enabled: !!inventoryId,
  });

  const inventoryConsumables = useMemo(() => {
    return inventoryConsumablesData?.items.map((item: any) => ({
      amount: item.inventoryConsumable.amount ?? 1,
      description: item.inventoryConsumable.description ?? '',
      inventoryId: item.inventoryConsumable.inventoryId ?? 0,
      productId: item.inventoryConsumable.productId ?? 0,
    }));
  }, [inventoryConsumablesData]);

  const inventoryImages = useMemo(() => {
    return inventoryImagesData?.items?.map((item: any) => ({
      image: item.inventoryImage.image,
      inventoryId: item.inventory.id,
    }));
  }, [inventoryImagesData]);

  const initialValues = useMemo(
    () => ({
      inventoryId: dataInfo?.inventory?.id || 0,
      guaranteeStart: dataInfo?.inventory?.guaranteeStart
        ? formatDateForInput(dataInfo?.inventory?.guaranteeStart)
        : '',
      guaranteeEnd: dataInfo?.inventory?.guaranteeEnd
        ? formatDateForInput(dataInfo?.inventory?.guaranteeEnd)
        : '',
      amount: dataInfo?.inventory?.amount ?? 0,
      serialNumber: dataInfo?.inventory?.serialNumber ?? '',
      inUse: dataInfo?.inventory?.inUse ?? false,
      warehouseId: dataInfo?.inventory?.warehouseId ?? 0,
      productId: dataInfo?.inventory?.productId ?? undefined,
      description: dataInfo?.inventory?.description ?? '',
      concurrencyStamp: dataInfo?.inventory?.concurrencyStamp ?? '',
      consumables: inventoryConsumables ?? [],
      inventoryImages: inventoryImages ?? [],
    }),
    [dataInfo, inventoryConsumables, inventoryImages],
  );

  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
    setValue,
    watch,
  } = useForm<addInventorySchemaType>({
    resolver: yupResolver(
      editInventoryResolver,
    ) as unknown as Resolver<addInventorySchemaType>,
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  // updateInventory
  const mutation = useMutation({
    mutationFn: updateInventory,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['inventories detailed'] });
      toast.success(getTranslatedValue('Updated'));
      setShowModal(null);
      reset();
    },

    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
    reset();
  };

  const handleCancelForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(null);
    reset();
  };

  const isLoading =
    inventoryImagesDataLoading || inventoryConsumablesDataLoading;

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader isEdit label="Edit" setShowModal={setShowModal} />

      {!isLoading ? (
        <InventoryFormContent
          watch={watch}
          setValue={setValue}
          register={register}
          errors={errors}
          control={control}
        />
      ) : (
        <Loader />
      )}

      <SubmitOrCancelButtons
        handleCancelForm={handleCancelForm}
        isPending={mutation?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

export default EditInventoryModal;
