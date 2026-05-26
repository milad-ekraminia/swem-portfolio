import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { dateFormatter } from '@/helpers/format-data';
import { handleChangeDateFilter } from '@/store/features/date-filter-slice';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memo, useState } from 'react';
import { DateObject } from 'react-multi-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import DateInput from '../date-input';
import { DatePickerModal } from '../date-picker-modal';

interface YearDateInputProps {
  type: 'month' | 'year' | 'normal';
  showDatePickerModal?: boolean;
}

const YearDateInput = ({
  type,
  showDatePickerModal = true,
}: YearDateInputProps) => {
  const dispatch = useDispatch();
  const { inserted_date, period_type } = useSelector(
    (state: any) => state.dateFilter.info,
  );
  const parsedDate = new DateObject(inserted_date);

  const [date, setDate] = useState(parsedDate);
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<
    'Daily' | 'Monthly' | 'Yearly'
  >(period_type);

  function update(key: 'year' | 'month' | 'day', value: number) {
    const newDate = new DateObject(date).add(value, key);
    // check if newDate equal of more than today not set value
    const today = new DateObject();

    if (newDate.format('YYYY-MM-DD') > today.format('YYYY-MM-DD')) {
      return; // Don't update if newDate is after today
    }

    setDate(newDate);
    dispatch(
      handleChangeDateFilter({
        period_type: selectedFormat,
        inserted_date: newDate.format('YYYY-MM-DD'),
      }),
    );
  }

  const cancelModalHandler = () => {
    setDate(parsedDate);
    setShowDateModal(false);
  };

  const confirmModalHandler = (newDate: DateObject) => {
    setDate(newDate);
    dispatch(
      handleChangeDateFilter({
        period_type: selectedFormat,
        inserted_date: newDate,
      }),
    );
    setShowDateModal(false);
  };

  return (
    <>
      {type === 'year' && (
        <div className="year-date-input">
          <button
            onClick={() => update('year', -1)}>
            <ChevronLeft
              size={20}
            />
          </button>
          <span className="year-date-input-main">
            {dateFormatter(parsedDate.format('YYYY-MM-DD'), false, false, false, 'YYYY')}
            {!showDatePickerModal && (
              <DateInput
                value={date}
                onlyMonthPicker
                onChange={(date) => setDate(date)}
                calendarPosition="bottom-center"
              />
            )}
          </span>
          <button onClick={() => update('year', 1)}>
            <ChevronRight
              size={20}
            />
          </button>
        </div>
      )}

      {type === 'month' && (
        <div className="year-date-input">
          <button
            onClick={() => update('month', -1)}>
            <ChevronLeft
              size={20}
            />
          </button>
          <span className="year-date-input-main">
            {dateFormatter(parsedDate.format('YYYY-MM-DD'), false, false, false, 'YYYY-MM')}
            {!showDatePickerModal && (
              <DateInput
                value={date}
                onlyMonthPicker
                onChange={(date) => setDate(date)}
                calendarPosition="bottom-center"
              />
            )}
          </span>
          <button

            onClick={() => update('month', 1)}>
            <ChevronRight
              size={20}
            />
          </button>
        </div>
      )}

      {type === 'normal' && (
        <div className="year-date-input">
          {period_type === 'Daily' && (
            <>
              <button
                onClick={() => update('day', -1)}>
                <ChevronLeft
                  size={20}
                />
              </button>
              <span
                className="year-date-input-main"
                onClick={() => setShowDateModal(true)}
              >
                <span>
                  {/* {parsedDate.month?.number.toString().padStart(2, '0')}-
                      {parsedDate.day.toString().padStart(2, '0')}- */}
                  {dateFormatter(parsedDate.format('YYYY-MM-DD'), false, false, false)}
                </span>
                {!showDatePickerModal && (
                  <DateInput
                    value={date}
                    onChange={(date) => setDate(date)}
                    hasMax={true}
                    maxDate={new Date()}
                  />
                )}
              </span>
              <button

                onClick={() => update('day', 1)}>
                <ChevronRight
                  size={20}
                />
              </button>
            </>
          )}

          {period_type === 'Monthly' && (
            <>
              <button

                onClick={() => update('month', -1)}>
                <ChevronLeft
                  size={20}
                />
              </button>
              <span
                className="year-date-input-main"
                onClick={() => setShowDateModal(true)}
              >
                {dateFormatter(parsedDate.format('YYYY-MM-DD'), false, false, false, 'YYYY-MM')}
                {!showDatePickerModal && (
                  <DateInput value={date} onChange={(date) => setDate(date)} />
                )}
              </span>
              <button

                onClick={() => update('month', 1)}
              >
                <ChevronRight
                  size={20}
                />
              </button>
            </>
          )}

          {period_type === 'Yearly' && (
            <>
              <button

                onClick={() => update('year', -1)}>
                <ChevronLeft
                  size={20}
                />
              </button>
              <span
                className="year-date-input-main"
                onClick={() => setShowDateModal(true)}
              >
                {dateFormatter(parsedDate.format('YYYY-MM-DD'), false, false, false, 'YYYY')}
                {!showDatePickerModal && (
                  <DateInput value={date} onChange={(date) => setDate(date)} />
                )}
              </span>
              <button

                onClick={() => update('year', 1)}>
                <ChevronRight
                  size={20}
                />
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
          onChange={(date) => setDate(date)}
          setSelectedFormat={setSelectedFormat}
          selectedFormat={selectedFormat}
        />
      </Modal>
    </>
  );
};

// Basic memoization
export default memo(YearDateInput);
