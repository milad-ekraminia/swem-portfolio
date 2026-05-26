import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  fetchWarehouseDetails,
  updateWarehouse,
} from '@/services/inventory-management/warehouses';
import { warehouseInitialValuesTypes } from '@/types/pages/inventory-management/warehouses';
import { updateWarehouserResolver } from '@/validations/inventory-management/warehouses-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { WareHousesInventoriesRecordsTable } from './inventories-records-table';
import WarehouseEditSubmitOrCancelButtons from './submit-or-cancel-button';
import { WareHousesTransferRecordsTable } from './transfer-records-table';
import WareHouseEditHeader from './ware-house-edit-form-header';
import WareHouseEditWrapperForm from './warehouse-edit-form';

const MemoWareHouseEdit = () => {
  const { id: warehouseId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ['warehouse info', warehouseId],
    queryFn: () =>
      fetchWarehouseDetails({
        warehouseId: Number(warehouseId),
      }),
    retry: false,
    enabled: !!warehouseId,
  });
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    // trigger
  } = useForm<warehouseInitialValuesTypes>({
    resolver: yupResolver(updateWarehouserResolver) as any,
    defaultValues: {
      name: data?.warehouse?.name,
      address: data?.warehouse?.address,
      coordinate: data?.warehouse?.coordinate,
      status: data?.warehouse?.status,
      isDiscard: data?.warehouse?.isDiscard,
      warehouseId: data?.warehouse?.id,
    },
  });

  useEffect(() => {
    reset({
      name: data?.warehouse?.name,
      address: data?.warehouse?.address,
      coordinate: data?.warehouse?.coordinate,
      status: data?.warehouse?.status,
      isDiscard: data?.warehouse?.isDiscard,
      warehouseId: data?.warehouse?.id,
    });
  }, [data?.warehouse, reset]);

  const handleSuccess = async () => {
    refetch();
    reset();
    queryClient.invalidateQueries({ queryKey: ['warehouses list'] });
    toast.success(getTranslatedValue('SaveSuccess'));
  };

  const handleError = async (error: any) => {
    const errorResponse = await apiErrorHandler(error);
    toastError(errorResponse?.error);
  };

  const mutationUpdateWarehouse = useMutation({
    mutationFn: updateWarehouse,
    onSuccess: handleSuccess,
    onError: handleError,
  });
  const navigate = useNavigate();
  const onSubmit = (formData: any) => {
    mutationUpdateWarehouse.mutate({
      ...formData,
      id: data?.warehouse?.id,
      isPlant: false,
      organizationId: null,
    });
  };
  return (
    <form className="warehouse-edit" onSubmit={handleSubmit(onSubmit)}>
      <WareHouseEditHeader label={data?.warehouse?.name} />
      <div className="warehouse-edit-form-content">
        <WareHouseEditWrapperForm
          control={control}
          errors={errors}
          register={register}
        />
        <WareHousesTransferRecordsTable isLoading={false} />
        <WareHousesInventoriesRecordsTable isLoading={false} />
      </div>

      <WarehouseEditSubmitOrCancelButtons
        handleCancelForm={() => {
          setShowModal(true);
        }}
        isPending={mutationUpdateWarehouse?.isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
      {showModal && (
        <Modal
          modalSize="sm"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <SureDeleteModal
            queryKey={'warehouses list'}
            deleteItemUrl={`app/warehouses/${data?.warehouse?.id}?api-version=${import.meta.env.VITE_API_VERSION
              }`}
            setShowModal={(value: any) => {
              setShowModal(value);
              navigate('/inventory-management/warehouses');
            }}
          />
        </Modal>
      )}
    </form>
  );
};

const WareHouseEditWrapper = memo(MemoWareHouseEdit);

export default WareHouseEditWrapper;
