import { WeatherInfoSvg } from '@/assets/icons/weather-info-svg';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import {
  aggregationTypeNames,
  aggregationTypeOptions,
  seriesOptions,
  seriesOptionsName,
  weatherDataTypeNames,
  weatherDataTypeOptions,
} from '@/enum-data/organization-trace/org-trace-enums';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchFirmWeatherDataLocationOWMSList } from '@/services/inventory-management/warehouses';
import {
  weatherInfoDetailDefaultValues,
  weatherInfoDetailValidation,
} from '@/validations/organization-trace/device-trend-analysis';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { CirclePlus, Trash2 } from 'lucide-react';
import { memo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import TableBox from './table-box';

const MemoWeatherInfo = ({ control, label }: { control: any; label?: any }) => {
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // local row form
  const {
    handleSubmit,
    register,
    control: detailControl,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(weatherInfoDetailValidation),
    defaultValues: weatherInfoDetailDefaultValues,
  });

  const { fields, append, remove } = useFieldArray<{
    weatherInfoFields: any[];
  }>({
    control,
    name: 'weatherInfoFields',
  });

  const handleAddDetail = (data: any) => {
    append(data);
    reset({ Description: '' }); // reset desc only
  };

  const detailFields = [
    getTranslatedValue('em_weather_location'),
    getTranslatedValue('Label'),
    getTranslatedValue('em_calculation'),
    getTranslatedValue('em_graphic_serie_type'),
    getTranslatedValue('em_graphic_serie_color'),
    getTranslatedValue('em_y_axis_nr'),
    getTranslatedValue('firm_description'),
    getTranslatedValue('Actions'),
  ];

  const { data: locations } = useQuery({
    queryKey: ['application-configuration'],
    queryFn: () => fetchFirmWeatherDataLocationOWMSList({}),
    retry: false,
  });

  return (
    <TableBox
      remove={remove}
      setDeleteIndex={setDeleteIndex}
      deleteIndex={deleteIndex}
      icon={<WeatherInfoSvg />}
      label={label}
      control={control}
    >
      {/* Header */}
      <div className="dv-plant-detail__body-table__header">
        {detailFields.map((field) => (
          <div key={field} className="dv-plant-detail__body-table__header-cell">
            <span className="dv-plant-detail__body-table__header-cell-title">
              {field}
            </span>
          </div>
        ))}
      </div>

      {/* Add new row form */}
      <div className="dv-plant-detail__body-table__body-column small">
        <div className="dv-plant-detail__body-table__body-column-cell">
          <RegisterSelectInput
            name="CityId"
            options={
              locations?.items?.map((item: any) => ({
                title: item?.displayName,
                value: item?.id,
              })) ?? []
            }
            register={register}
            control={detailControl}
            error={errors?.CityId?.message as any}
          />
        </div>

        <div className="dv-plant-detail__body-table__body-column-cell">
          <RegisterSelectInput
            name="AggregationType"
            options={weatherDataTypeOptions}
            register={register}
            control={detailControl}
            error={errors?.AggregationType?.message as any}
          />
        </div>

        <div className="dv-plant-detail__body-table__body-column-cell">
          <RegisterSelectInput
            name="LabelId"
            options={aggregationTypeOptions}
            register={register}
            control={detailControl}
            error={errors?.LabelId?.message as any}
          />
        </div>

        <div className="dv-plant-detail__body-table__body-column-cell">
          <RegisterSelectInput
            name="Serial"
            options={seriesOptions}
            register={register}
            control={detailControl}
            error={errors?.Serial?.message as any}
          />
        </div>

        <div className="dv-plant-detail__body-table__body-column-cell">
          <RegisterInput
            type="color"
            name="color"
            register={register}
            error={errors?.color?.message as any}
          />
        </div>

        <div className="dv-plant-detail__body-table__body-column-cell">
          <RegisterSelectInput
            name="YAxis"
            options={[
              { value: 1, title: '1' },
              { value: 2, title: '2' },
            ]}
            register={register}
            control={detailControl}
            error={errors?.YAxis?.message as any}
          />
        </div>

        <div className="dv-plant-detail__body-table__body-column-cell">
          <RegisterInput
            type="text"
            name="Description"
            register={register}
            error={errors?.Description?.message as any}
          />
        </div>

        <div className="dv-plant-detail__body-table__body-column-cell">
          <button
            type="button"
            className="dv-add-to-table-button"
            onClick={handleSubmit(handleAddDetail)}
          >
            <CirclePlus color="var(--brand-600)" size={20} />
          </button>
        </div>
      </div>

      {/* List rows */}
      <div className="dv-plant-detail__body-table__body">
        {fields?.length > 0 &&
          fields.map((field, index) => (
            <div
              key={field.id}
              className="dv-plant-detail__body-table__body-column dv-plant-detail__body-table__body-column-list"
            >
              <span className="dv-plant-detail__body-table__body-column-cell">
                {field?.CityId
                  ? locations?.items?.find(
                    (item: any) => item.id === field?.CityId,
                  )?.displayName
                  : '-'}
              </span>
              <span className="dv-plant-detail__body-table__body-column-cell">
                {weatherDataTypeNames[field?.AggregationType as 1]}
              </span>
              <span className="dv-plant-detail__body-table__body-column-cell">
                {aggregationTypeNames[field?.LabelId as 0 | 1 | 2 | 3] ?? '-'}
              </span>
              <span className="dv-plant-detail__body-table__body-column-cell">
                {field?.Serial
                  ? seriesOptionsName[field?.Serial as 'bar' | 'line' | 'dot']
                  : '-'}
              </span>
              <span className="dv-plant-detail__body-table__body-column-cell">
                <RegisterInput
                  type="color"
                  name={`${index}-color`}
                  disabled
                  value={field?.color}
                  register={register}
                />
              </span>
              <span className="dv-plant-detail__body-table__body-column-cell">
                {field?.YAxis}
              </span>
              <span className="dv-plant-detail__body-table__body-column-cell">
                {field?.Description ?? ''}
              </span>
              <div className="dv-plant-detail__body-table__body-column-cell">
                <button
                  type="button"
                  onClick={() => setDeleteIndex(index)}
                  className="dv-plant-detail__body-table__body-column-cell-button"
                >
                  <Trash2 color="#F04438" size={20} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </TableBox>
  );
};

const WeatherInfo = memo(MemoWeatherInfo);

export default WeatherInfo;
