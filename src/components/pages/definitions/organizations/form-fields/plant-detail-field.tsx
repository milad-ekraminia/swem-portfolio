import { memo } from 'react';
import { formatMonthlyDate } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  organizationPlantDetailsSchema,
  organizationPlantDetailsSchemaType,
} from '@/validations/definitions/definitions-organizations';
import { yupResolver } from '@hookform/resolvers/yup';
import { CirclePlus, Trash2 } from 'lucide-react';
import { Control, useFieldArray, useForm, useWatch } from 'react-hook-form';
import DateInput from '@/components/ui/input/date-input/date-input';
import { DecimalInput } from '@/components/ui/input/decimal-input/Input';
import { Loader } from '@/components/ui/loader/loader';

const MemoPlantDetailField = ({
  control,
  isLoading = false,
}: {
  control: Control<any>;
  isLoading?: boolean;
}) => {
  const getToday = () => {
    const today = new Date();
    const pad = (num: number) => String(num).padStart(2, '0');
    return `${today.getFullYear()}-${pad(today.getMonth() + 1)}`;
  };

  const PlantDetailFields = [
    getTranslatedValue('Date'),
    getTranslatedValue('ProductionForecastWUnit'),
    getTranslatedValue('UnitPriceMultiplier'),
    getTranslatedValue('Action'),
  ];

  const orgId =
    useWatch({
      control,
      name: 'organizationParentId',
    }) ?? 0;

  const {
    handleSubmit,
    // reset,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<organizationPlantDetailsSchemaType>({
    resolver: yupResolver(organizationPlantDetailsSchema),
    defaultValues: {
      monthYear: getToday(),
      productionForecast: 0,
      unitPriceMultiplier: 1,
      organizationId: orgId,
    },
  });

  const { fields, append, remove } = useFieldArray<{
    organizationPlantDetails: organizationPlantDetailsSchemaType[];
  }>({
    control,
    name: 'organizationPlantDetails',
  });

  const dateValue = watch('monthYear') ?? getToday();

  const handleAddOrganizationPlantDetail = (data: any) => {
    append({
      monthYear: data.monthYear,
      productionForecast: data.productionForecast,
      unitPriceMultiplier: data.unitPriceMultiplier,
      organizationId: data.organizationId < 0 ? undefined : data.organizationId,
    });

    setValue('monthYear', '');
    setValue('productionForecast', 0);
    setValue('unitPriceMultiplier', 1);
  };

  const handleRemoveDetail = (index: number) => {
    remove(index);
  };

  return (
    <div className="dv-plant-detail dv-organization-modal__content-input-full">
      <div className="dv-plant-detail__header">
        <h1 className="dv-plant-detail__header-title">
          {getTranslatedValue('PlantDetail')}
        </h1>
      </div>
      <div className="dv-plant-detail__body">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="dv-plant-detail__body-table">
            <div className="dv-plant-detail__body-table__header">
              {PlantDetailFields.map((field) => (
                <div
                  key={field}
                  className="dv-plant-detail__body-table__header-cell"
                >
                  <span className="dv-plant-detail__body-table__header-cell-title">
                    {field}
                  </span>
                </div>
              ))}
            </div>

            <div className="dv-plant-detail__body-table__body">
              {fields?.length > 0 &&
                fields.map((field, index) => {
                  return (
                    <div
                      key={field.id}
                      className="dv-plant-detail__body-table__body-column dv-plant-detail__body-table__body-column-list"
                    >
                      <span className="dv-plant-detail__body-table__body-column-cell">
                        {field.monthYear
                          ? formatMonthlyDate(field.monthYear)
                          : ''}
                      </span>
                      <span className="dv-plant-detail__body-table__body-column-cell">
                        {field.productionForecast}
                      </span>
                      <span className="dv-plant-detail__body-table__body-column-cell">
                        {field.unitPriceMultiplier}
                      </span>
                      <div className="dv-plant-detail__body-table__body-column-cell">
                        <button
                          className="dv-plant-detail__body-table__body-column-cell-button"
                          type="button"
                          onClick={() => handleRemoveDetail(index)}
                        >
                          <Trash2 color="#F04438" size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}

              <div className="dv-plant-detail__body-table__body-column">
                <div className="dv-plant-detail__body-table__body-column-cell">
                  <DateInput
                    name="monthYear"
                    onChange={(e) => setValue('monthYear', e)}
                    value={dateValue}
                    onlyMonthPicker
                  />
                </div>
                <div className="dv-plant-detail__body-table__body-column-cell">
                  <DecimalInput
                    error={errors?.productionForecast?.message}
                    name="productionForecast"
                    register={register}
                    setValue={setValue}
                    placeholder="0.000"
                  />
                </div>
                <div className="dv-plant-detail__body-table__body-column-cell">
                  <DecimalInput
                    error={errors?.unitPriceMultiplier?.message}
                    name="unitPriceMultiplier"
                    register={register}
                    setValue={setValue}
                    placeholder="0.100"
                  />
                </div>
                <div className="dv-plant-detail__body-table__body-column-cell">
                  <button
                    className="dv-plant-detail__body-table__body-column-cell-button"
                    type="button"
                    onClick={handleSubmit(handleAddOrganizationPlantDetail)}
                    disabled={!watch('monthYear')}
                  >
                    <CirclePlus color="var(--brand-600)" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PlantDetailField = memo(MemoPlantDetailField);

export default PlantDetailField;
