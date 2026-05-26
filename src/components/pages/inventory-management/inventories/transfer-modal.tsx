import { useMemo } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { formatSelectOptions } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { updateTransfer } from '@/services/inventory-management/inventories/update-transfer-api';
import { fetchWarehouseLookup } from '@/services/inventory-management/warehouses';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

const TransferModal = ({
  setShowModal,
  transferDetails,
}: {
  setShowModal: any;
  transferDetails: {
    inventory: { id: string };
    warehouse: { id: string };
  };
}) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['warehouse'],
    queryFn: () => fetchWarehouseLookup(),
  });

  const defaultValues = useMemo(() => {
    return {
      inventoryId: parseInt(transferDetails?.inventory?.id) ?? 0,
      newWarehouseId: parseInt(transferDetails?.warehouse?.id) ?? 0,
      transferAmount: 1,
    };
  }, [transferDetails]);

  const Schema = yup.object({
    inventoryId: yup.number(),
    newWarehouseId: yup.number(),
    transferAmount: yup.number(),
  });

  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: updateTransfer,
    onSuccess: () => {
      toast.success(getTranslatedValue('SaveSuccess'));
      setShowModal(null);
      queryClient.invalidateQueries({ queryKey: ['inventories detailed'] });
      queryClient.invalidateQueries({ queryKey: ['inventories general'] });
    },

    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const onSubmit = (formData: any) => {
    mutation.mutate(formData);
  };

  return (
    <form className="inventories-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader label="Transfer" isTransfer setShowModal={setShowModal} />

      <div className="body">
        <RegisterInput
          type="text"
          name="transferAmount"
          label={getTranslatedValue('Stock')}
          // error={errors?.transferAmount?.message ?? ''}
          maxLength={50}
          disabled
          register={register}
        />

        <RegisterSelectInput
          name="newWarehouseId"
          label={getTranslatedValue('Warehouse')}
          options={formatSelectOptions(data)}
          // error={errors?.newWarehouseId?.message??''}
          register={register}
          control={control}
        />
      </div>

      <div className="inventories-modal__footer">
        <SubmitOrCancelButtons
          handleCancelForm={() => {
            setShowModal(false);
          }}
          isPending={mutation?.isPending}
          confirmButtonText={getTranslatedValue('Save')}
        />
      </div>
    </form>
  );
};

export default TransferModal;
