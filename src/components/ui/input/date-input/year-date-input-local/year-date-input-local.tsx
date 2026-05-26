import { ChevronLeftSvg } from '@/assets/icons/chevron-left-svg';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getCookie } from '@/helpers/cookies';
import { memo, useEffect, useState } from 'react';
import { DateObject } from 'react-multi-date-picker';
import DateInput from '../date-input';
import { DatePickerModal } from '../date-picker-modal';

interface YearDateInputLocalProps {
  type: 'month' | 'year' | 'normal';
  value?: DateObject;
  onChange?: (date: DateObject) => void;
  showDatePickerModal?: boolean;
}

const YearDateInputLocal = ({
  type,
  value,
  onChange,
  showDatePickerModal = true,
}: YearDateInputLocalProps) => {
  const [date, setDate] = useState<DateObject>(value ?? new DateObject());
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<
    'Daily' | 'Monthly' | 'Yearly'
  >('Daily');

  // Sync external value with internal state
  useEffect(() => {
    if (value) setDate(value);
  }, [value]);

  const months = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];

  function update(key: 'year' | 'month' | 'day', amount: number) {
    const newDate = new DateObject(date).add(amount, key);
    setDate(newDate);
    onChange?.(newDate); // notify parent
  }

  const cancelModalHandler = () => {
    setShowDateModal(false);
  };

  const confirmModalHandler = (newDate: DateObject) => {
    setDate(newDate);
    onChange?.(newDate);
    setShowDateModal(false);
  };

  const CultureName = getCookie('CultureName') ?? import.meta.env.VITE_CULTURE_NAME as string;

  return (
    <>
      {type === 'year' && (
        <div className="year-date-input">
          <button onClick={() => update('year', -1)}>
            <ChevronLeftSvg />
          </button>
          <span className="year-date-input-main">
            <span>{date.year}</span>
            <DateInput
              value={date}
              onlyYearPicker
              onChange={(d) => {
                setDate(d);
                onChange?.(d);
              }}
              calendarPosition="bottom-center"
            />
          </span>
          <button className="right-arrow" onClick={() => update('year', 1)}>
            <ChevronLeftSvg />
          </button>
        </div>
      )}

      {type === 'month' && (
        <div className="year-date-input">
          <button onClick={() => update('month', -1)}>
            <ChevronLeftSvg />
          </button>
          <span className="year-date-input-main">
            <span>
              <span>{months[date.month.number - 1]}</span>
              <span>{date.year}</span>
            </span>
            <DateInput
              value={date}
              onlyMonthPicker
              onChange={(d) => {
                setDate(d);
                onChange?.(d);
              }}
              calendarPosition="bottom-center"
            />
          </span>
          <button className="right-arrow" onClick={() => update('month', 1)}>
            <ChevronLeftSvg />
          </button>
        </div>
      )}

      {type === 'normal' && (
        <div className="year-date-input">
          {selectedFormat === 'Daily' && (
            <>
              <button onClick={() => update('day', -1)}>
                <ChevronLeftSvg />
              </button>
              <span
                className="year-date-input-main"
                onClick={() => setShowDateModal(true)}
              >
                <span>
                  {CultureName === 'tr' ? (
                    <>
                      {date.day.toString().padStart(2, '0')}.
                      {date.month?.number.toString().padStart(2, '0')}.
                      {date.year}
                    </>
                  ) : (
                    <>
                      {date.month?.number.toString().padStart(2, '0')}-
                      {date.day.toString().padStart(2, '0')}-{date.year}
                    </>
                  )}
                </span>
                {!showDatePickerModal && (
                  <DateInput
                    value={date}
                    onChange={(d) => {
                      setDate(d);
                      onChange?.(d);
                    }}
                  />
                )}
              </span>
              <button className="right-arrow" onClick={() => update('day', 1)}>
                <ChevronLeftSvg />
              </button>
            </>
          )}

          {selectedFormat === 'Monthly' && (
            <>
              <button onClick={() => update('month', -1)}>
                <ChevronLeftSvg />
              </button>
              <span
                className="year-date-input-main"
                onClick={() => setShowDateModal(true)}
              >
                <span>
                  {date.month?.number.toString().padStart(2, '0')}-{date.year}
                </span>
                {!showDatePickerModal && (
                  <DateInput
                    value={date}
                    onChange={(d) => {
                      setDate(d);
                      onChange?.(d);
                    }}
                  />
                )}
              </span>
              <button
                className="right-arrow"
                onClick={() => update('month', 1)}
              >
                <ChevronLeftSvg />
              </button>
            </>
          )}

          {selectedFormat === 'Yearly' && (
            <>
              <button onClick={() => update('year', -1)}>
                <ChevronLeftSvg />
              </button>
              <span
                className="year-date-input-main"
                onClick={() => setShowDateModal(true)}
              >
                <span>{date.year}</span>
                {!showDatePickerModal && (
                  <DateInput
                    value={date}
                    onChange={(d) => {
                      setDate(d);
                      onChange?.(d);
                    }}
                  />
                )}
              </span>
              <button className="right-arrow" onClick={() => update('year', 1)}>
                <ChevronLeftSvg />
              </button>
            </>
          )}
        </div>
      )}

      <Modal
        showCloseButton={false}
        isOpen={showDateModal}
        onClose={cancelModalHandler}
      >
        <DatePickerModal
          confirmModalHandler={confirmModalHandler}
          cancelModalHandler={cancelModalHandler}
          value={date}
          onChange={(d) => {
            setDate(d);
            onChange?.(d);
          }}
          setSelectedFormat={setSelectedFormat}
          selectedFormat={selectedFormat}
        />
      </Modal>
    </>
  );
};

export default memo(YearDateInputLocal);
