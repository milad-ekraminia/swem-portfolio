import { CalendarSvg } from '@/assets/icons/calendar-svg';
import { ClockSvg } from '@/assets/icons/clock-svg';
import turkish from '@/components/ui/input/date-input/turkish';
import { formatToCustomISO } from '@/helpers/bys/get-today-date';
import { getCookie } from '@/helpers/cookies';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useEffect, useRef } from 'react';
import gregorian from 'react-date-object/calendars/gregorian';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';

const DateInput = ({
  periodType = '2',
  dateFormat,
  label,
  minDate = new Date('1900-01-01'),
  maxDate,
  value,
  name,
  onChange,
  hasAllOption = true,
  hasMax = false,
  disableDayPicker = false,
  hasTime = false,
  placeHolder = getTranslatedValue('SelectDate'),
  onlyMonthPicker,
  onlyYearPicker,
  range = false,
  calendarPosition,
  openAsDefaultWithoutInput = false, // <--- NEW PROP
  customIcon, // Custom icon prop
  disabled,
  error,
  required,
}: {
  periodType?: string;
  dateFormat?: string;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  value?: Date | string | DateObject;
  name?: string;
  onChange: (e: any) => void;
  hasAllOption?: boolean;
  hasMax?: boolean;
  disableDayPicker?: boolean;
  hasTime?: boolean;
  onlyMonthPicker?: boolean;
  onlyYearPicker?: boolean;
  range?: boolean;
  placeHolder?: string;
  calendarPosition?: string;
  openAsDefaultWithoutInput?: boolean; // <--- NEW PROP
  customIcon?: React.ReactNode; // Custom icon prop
  disabled?: boolean;
  error?: string;
  required?: boolean;
}) => {
  const datePickerRef = useRef<any>(null); // Ref for DatePicker
  const CultureName = getCookie('CultureName') ?? import.meta.env.VITE_CULTURE_NAME as string;

  const periodTypeDataValue = hasAllOption
    ? parseInt(periodType)
    : parseInt(periodType) + 1;

  const getDateValue = () => {
    if (!value) return value;

    if (Array.isArray(value)) {
      return value.map((v) => {
        if (typeof v === 'string' && v.includes('T')) {
          if (periodTypeDataValue === 1) {
            return new Date(new Date(v).setMinutes(0));
          }
          return new Date(v);
        }
        return v;
      });
    }

    if (typeof value === 'string' && value.includes('T')) {
      if (periodTypeDataValue === 1) {
        return new Date(new Date(value).setMinutes(0));
      }
      return new Date(value);
    }

    return value;
  };

  // const effectiveFormat = disableDayPicker ? "HH:mm" : dateFormat;
  useEffect(() => {
    if (openAsDefaultWithoutInput && datePickerRef.current) {
      datePickerRef.current.openCalendar();
    }
  }, [openAsDefaultWithoutInput]);

  return (
    <div className="date-input">
      {label && !openAsDefaultWithoutInput && (
        <label htmlFor={name} className="date-input__label">
          {label}
          {required && <span className="requiredStar">&nbsp;*</span>}
        </label>
      )}
      <DatePicker
        className="test"
        calendar={CultureName === "fa" ? persian : gregorian}
        locale={CultureName === "tr" ? turkish : CultureName === "fa" ? persian_fa : undefined}
        onlyMonthPicker={onlyMonthPicker || periodTypeDataValue === 3}
        disableDayPicker={disableDayPicker}
        onlyYearPicker={onlyYearPicker}
        minDate={minDate}
        maxDate={hasMax ? maxDate ?? new Date() : undefined}
        value={getDateValue()}
        onChange={(dateObjs) => {
          if (Array.isArray(dateObjs)) {
            const formattedDates = dateObjs
              .filter((d) => d instanceof DateObject)
              .map((dateObj) => {
                const date = dateObj.toDate();

                if (periodTypeDataValue === 3) {
                  // date.setDate(1);
                  date.setHours(0, 0, 0, 0);
                } else if (periodTypeDataValue === 2) {
                  date.setHours(0, 0, 0, 0);
                }

                return formatToCustomISO(date);
              });

            onChange(formattedDates);
          } else if (dateObjs instanceof DateObject) {
            const date = dateObjs.toDate();

            if (periodTypeDataValue === 3) {
              // Monthly: set to first day of the month, 00:00:00
              // date.setDate(1);
              date.setHours(0, 0, 0, 0);
            } else if (periodTypeDataValue === 2) {
              // Daily: set time to 00:00:00
              date.setHours(0, 0, 0, 0);
            }

            const formatted = formatToCustomISO(date);
            onChange(formatted);
          }
        }}
        format={dateFormat}
        range={range}
        calendarPosition={calendarPosition}
        plugins={
          !onlyMonthPicker && !onlyYearPicker && (disableDayPicker || hasTime)
            ? [
              <TimePicker
                key={'timePicker'}
                position="bottom"
                hideSeconds
                mStep={5}
              />,
            ]
            : []
        }
        render={
          !openAsDefaultWithoutInput
            ? (value, openCalendar) => (
              <div className="custom-date-input">
                {!customIcon &&
                  (disableDayPicker ? <ClockSvg /> : <CalendarSvg />)}
                {customIcon ?? null}
                <input
                  className={`${error ? 'error' : ''}`}
                  placeholder={placeHolder}
                  onClick={openCalendar}
                  defaultValue={value}
                  disabled={disabled}
                />
              </div>
            )
            : undefined
        }
      />
      {error && <p className="select-input__error">{error}</p>}
    </div>
  );
};

export default DateInput;
