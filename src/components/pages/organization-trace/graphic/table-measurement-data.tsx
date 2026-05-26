import { TapeSvg } from '@/assets/icons/tape-measurement-svg';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import {
  aggregationTypeNames,
  aggregationTypeOptions,
  seriesOptions,
  seriesOptionsName,
} from '@/enum-data/organization-trace/org-trace-enums';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  measurementDetailDefaultValues,
  measurementDetailValidation,
} from '@/validations/organization-trace/device-trend-analysis';
import { yupResolver } from '@hookform/resolvers/yup';
import { CirclePlus, Trash2 } from 'lucide-react';
import { memo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import DeviceAndLabelBox from './device-and-label-box';
import TableBox from './table-box';

const MemoMeasurementData = ({
  control,
  label,
  allLabels,
  devices,
}: {
  control: any;
  label?: any;
  allLabels: any;
  devices: any;
}) => {
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    control: detailControl,
    reset,
  } = useForm<any>({
    resolver: yupResolver(measurementDetailValidation),
    defaultValues: measurementDetailDefaultValues,
  });

  const { fields, append, remove } = useFieldArray<{
    measurementDataFields: any[];
  }>({
    control,
    name: 'measurementDataFields',
  });

  const handleAddDetail = (data: any) => {
    append({
      AggregationType: data.AggregationType,
      DeviceId: data.DeviceId,
      LabelId: data.LabelId,
      Serial: data.Serial,
      Color: data.Color,
      YAxis: data.YAxis,
      Description: data.Description,
    });
    reset({ Description: '' });
  };
  const detailFields = [
    getTranslatedValue('Device'),
    getTranslatedValue('Label'),
    getTranslatedValue('em_calculation'),
    getTranslatedValue('em_graphic_serie_type'),
    getTranslatedValue('em_graphic_serie_color'),
    getTranslatedValue('em_y_axis_nr'),
    getTranslatedValue('firm_description'),
    getTranslatedValue('Actions'),
  ];
  return (
    <TableBox
      remove={remove}
      setDeleteIndex={setDeleteIndex}
      deleteIndex={deleteIndex}
      icon={<TapeSvg />}
      label={label}
      control={control}
    >
      <div className="dv-plant-detail__body-table__header">
        {detailFields.map((field) => (
          <div key={field} className="dv-plant-detail__body-table__header-cell">
            <span className="dv-plant-detail__body-table__header-cell-title">
              {field}
            </span>
          </div>
        ))}
      </div>
      <div className="dv-plant-detail__body-table__body-column small">
        <DeviceAndLabelBox
          detailControl={detailControl}
          setValue={setValue}
          errors={errors}
        />
        <div className="dv-plant-detail__body-table__body-column-cell">
          <RegisterSelectInput
            name="AggregationType"
            options={aggregationTypeOptions}
            register={register}
            control={detailControl}
            error={errors?.AggregationType?.message as any}
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
            type={'color'}
            name={'Color'}
            error={errors?.Color?.message as any}
            register={register}
          />
        </div>
        <div className="dv-plant-detail__body-table__body-column-cell">
          <RegisterSelectInput
            name="YAxis"
            options={[
              { value: 1, title: '1' },
              { value: 2, title: '2' },
            ]}
            error={errors?.YAxis?.message as any}
            register={register}
            control={detailControl}
          />
        </div>
        <div className="dv-plant-detail__body-table__body-column-cell">
          <RegisterInput
            type={'text'}
            name={'Description'}
            error={errors?.Description?.message as any}
            register={register}
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

      <div className="dv-plant-detail__body-table__body">
        {fields?.length > 0 &&
          fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="dv-plant-detail__body-table__body-column dv-plant-detail__body-table__body-column-list"
              >
                <span className="dv-plant-detail__body-table__body-column-cell">
                  {field?.DeviceId
                    ? devices?.find((item: any) => item.id === field?.DeviceId)
                      ?.displayName
                    : '-'}{' '}
                  + {field?.DeviceId}
                </span>
                <span className="dv-plant-detail__body-table__body-column-cell">
                  {allLabels?.find((item: any) => item.id === field?.LabelId)
                    ?.displayName ?? '-'}
                </span>
                <span className="dv-plant-detail__body-table__body-column-cell">
                  {aggregationTypeNames[
                    field?.AggregationType as 0 | 1 | 2 | 3
                  ] ?? '-'}
                </span>

                <span className="dv-plant-detail__body-table__body-column-cell">
                  {field?.Serial
                    ? seriesOptionsName[field?.Serial as 'bar' | 'line' | 'dot']
                    : '-'}
                </span>

                <span className="dv-plant-detail__body-table__body-column-cell">
                  <RegisterInput
                    type={'color'}
                    name={`${index}-color`}
                    disabled
                    value={field?.Color}
                    // error={errors?.name?.message}
                    register={register}
                  />
                </span>

                <span className="dv-plant-detail__body-table__body-column-cell">
                  {field?.YAxis ?? ''}
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
            );
          })}
      </div>
    </TableBox>
  );
};

const MeasurementData = memo(MemoMeasurementData);

export default MeasurementData;
