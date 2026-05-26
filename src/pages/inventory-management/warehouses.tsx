import { DefinitionsDevicesSvg } from '@/assets/icons/definitions-devices-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import NewWareHouseModal from '@/components/pages/inventory-management/warehouses/new-modal';
import { WareHousesWrapper } from '@/components/pages/inventory-management/warehouses/warehouses-wrapper';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { createNewWarehouse } from '@/services/inventory-management/warehouses';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { warehouseInitialValuesTypes } from '@/types/pages/inventory-management/warehouses';
import {
  warehouseInitialValues,
  warehouserResolver,
} from '@/validations/inventory-management/warehouses-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const WareHouses = () => {
  const [newItem, setNewItem] = useState(false);
  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Menu:InventoryManagement',
      href: '',
    },
    {
      label: 'Warehouses',
      href: '',
    },
  ];
  const title = {
    label: 'Warehouses',
    href: ``,
  };
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    // trigger
  } = useForm<warehouseInitialValuesTypes>({
    resolver: yupResolver(warehouserResolver) as any,
    defaultValues: warehouseInitialValues,
  });
  const handleSuccess = async () => {
    reset();
    queryClient.invalidateQueries({ queryKey: ['warehouses list'] });
    toast.success(getTranslatedValue('SaveSuccess'));
    setNewItem(false);
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationNewWarehouse = useMutation({
    mutationFn: createNewWarehouse,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (formData: any) => {
    mutationNewWarehouse.mutate({
      ...formData,
      accessPointSerialNr: formData.accessPointSerialNr?.toString(),
      accessPointPort: formData.accessPointPort?.toString(),
      accessPointConfPort: formData.accessPointConfPort?.toString(),
    });
  };

  return (
    <>
      <div className="page-wrapper warehouses">
        <PagesHeader
          title={title}
          breadcrumbs={baseBreadcrumbs}
          icon={<DefinitionsDevicesSvg />}
        />
        <div className="page-wrapper__body">
          <WareHousesWrapper setNewItem={getPermission("WebNet.Warehouses.Create") && setNewItem}
          />
        </div>
      </div>
      {getPermission("WebNet.Warehouses.Create") && newItem && (
        <Modal
          isOpen={newItem}
          onClose={() => setNewItem(false)}
          modalSize="sm"
          showCloseButton={false}
        >
          <NewWareHouseModal
            errors={errors}
            register={register}
            control={control}
            setValue={setValue}
            onClose={() => setNewItem(false)}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isPending={mutationNewWarehouse?.isPending}
          />
        </Modal>
      )}
    </>
  );
};
