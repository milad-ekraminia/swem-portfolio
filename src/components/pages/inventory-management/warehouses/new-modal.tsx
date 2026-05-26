import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';
import { fetchWarehouseLookup } from '@/services/inventory-management/warehouses';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import SelectInput from '@/components/ui/input/select-input/select-input';
import ToggleRegister from '@/components/ui/input/toggle-button/toggle-register';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';


const MemoNewWareHouseModalContent = ({
  errors,
  register,
  control,
  onClose,
  handleSubmit,
  onSubmit,
  isPending,
}: {
  errors: any;
  register: any;
  control: any;
  setValue: any;
  onClose: any;
  handleSubmit: any;
  isPending: boolean;
  onSubmit: any;
}) => {
  const { data: warehouseData } = useQuery({
    queryKey: ['Warehouse Lookup'],
    queryFn: () => fetchWarehouseLookup(),
    retry: false,
    enabled: true,
  });

  return (
    <form className="global-modal" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader label="NewWarehouse" setShowModal={onClose} />

      <div className="access-point-form-content">
        <div className="access-point-information-level">
          <RegisterInput
            required
            type="text"
            name="name"
            label={getTranslatedValue('WarehouseName')}
            autoFocus={true}
            error={errors?.name?.message}
            register={register}
          />
          <RegisterInput
            type="text"
            name="coordinate"
            label={getTranslatedValue('Coordinate')}
            autoFocus={true}
            error={errors?.coordinate?.message}
            register={register}
          />
          <RegisterInput
            required
            type="text"
            name="address"
            label={getTranslatedValue('Address')}
            autoFocus={true}
            error={errors?.address?.message}
            register={register}
          />

          <Controller
            name="warehouseId"
            control={control}
            render={({ field, fieldState }) => (
              <SelectInput
                name={field.name}
                label={getTranslatedValue('MainWarehouse')}
                placeholder={getTranslatedValue('PleaseSelectMainWarehouse')}
                options={
                  warehouseData?.items?.map((item: any) => ({
                    displayName: item.displayName,
                    value: item.id,
                  })) || []
                }
                field={field}
                error={fieldState.error?.message}
                openDirection="down"
              />
            )}
          />
          <div className="toggles-container">
            <ToggleRegister
              control={control}
              register={register}
              name="status"
              label={getTranslatedValue('Status')}
            />
            <ToggleRegister
              control={control}
              register={register}
              name="isDiscard"
              label={getTranslatedValue('IsDiscard')}
            />
          </div>
        </div>
      </div>
      <SubmitOrCancelButtons
        handleCancelForm={() => {
          onClose();
        }}
        isPending={isPending}
        confirmButtonText={getTranslatedValue('Save')}
      />
    </form>
  );
};

const NewWareHouseModalContent = memo(MemoNewWareHouseModalContent);

export default NewWareHouseModalContent;