import { KeyRepairCircleSvg } from '@/assets/icons/key-repair-circle-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import PlantFormContent from '@/components/pages/bys/plants/form-content';
import PlantEditSubmitOrCancelButtons from '@/components/pages/bys/plants/submit-or-cancel-button';
import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import { Loader } from '@/components/ui/loader/loader';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getCookie } from '@/helpers/cookies';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  fetchWarehouseDetails,
  updateWarehouse,
} from '@/services/inventory-management/warehouses';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { updateWarehouseInitialValuesTypes } from '@/types/pages/inventory-management/inventory-management';
import { updateWarehouserResolver } from '@/validations/inventory-management/warehouses-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PlantInventoriesTable } from '../../../components/pages/bys/plants/inventories-table';
import { PlantTransferLogsTable } from '../../../components/pages/bys/plants/transfer-logs-table';

export const PlantsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const isRTL = getCookie('CultureName') === 'fa';

  const { data, isLoading } = useQuery({
    queryKey: ['plant info', id],
    queryFn: () =>
      fetchWarehouseDetails({
        warehouseId: Number(id),
      }),
    retry: false,
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<updateWarehouseInitialValuesTypes>({
    resolver: yupResolver(updateWarehouserResolver as any),
    defaultValues: {
      name: data?.warehouse?.name,
      address: data?.warehouse?.address,
      coordinate: data?.warehouse?.coordinate,
      status: data?.warehouse?.status,
    },
  });

  useEffect(() => {
    reset(data?.warehouse);
  }, [data?.warehouse, reset]);

  const mutation = useMutation({
    mutationFn: updateWarehouse,
    onSuccess: async () => {
      toast.success(getTranslatedValue('SuccessfullyUpdated'));
      navigate('/bys/plants');
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const onSubmit = (info: updateWarehouseInitialValuesTypes) => {
    mutation.mutate({
      ...info,
      id: data?.warehouse?.id,
      isPlant: true,
      isDiscard: false,
      organizationId: null,
    });
  };

  const baseBreadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Menu:MaintenanceAndRepair',
    },
    { label: 'Menu:Plants', href: '/bys/plants' },
    {
      label: `"${data?.warehouse?.name}" ${getTranslatedValue('Edit')}`,
      href: `/bys/plants/edit/${id}`,
    },
  ];
  const title = {
    label: 'Menu:Plants',
    href: '/bys/plants',
  };

  const status = useWatch({
    control,
    name: 'status',
  });

  return (
    <>
      <div className="page-wrapper">
        <PagesHeader
          title={title}
          breadcrumbs={baseBreadcrumbs}
          icon={<KeyRepairCircleSvg stroke="#344054" />}
        />
        <div className="page-wrapper__body plants-edit">
          <div className="plants-edit__title">
            <button type="button" onClick={() => navigate('/bys/plants')}>
              {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
            </button>
            <span>
              "{data?.warehouse?.name}" {getTranslatedValue('Edit')}
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="plants-edit__body">
            {!isLoading ? (
              <>
                <PlantFormContent
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  status={status}
                />

                <PlantTransferLogsTable />

                <PlantInventoriesTable />

                <PlantEditSubmitOrCancelButtons
                  handleCancelForm={() => {
                    setDeleteItem(data?.warehouse);
                  }}
                  isPending={mutation?.isPending}
                  confirmButtonText={getTranslatedValue('Save')}
                />
              </>
            ) : (
              <Loader />
            )}
          </form>
        </div>
      </div>

      {deleteItem && (
        <Modal
          modalSize="sm"
          isOpen={deleteItem}
          onClose={() => setDeleteItem(null)}
        >
          <SureDeleteModal
            queryKey={'Get Plants List'}
            deleteItemUrl={`app/warehouses/${deleteItem?.id}?api-version=${import.meta.env.VITE_API_VERSION}`}
            setShowModal={(value: any) => {
              setDeleteItem(value);
              // navigate("/bys/plants");
            }}
            onSuccess={() => navigate('/bys/plants')}
          />
        </Modal>
      )}
    </>
  );
};
