import { ConsumingSvg } from '@/assets/icons/tape-measurement-svg copy';
import { RegisterInput } from '@/components/ui/input/register-input/Input';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import {
  seriesOptions,
  seriesOptionsName,
} from '@/enum-data/organization-trace/org-trace-enums';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { fetchDefinitionsTimePeriodLookup } from '@/services/definitions/multi-conditional-status/multi-conditional-status-api';
import { consInformationDetailValidation } from '@/validations/organization-trace/device-trend-analysis';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { CirclePlus, Trash2 } from 'lucide-react';
import { memo, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import DeviceAndLabelBox from './device-and-label-box';
import TableBox from './table-box';

const MemoConsumptionCounter = ({
  control,
  label,
  allLabels,
  devices,
}: {
  control: any;
  label?: string;
  allLabels: any;
  devices: any;
}) => {
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // local form for adding one detail row
  const {
    handleSubmit,
    register,
    setValue,
    control: detailControl,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(consInformationDetailValidation),
    defaultValues: {
      DeviceId: '',
      LabelId: '',
      TimePeriodId: '',
      Serial: '',
      Color: '',
      YAxis: '',
      Description: '',
    },
  });
  // field array for added rows
  const { fields, append, remove } = useFieldArray<{
    consInformationFields: any[];
  }>({
    control,
    name: 'consInformationFields',
  });

  // add row handler
  const handleAddDetail = (data: any) => {
    append({
      TimePeriodId: data.TimePeriodId,
      DeviceId: data.DeviceId,
      LabelId: data.LabelId,
      Serial: data.Serial,
      Color: data.Color,
      YAxis: data.YAxis,
      Description: data.Description,
    });
    reset({ Description: '' }); // reset description after add
  };

  const detailFields = [
    getTranslatedValue('Device'),
    getTranslatedValue('Label'),
    getTranslatedValue('Period'),
    getTranslatedValue('em_graphic_serie_type'),
    getTranslatedValue('em_graphic_serie_color'),
    getTranslatedValue('em_y_axis_nr'),
    getTranslatedValue('firm_description'),
    getTranslatedValue('Actions'),
  ];

  // fetch periods for dropdown
  const { data, isLoading } = useQuery({
    queryKey: ['Time Period Lookup'],
    queryFn: () => fetchDefinitionsTimePeriodLookup(),
    retry: false,
  });
  const TimePeriodId = useWatch({
    control: detailControl,
    name: 'TimePeriodId',
  });

  return (
    <TableBox
      remove={remove}
      setDeleteIndex={setDeleteIndex}
      deleteIndex={deleteIndex}
      icon={<ConsumingSvg />}
      label={label}
      control={control}
    >
      {/* Table header */}
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
        <DeviceAndLabelBox
          detailControl={detailControl}
          setValue={setValue}
          errors={errors}
        />

        <div className="dv-plant-detail__body-table__body-column-cell">
          <SearchableDropdown
            name="TimePeriodId"
            searchParameterLabel={'title'}
            isLoading={isLoading}
            options={data?.items?.map((item: any) => ({
              value: item.id,
              title: item.displayName,
            }))}
            selectedVal={
              TimePeriodId
                ? data?.items?.find((item: any) => item.id == TimePeriodId)
                  ?.displayName
                : null
            }
            placeholder={getTranslatedValue('Search')}
            handleChange={(selectedValue: any) =>
              setValue('TimePeriodId', selectedValue)
            }
            error={errors?.TimePeriodId?.message as any}
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
            register={register}
            control={detailControl}
            error={errors?.YAxis?.message as any}
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

      {/* Render added rows */}
      <div className="dv-plant-detail__body-table__body">
        {fields?.length > 0 &&
          fields.map((field, index) => (
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
                {field?.LabelId
                  ? allLabels?.find((item: any) => item.id === field?.LabelId)
                    ?.displayName
                  : '-'}
              </span>
              <span className="dv-plant-detail__body-table__body-column-cell">
                {data?.items?.find(
                  (item: any) => item?.id === field?.TimePeriodId,
                )?.displayName ?? '-'}
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
          ))}
      </div>
    </TableBox>
  );
};

const ConsumptionCounter = memo(MemoConsumptionCounter);

export default ConsumptionCounter;
