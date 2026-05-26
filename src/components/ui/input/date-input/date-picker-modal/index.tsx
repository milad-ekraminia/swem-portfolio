import { Button } from '@/components/ui/button/button';
import {
  datePickerFormatOptions,
  datePickerShortCutLists,
} from '@/enum-data/organization-trace/org-trace-index';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useState } from 'react';
import { DateObject } from 'react-multi-date-picker';
import SelectInput from '../../select-input/select-input';
import CalendarPicker from '../calendar/calendar';

export const DatePickerModal = ({
  value,
  onChange,
  selectedFormat,
  setSelectedFormat,
  confirmModalHandler,
  cancelModalHandler,
}: {
  value?: DateObject;
  onChange: (e: any) => void;
  selectedFormat: any;
  setSelectedFormat: any;
  confirmModalHandler: (date: DateObject) => void;
  cancelModalHandler: () => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(
    value ?? null,
  );

  const handleShortcutClick = (shortcut: string) => {
    const today = new DateObject();
    let newDate: DateObject | DateObject[];
    let newFormat: 'Daily' | 'Monthly' | 'Yearly' = 'Daily';

    switch (shortcut) {
      case 'today':
        newDate = today;
        break;
      case 'yesterday':
        newDate = today.subtract(1, 'day');
        break;
      case 'this month':
        newDate = today.set('day', today.day); // explicitly include today's day
        newFormat = 'Monthly';
        break;
      case 'this year':
        newDate = today.set('month', today.month).set('day', today.day);
        newFormat = 'Yearly';
        break;
      default:
        newDate = today;
    }

    setSelectedFormat(newFormat); // Update the calendar format
    setSelectedDate(newDate); // Update the date value
    onChange(newDate);
  };

  return (
    <div className="date-picker-modal">
      <div className="date-picker-modal__shortcuts">
        <span className="date-picker-modal__shortcuts-title">
          {getTranslatedValue('Shortcuts')}
        </span>
        <ul className="date-picker-modal__shortcuts-list">
          {datePickerShortCutLists.map((item) => (
            <li
              key={item.value}
              className="date-picker-modal__shortcuts-list-item"
            >
              <button onClick={() => handleShortcutClick(item.value)}>
                {item.displayName}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="date-picker-modal__datePicker">
        <div className="select">
          <SelectInput
            name="date-picker-modal__format"
            options={datePickerFormatOptions()}
            value={selectedFormat}
            onChange={setSelectedFormat}
          />
        </div>

        <div className="date-picker">
          <CalendarPicker
            formatOption={selectedFormat}
            onChange={(dateObj) => {
              setSelectedDate(dateObj);
              console.log("dateObj", dateObj)
              onChange(dateObj);
            }}
            value={selectedDate}
            hasMax={true}
          />
        </div>

        <div className="actions">
          <Button variant="secondary" onClick={cancelModalHandler}>
            {getTranslatedValue('cancel')}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              confirmModalHandler(selectedDate as DateObject);
            }}
          >
            {getTranslatedValue('Apply')}
          </Button>
        </div>
      </div>
    </div>
  );
};
