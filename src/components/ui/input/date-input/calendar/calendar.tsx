import turkish from '@/components/ui/input/date-input/turkish';
import { formatToCustomISO } from '@/helpers/bys/get-today-date';
import { getCookie } from '@/helpers/cookies';
import { jalaliToGregorian } from '@/helpers/format-data';
import { useEffect, useRef, useState } from 'react';
import gregorian from 'react-date-object/calendars/gregorian';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Calendar, DateObject } from 'react-multi-date-picker';

type FormatOption = 'Daily' | 'Monthly' | 'Yearly';

const CalendarPicker = ({
  periodType = '',
  label,
  minDate = new Date('1900-01-01'),
  value,
  name,
  onChange,
  hasAllOption = true,
  hasMax = false,
  range = false,
  openAsDefaultWithoutInput = false, // <--- NEW PROP
  formatOption,
}: {
  periodType?: string;
  label?: string;
  minDate?: Date;
  value?: Date | string | DateObject | null;
  name?: string;
  onChange: (e: any) => void;
  hasAllOption?: boolean;
  hasMax?: boolean;
  range?: boolean;
  openAsDefaultWithoutInput?: boolean; // <--- NEW PROP
  formatOption: FormatOption; // passed from parent
}) => {
  const datePickerRef = useRef<any>(null); // Ref for DatePicker
  const CultureName = getCookie('CultureName') ?? import.meta.env.VITE_CULTURE_NAME as string;
  const periodTypeDataValue = hasAllOption
    ? parseInt(periodType)
    : parseInt(periodType) + 1;

  // Internal state to control the selected date and prevent multiple selections
  const [internalValue, setInternalValue] = useState<Date | undefined>(() => {
    if (!value) return undefined;

    if (typeof value === 'string') {
      if (value.includes('T')) {
        if (periodTypeDataValue === 1) {
          return new Date(new Date(value).setMinutes(0));
        }
        return new Date(value);
      }
      return new Date(value);
    }

    if (value instanceof Date) {
      return value;
    }

    if (value instanceof DateObject) {
      return value.toDate();
    }

    return undefined;
  });

  // Sync internal value with prop value
  useEffect(() => {
    if (!value) {
      setInternalValue(undefined);
      return;
    }

    let newValue: Date | undefined;

    if (typeof value === 'string') {
      if (value.includes('T')) {
        if (periodTypeDataValue === 1) {
          newValue = new Date(new Date(value).setMinutes(0));
        } else {
          newValue = new Date(value);
        }
      } else {
        newValue = new Date(value);
      }
    } else if (value instanceof Date) {
      newValue = value;
    } else if (value instanceof DateObject) {
      newValue = value.toDate();
    }

    // Only update if value actually changed
    if (newValue) {
      setInternalValue(prevValue => {
        if (prevValue && prevValue.getTime() === newValue!.getTime()) {
          return prevValue;
        }
        return newValue;
      });
    }
  }, [value, periodTypeDataValue]);

  useEffect(() => {
    if (openAsDefaultWithoutInput && datePickerRef.current) {
      datePickerRef.current.openCalendar();
    }
  }, [openAsDefaultWithoutInput]);

  // Force Calendar to update when internalValue changes
  useEffect(() => {
    if (datePickerRef.current && internalValue !== undefined) {
      // Use setTimeout to ensure Calendar has rendered
      setTimeout(() => {
        if (datePickerRef.current) {
          datePickerRef.current.setValue(internalValue);
        }
      }, 0);
    }
  }, [internalValue]);

  return (
    <div className="date-input">
      {label && !openAsDefaultWithoutInput && (
        <label htmlFor={name} className="date-input__label">
          {label}
        </label>
      )}
      <Calendar
        ref={datePickerRef}
        className="calender"
        calendar={CultureName === "fa" ? persian : gregorian}
        locale={CultureName === "tr" ? turkish : CultureName === "fa" ? persian_fa : undefined}
        minDate={minDate}
        maxDate={hasMax ? new Date() : undefined}
        value={internalValue}
        onChange={(dateObj) => {
          // Force single selection - if array, take only the last item and immediately update
          let selectedDateObj: DateObject | null = null;

          if (Array.isArray(dateObj)) {
            // If array, take only the last selected date and clear the rest
            if (dateObj.length > 0) {
              const lastSelected = dateObj[dateObj.length - 1];
              if (lastSelected instanceof DateObject) {
                selectedDateObj = lastSelected;
              }
            } else {
              // Empty array means no selection
              setInternalValue(undefined);
              onChange(null);
              return;
            }
          } else if (dateObj instanceof DateObject) {
            selectedDateObj = dateObj;
          }

          if (!selectedDateObj) return;

          let date = selectedDateObj.toDate();

          if (formatOption === "Yearly") {
            // For Persian calendar, get the first day of the Persian year in Gregorian
            if (CultureName === "fa") {
              const selectedYear = selectedDateObj.year;
              // Convert first day of Persian year (Farvardin 1st) to Gregorian
              const gregorianDate = jalaliToGregorian(selectedYear, 1, 1);
              date = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd);
            } else {
              // For Gregorian calendar, set to first day of first month (January 1st)
              date.setMonth(0);
              date.setDate(1);
            }
            date.setHours(0, 0, 0, 0);
          } else if (formatOption === "Monthly") {
            // Monthly: get the first day of the selected Persian month in Gregorian
            if (CultureName === "fa") {
              const selectedYear = selectedDateObj.year;
              // Get month number - handle both number and object formats
              const selectedMonth = typeof selectedDateObj.month === 'number'
                ? selectedDateObj.month
                : (selectedDateObj.month?.index !== undefined
                  ? selectedDateObj.month.index + 1
                  : selectedDateObj.month?.number || 1);

              // Convert first day of selected Persian month to Gregorian
              const gregorianDate = jalaliToGregorian(selectedYear, selectedMonth, 1);
              date = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd);
            } else {
              // For Gregorian calendar, set to first day of the selected month
              date.setDate(1);
            }
            date.setHours(0, 0, 0, 0);
          } else if (formatOption === "Daily") {
            // Daily: set time to 00:00:00
            date.setHours(0, 0, 0, 0);
          }

          // Immediately update internal value to prevent multiple selections
          setInternalValue(date);

          // Force Calendar to update its internal state by setting value directly
          if (datePickerRef.current) {
            setTimeout(() => {
              if (datePickerRef.current) {
                datePickerRef.current.setValue(date);
              }
            }, 0);
          }

          const formatted = formatToCustomISO(date);
          onChange(formatted);
        }}
        range={range}
        multiple={false}
        shadow={false}
        format={
          formatOption === 'Daily'
            ? 'YYYY-MM-DD'
            : formatOption === 'Monthly'
              ? 'YYYY-MM'
              : 'YYYY'
        }
        {...(formatOption === 'Monthly'
          ? { onlyMonthPicker: true }
          : formatOption === 'Yearly'
            ? { onlyYearPicker: true }
            : {})}
      />
    </div>
  );
};

export default CalendarPicker;
