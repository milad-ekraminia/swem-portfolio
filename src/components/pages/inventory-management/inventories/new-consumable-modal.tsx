import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  consumableSchema,
  consumableSchemaType,
} from '@/validations/inventory-management/inventories/add-edit-inventory-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { fetchProductConsumables } from '@/services/inventory-management/inventories/inventory-consumable-api';
import SubmitOrCancelButtons from '@/components/ui/button/submit-or-cancel-button';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';

const ConsumableFormContent = ({
  setShowModal,
  consumableOptions,
  isConsumableProductLoading,
  append,
  fields,
}: {
  setShowModal: any;
  isConsumableProductLoading?: boolean;
  consumableOptions: any;
  append: any;
  fields: any;
}) => {
  const {
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
    control: consumableControl,
  } = useForm<consumableSchemaType>({
    resolver: yupResolver(consumableSchema as any),
    defaultValues: {
      description: null,
      amount: undefined,
      inventoryId: null,
      productId: 0,
    },
  });

  const productId = Number(
    useWatch({
      name: 'productId',
      control: consumableControl,
    }),
  );

  const { data } = useQuery({
    queryKey: ['Product Consumables', productId],
    queryFn: () =>
      fetchProductConsumables({
        productId: productId ? productId.toString() : undefined,
      }),
    retry: false,
    enabled: !!productId,
  });

  const totalApiAmount = data?.items?.reduce((sum: any, item: any) => {
    const amount = item?.inventoryConsumable?.amount ?? 0;
    return sum + amount;
  }, 0);

  const totalAmount =
    totalApiAmount +
    fields?.reduce((sum: any, item: any) => {
      const amount = item?.productId == productId ? item?.amount : 0;
      return sum + amount;
    }, 0);

  const currentStockAmount = data?.items[0]?.product.currentStockAmount || 0;

  const result = parseInt(currentStockAmount) - parseInt(totalAmount);

  const handleAddConsumable = (data: consumableSchemaType) => {
    append({
      description: data.description,
      amount: data.amount,
      productId: data.productId,
      inventoryId: null,
    });
    reset();
    setShowModal(false);
  };

  const validMax = result > 0 ? result : 0;
  const amountValue = watch('amount');
  const buttonDiabled = amountValue > validMax || !productId || !amountValue;

  return (
    <form
      className="inventories-modal"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(handleAddConsumable)(e);
      }}
    >
      <ModalHeader
        label={
          getTranslatedValue('New') + ' ' + getTranslatedValue('Consumable')
        }
        setShowModal={setShowModal}
      />

      <div className="body">
        <RegisterSelectInput
          name={'productId'}
          label={getTranslatedValue('ConsumableProduct')}
          // isRequiredInput={true}
          options={consumableOptions}
          isLoading={isConsumableProductLoading}
          register={register}
          control={consumableControl}
        />

        <div className="grid">
          <RegisterInput
            // name={"amount"}
            label={getTranslatedValue('Amount')}
            type={'number'}
            autoComplete="off"
            required
            disabled={!productId}
            max={validMax}
            register={register}
            error={
              amountValue > validMax || errors?.amount
                ? getTranslatedValue(`InventoryMaximumAmount`) + ' ' + validMax
                : ''
            }
            {...register('amount', {
              max: {
                value: validMax,
                message:
                  getTranslatedValue(`InventoryMaximumAmount`) + ' ' + validMax,
              },
            })}
          />

          <RegisterInput
            name={'description'}
            label={getTranslatedValue('Description')}
            type={'text'}
            textarea={true}
            register={register}
          />
        </div>
      </div>

      <div className="inventories-modal__footer">
        <SubmitOrCancelButtons
          handleCancelForm={() => {
            setShowModal(false);
          }}
          isSubmitDisabled={buttonDiabled}
          isPending={false}
          confirmButtonText={getTranslatedValue('Save')}
        />
      </div>
    </form>
  );
};

export default ConsumableFormContent;
