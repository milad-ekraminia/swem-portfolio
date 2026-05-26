import DateInput from '@/components/ui/input/date-input/date-input';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { formatSelectOptions } from '@/helpers/format-select-options';
import { getDateTypeWithAllOptions } from '@/helpers/get-date-type';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchBarcodedProductLookup } from '@/services/inventory-management/inventories/add-new-inventory-api';
import { fetchConsumableProductLookup } from '@/services/inventory-management/inventories/inventories-list-api';
import { fetchWarehouseLookup } from '@/services/inventory-management/warehouses';
import { consumableSchemaType } from '@/validations/inventory-management/inventories/add-edit-inventory-validation';
import { useQuery } from '@tanstack/react-query';
import { Plus, XIcon } from 'lucide-react';
import { memo, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import InventoryImage from './inventory-image';
import ConsumableFormContent from './new-consumable-modal';

const MemoInventoryFormContent = ({
  register,
  errors,
  setValue,
  watch,
  control,
}: {
  register: any;
  errors: any;
  setValue: any;
  watch: any;
  control: any;
}) => {
  const [newConsumable, setNewConsumable] = useState(false);
  const { data: productData, isLoading: isProductLoading } = useQuery({
    queryKey: ['Product Lookup'],
    queryFn: () => fetchBarcodedProductLookup(),
  });

  // FETCHING WAREHOUSE LIST
  const { data: warehouseData, isLoading: isWarehouseLoading } = useQuery({
    queryKey: ['Warehouse Lookup'],
    queryFn: () => fetchWarehouseLookup(),
  });

  const { data: consumableProductData, isLoading: isConsumableProductLoading } =
    useQuery({
      queryKey: ['Consumable Product Lookup'],
      queryFn: () => fetchConsumableProductLookup(),
    });

  const consumableOptions = formatSelectOptions(consumableProductData);

  const { fields, append, remove } = useFieldArray<{
    consumables: consumableSchemaType[];
  }>({
    control,
    name: 'consumables',
  });

  const handleDelete = (index: number) => {
    remove(index);
  };

  // FORMATTING DATA LIST
  const productOptions = formatSelectOptions(productData);
  const warehouseOptions = formatSelectOptions(warehouseData);

  const guaranteeStart = watch('guaranteeStart');
  const guaranteeEnd = watch('guaranteeEnd');

  return (
    <div className="inventory-form-content">
      <RegisterSelectInput
        name="productId"
        label={getTranslatedValue('Product')}
        // isRequiredInput={ true}
        options={productOptions}
        error={errors?.productId?.message}
        isLoading={isProductLoading}
        register={register}
        control={control}
      />

      <RegisterSelectInput
        name={'warehouseId'}
        label={getTranslatedValue('Warehouse')}
        required={true}
        options={warehouseOptions}
        error={errors?.warehouseId?.message}
        isLoading={isWarehouseLoading}
        register={register}
        control={control}
      />

      <div className="grid">
        <RegisterInput
          name={'amount'}
          label={getTranslatedValue('Stock')}
          type={'text'}
          readOnly={true}
          register={register}
        />

        <RegisterInput
          name={'serialNumber'}
          label={getTranslatedValue('SerialNumber')}
          type={'text'}
          error={errors?.serialNumber?.message}
          register={register}
        />
      </div>

      <div className="grid">
        <DateInput
          label={getTranslatedValue('GuaranteeStart')}
          name="StartDateTime"
          dateFormat={getDateTypeWithAllOptions('2')}
          onChange={(e: any) => setValue('guaranteeStart', e)}
          value={new Date(guaranteeStart)}
          periodType={'2'}
        // error={errors?.guaranteeStart?.message}
        />

        <DateInput
          label={getTranslatedValue('GuaranteeEnd')}
          name="guaranteeEnd"
          dateFormat={getDateTypeWithAllOptions('2')}
          onChange={(e: any) => setValue('guaranteeEnd', e)}
          minDate={new Date(guaranteeStart)}
          value={new Date(guaranteeEnd)}
          periodType={'2'}
        // error={errors?.guaranteeEnd?.message}
        />
      </div>

      <RegisterInput
        name={'description'}
        label={getTranslatedValue('Description')}
        type={'text'}
        textarea={true}
        register={register}
      />

      {/*  Consumable */}
      <div className="consumable-detail">
        <div className="consumable-detail__header">
          <h1 className="consumable-detail__header-title">
            {getTranslatedValue('Consumables')}
          </h1>

          <div className="new" onClick={() => setNewConsumable(true)}>
            <Plus color="var(--brand-600)" size={20} />
            {getTranslatedValue('New')} {getTranslatedValue('Consumable')}{' '}
            {getTranslatedValue('Add')}
          </div>
        </div>

        <div className="consumable-detail__body">
          {fields?.length > 0 ? (
            fields.map((field, index) => {
              return (
                <div key={field.id} className="consumable">
                  <span>
                    {
                      consumableOptions.find(
                        (option: any) => option.value == field.productId,
                      )?.title
                    }
                    {/* {" - ("}
                  {field?.amount.toFixed(2)}) */}
                  </span>
                  <button type="button" onClick={() => handleDelete(index)}>
                    <XIcon size={14} color="#98A2B3" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="empty-text">{getTranslatedValue('NotfoundAnyConsumable')}</div>
          )}
        </div>
      </div>

      <InventoryImage control={control} />

      {newConsumable && (
        <Modal
          modalSize="md"
          isOpen={newConsumable}
          showCloseButton={false}
          onClose={() => setNewConsumable(false)}
          outsideClickStyle={{ zIndex: 1006 }}
          contentStyle={{ zIndex: 1007 }}
        >
          <ConsumableFormContent
            setShowModal={setNewConsumable}
            append={append}
            fields={fields}
            consumableOptions={consumableOptions}
            isConsumableProductLoading={isConsumableProductLoading}
          />
        </Modal>
      )}
    </div>
  );
};

const InventoryFormContent = memo(MemoInventoryFormContent);
export default InventoryFormContent;
