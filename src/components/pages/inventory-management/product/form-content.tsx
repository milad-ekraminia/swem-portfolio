import { memo } from 'react';
import { formatSelectOptions } from '@/helpers/format-select-options';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useQuery } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';
import {
  fetchProductBrandLookup,
  fetchProductBrandModelLookup,
  fetchProductManufacturerLookup,
  fetchProductTypeLookup,
} from '@/services/inventory-management/products/products-side-api';
import { Checkbox } from '@/components/ui/input/check-box/check-box';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';

const MemoProductFormContent = ({
  register,
  errors,
  setValue,
  isConsumable,
  control,
}: {
  register: any;
  errors: any;
  setValue: any;
  isConsumable: boolean;
  control: any;
}) => {
  const { data: brandsData, isLoading: brandsLoading } = useQuery({
    queryKey: ['Product Brand Loopkup'],
    queryFn: () => fetchProductBrandLookup(),
    retry: false,
  });

  const { data: brandModelsData, isLoading: brandModelsLoading } = useQuery({
    queryKey: ['Product Brand Model Loopkup'],
    queryFn: () => fetchProductBrandModelLookup(),
    retry: false,
  });

  const { data: manufacturersData, isLoading: manufacturersLoading } = useQuery(
    {
      queryKey: ['Product Manufacturer Loopkup'],
      queryFn: () => fetchProductManufacturerLookup(),
      retry: false,
    },
  );

  const { data: typesData, isLoading: typesLoading } = useQuery({
    queryKey: ['Product Type Loopkup'],
    queryFn: () => fetchProductTypeLookup(),
    retry: false,
  });

  const status = useWatch({
    control,
    name: 'status',
  });

  return (
    <div className="product-form-content">
      <div className="grid">
        <RegisterInput
          name="productName"
          label={getTranslatedValue('ProductName')}
          type={'text'}
          required={true}
          error={errors?.productName?.message}
          register={register}
        />
        <RegisterInput
          name="barcodeNumber"
          label={getTranslatedValue('BarcodeNumber')}
          type={'text'}
          required={true}
          error={errors?.barcodeNumber?.message}
          register={register}
        />
        <RegisterInput
          name="purchaseNumber"
          label={getTranslatedValue('PurchaseNumber')}
          type={'number'}
          register={register}
        />
        {isConsumable && (
          <RegisterInput
            name="currentStockAmount"
            label={getTranslatedValue('CurrentStockAmount')}
            type={'text'}
            register={register}
          />
        )}

        <RegisterInput
          name="stockNumber"
          label={getTranslatedValue('StockNumber')}
          type={'text'}
          register={register}
        />

        <RegisterSelectInput
          name="productBrandId"
          label={getTranslatedValue('ProductBrand')}
          required={true}
          options={formatSelectOptions(brandsData)}
          isLoading={brandsLoading}
          register={register}
          control={control}
          error={errors?.productBrandId?.message}
        />

        <RegisterSelectInput
          name="productBrandModelId"
          label={getTranslatedValue('ProductBrandModel')}
          required={true}
          options={formatSelectOptions(brandModelsData)}
          isLoading={brandModelsLoading}
          register={register}
          control={control}
          error={errors?.productBrandModelId?.message}
        />

        <RegisterSelectInput
          name="productManufacturerId"
          label={getTranslatedValue('ProductManufacturer')}
          required={true}
          options={formatSelectOptions(manufacturersData)}
          isLoading={manufacturersLoading}
          register={register}
          control={control}
          error={errors?.productManufacturerId?.message}
        />

        <RegisterSelectInput
          name="productTypeId"
          label={getTranslatedValue('ProductType')}
          required={true}
          options={formatSelectOptions(typesData)}
          isLoading={typesLoading}
          register={register}
          control={control}
          error={errors?.productTypeId?.message}
        />
      </div>

      <div className="checkboxes">
        <Checkbox
          onChange={(value: any) => setValue('status', value)}
          checked={status}
          label={getTranslatedValue('Status')}
        />
        <Checkbox
          onChange={(value: any) => setValue('isConsumable', value)}
          checked={isConsumable}
          label={getTranslatedValue('IsConsumable')}
        />
      </div>
    </div>
  );
};

const ProductFormContent = memo(MemoProductFormContent);
export default ProductFormContent;
