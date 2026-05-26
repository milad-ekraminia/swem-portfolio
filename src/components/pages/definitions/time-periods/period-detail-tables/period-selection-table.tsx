import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import {
  dayOfWeekOptions,
  monthTypeOptions,
} from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import {
  TimePeriodDetail,
  TimePeriodFormData,
} from '@/types/pages/definitions/time-periods';
import { timePeriodDetailValidation } from '@/validations/definitions/time-periods';
import { yupResolver } from '@hookform/resolvers/yup';
import { PlusCircle } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Control, useFieldArray, useForm, useWatch } from 'react-hook-form';

interface Props {
  control: Control<TimePeriodFormData>;
}
export default function PeriodSelectionTable({ control }: Props) {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
    control: detailControl,
  } = useForm<TimePeriodDetail>({
    resolver: yupResolver(timePeriodDetailValidation) as any,
    defaultValues: {},
  });

  const { append } = useFieldArray<{
    timePeriodDetails: TimePeriodDetail[];
  }>({
    control: control as any,
    name: 'timePeriodDetails',
  });

  const timePeriodType = Number(
    useWatch({
      control,
      name: 'timePeriodType',
    }),
  );

  const todayValueHelper = () => {
    const today = new Date();
    return {
      dayOfWeek: today.getDay(),
      startDateDay: today.getDate(),
      startDateMonth: today.getMonth() + 1,
      startDateYear: today.getFullYear(),
      startDateHour: today.getHours(),
      startDateMinute: today.getMinutes(),
      endDateDay: today.getDate(),
      endDateMonth: today.getMonth() + 1,
      endDateYear: today.getFullYear(),
      endDateHour: today.getHours(),
      endDateMinute: today.getMinutes(),
    };
  };

  useEffect(() => {
    reset(todayValueHelper());
  }, [reset, timePeriodType]);

  const handleAddDetail = (data: any) => {
    // فیلتر کردن داده‌ها براساس timePeriodType
    const newData = Object.keys(data).reduce((acc: any, key) => {
      if (data[key]) {
        // فقط داده‌هایی که با timePeriodType همخوانی دارند را اضافه می‌کنیم
        if (timePeriodType === 2) {
          if (key === 'dayOfWeek') {
            acc[key] = data[key];
          } else if (
            acc['dayOfWeek'] === null ||
            acc['dayOfWeek'] === undefined
          ) {
            const today = new Date();
            acc['dayOfWeek'] = today.getDay();
          }
        } else if (
          timePeriodType === 3 &&
          (key === 'startDateDay' || key === 'endDateDay')
        ) {
          acc[key] = data[key];
        } else if (
          timePeriodType === 4 &&
          (key === 'startDateMonth' ||
            key === 'endDateMonth' ||
            key === 'startDateDay' ||
            key === 'endDateDay')
        ) {
          acc[key] = data[key];
        } else if (
          timePeriodType === 5 &&
          (key === 'startDateMonth' ||
            key === 'endDateMonth' ||
            key === 'startDateDay' ||
            key === 'endDateDay' ||
            key === 'startDateYear' ||
            key === 'endDateYear' ||
            key === 'startDateHour' ||
            key === 'endDateHour' ||
            key === 'startDateMinute' ||
            key === 'endDateMinute')
        ) {
          acc[key] = data[key];
        }
      }
      return acc;
    }, {});

    // اضافه کردن startDateHour و endDateHour به همه داده‌ها
    if (data.startDateHour !== undefined) {
      newData.startDateHour = data.startDateHour;
    }
    if (data.endDateHour !== undefined) {
      newData.endDateHour = data.endDateHour;
    }
    if (timePeriodType === 5) {
      if (data.startDateMinute !== undefined) {
        newData.startDateMinute = data.startDateMinute;
      }
      if (data.endDateMinute !== undefined) {
        newData.endDateMinute = data.endDateMinute;
      }
    }

    // فقط داده‌های فیلتر شده را به لیست اضافه می‌کنیم
    if (Object.keys(newData).length > 0) {
      append(newData);
    }
    reset(todayValueHelper);
  };

  const dayOptions = useMemo(
    () =>
      Array.from({ length: 31 }, (_, i) => ({
        value: i + 1,
        title: (i + 1).toString(),
      })),
    [],
  );
  const yearOptions = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        value: new Date().getFullYear() - 3 + i,
        title: (new Date().getFullYear() - 3 + i).toString(),
      })),
    [],
  );
  const hourOptions = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({ value: i, title: i.toString() })),
    [],
  );
  const minuteOptions = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({ value: i, title: i.toString() })),
    [],
  );
  return (
    <>
      {timePeriodType === 2 && (
        <RegisterSelectInput
          name="dayOfWeek"
          options={dayOfWeekOptions}
          label={getTranslatedValue('DayOfWeek')}
          placeholder={getTranslatedValue('DayOfWeek')}
          control={detailControl}
          error={errors?.dayOfWeek?.message}
          register={register}
        />
      )}
      <div className="time-selection-table">
        <div className="time-selection-table__header">
          <div className="time-selection-table__header-title"></div>
          <div className="time-selection-table__header-column">
            {getTranslatedValue('Day')}
          </div>
          <div className="time-selection-table__header-column">
            {getTranslatedValue('Month')}
          </div>
          <div className="time-selection-table__header-column">
            {getTranslatedValue('Year')}
          </div>
          <div className="time-selection-table__header-column">
            {getTranslatedValue('Hour')}
          </div>
          <div className="time-selection-table__header-column">
            {getTranslatedValue('Minute')}
          </div>
          <div className="time-selection-table__header-add-column-header"></div>
        </div>
        <div className="time-selection-table__body-wrapper">
          <div className="time-selection-table__body">
            <div className="time-selection-table__body-row">
              <div className="time-selection-table__body-row-title">
                {getTranslatedValue('StartDate')}
              </div>
              <div className="time-selection-table__body-row-column">
                {timePeriodType >= 3 && (
                  <RegisterSelectInput
                    name="startDateDay"
                    options={dayOptions}
                    isLoading={false}
                    register={register}
                    control={detailControl}
                  />
                )}
              </div>
              <div className="time-selection-table__body-row-column">
                {' '}
                {timePeriodType >= 4 && (
                  <RegisterSelectInput
                    name="startDateMonth"
                    options={monthTypeOptions}
                    isLoading={false}
                    register={register}
                    control={detailControl}
                  />
                )}
              </div>
              <div className="time-selection-table__body-row-column">
                {timePeriodType === 5 && (
                  <RegisterSelectInput
                    name="startDateYear"
                    options={yearOptions}
                    isLoading={false}
                    register={register}
                    control={detailControl}
                  />
                )}
              </div>
              <div className="time-selection-table__body-row-column">
                <RegisterSelectInput
                  name="startDateHour"
                  options={hourOptions}
                  isLoading={false}
                  register={register}
                  control={detailControl}
                />
              </div>
              <div className="time-selection-table__body-row-column">
                {timePeriodType === 5 && (
                  <RegisterSelectInput
                    name="startDateMinute"
                    options={minuteOptions}
                    isLoading={false}
                    register={register}
                    control={detailControl}
                  />
                )}
              </div>
            </div>
            <div className="time-selection-table__body-row">
              <div className="time-selection-table__body-row-title">
                {getTranslatedValue('EndDate')}
              </div>
              <div className="time-selection-table__body-row-column">
                {timePeriodType >= 3 && (
                  <RegisterSelectInput
                    name="endDateDay"
                    options={dayOptions}
                    isLoading={false}
                    register={register}
                    control={detailControl}
                  />
                )}
              </div>
              <div className="time-selection-table__body-row-column">
                {' '}
                {timePeriodType >= 4 && (
                  <RegisterSelectInput
                    name="endDateMonth"
                    options={monthTypeOptions}
                    isLoading={false}
                    register={register}
                    control={detailControl}
                  />
                )}
              </div>
              <div className="time-selection-table__body-row-column">
                {timePeriodType === 5 && (
                  <RegisterSelectInput
                    name="endDateYear"
                    options={yearOptions}
                    isLoading={false}
                    register={register}
                    control={detailControl}
                  />
                )}
              </div>
              <div className="time-selection-table__body-row-column">
                <RegisterSelectInput
                  name="endDateHour"
                  options={hourOptions}
                  isLoading={false}
                  register={register}
                  control={detailControl}
                />
              </div>
              <div className="time-selection-table__body-row-column">
                {timePeriodType === 5 && (
                  <RegisterSelectInput
                    name="endDateMinute"
                    options={minuteOptions}
                    isLoading={false}
                    register={register}
                    control={detailControl}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="time-selection-table__body-wrapper-add-button">
            <PlusCircle
              onClick={handleSubmit(handleAddDetail)}
              stroke="#2E90FA"
            />
          </div>
        </div>
      </div>
    </>
  );
}
