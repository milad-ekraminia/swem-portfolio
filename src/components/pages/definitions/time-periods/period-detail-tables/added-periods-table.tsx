import SureDeleteModalAction from '@/components/ui/action/sure-delete-modal-action';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { dayOfWeek, monthType } from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { TimePeriodDetail } from '@/types/pages/definitions/time-periods';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';

interface Props {
  timePeriods: TimePeriodDetail[];
  control: Control<any>;
}
export default function AddedPeriodsTable({ timePeriods, control }: Props) {
  const { remove } = useFieldArray<{
    timePeriodDetails: TimePeriodDetail[];
  }>({
    control,
    name: 'timePeriodDetails',
  });
  const [showDelete, setShowDelete] = useState<number | null>(null);
  const handleDeleteModal = (index: number | null) => {
    setShowDelete(index);
  };

  const valueHandler = (value?: string | number) => {
    if (Number(value) > -1) return value;
    return '-';
  };

  return (
    <div className="added-times-table">
      <div className="added-times-table__header-wrapper">
        <div className="added-times-table__header-body">
          <div className="added-times-table__header-body-group title">
            {getTranslatedValue('DayOfWeek')}
          </div>
          <div className="added-times-table__header-body-group start-date">
            {getTranslatedValue('StartDate')}
          </div>
          <div className="added-times-table__header-body-group start-date">
            {getTranslatedValue('EndDate')}
          </div>
          <div className="added-times-table__header-group action"></div>
        </div>
        <div className="added-times-table__header-body">
          <div className="added-times-table__header-body-group title">
            {getTranslatedValue('Day')}
          </div>
          <div className="added-times-table__header-body-groups">
            <div className="added-times-table__header-body-groups-group ">
              {getTranslatedValue('Day')}
            </div>
            <div className="added-times-table__header-body-groups-group ">
              {getTranslatedValue('Month')}
            </div>
            <div className="added-times-table__header-body-groups-group ">
              {getTranslatedValue('Year')}
            </div>
            <div className="added-times-table__header-body-groups-group ">
              {getTranslatedValue('Hour')}
            </div>
            <div className="added-times-table__header-body-groups-group ">
              {getTranslatedValue('Minute')}
            </div>
          </div>
          <div className="added-times-table__header-body-groups">
            <div className="added-times-table__header-body-groups-group ">
              {getTranslatedValue('Day')}
            </div>
            <div className="added-times-table__header-body-groups-group ">
              {getTranslatedValue('Month')}
            </div>
            <div className="added-times-table__header-body-groups-group ">
              {getTranslatedValue('Year')}
            </div>
            <div className="added-times-table__header-body-groups-group ">
              {getTranslatedValue('Hour')}
            </div>
            <div className="added-times-table__header-body-groups-group ">
              {getTranslatedValue('Minute')}
            </div>
          </div>
          <div className="added-times-table__header-body-group action">
            {getTranslatedValue('Actions')}
          </div>
        </div>
      </div>
      <div className="added-times-table__body-wrapper">
        <div className="added-times-table__body">
          {timePeriods.map((group, index) => (
            <div key={index} className="added-times-table__body-group">
              <div className="added-times-table__body-group-column title">
                {group?.dayOfWeek && group?.dayOfWeek >= 0
                  ? getTranslatedValue(
                    `Enum:DayOfWeek.${dayOfWeek[group?.dayOfWeek as keyof typeof dayOfWeek]
                    }`,
                  )
                  : '-'}
              </div>
              <div className="added-times-table__body-group-section">
                <div className="added-times-table__body-group-section-column">
                  {valueHandler(group?.startDateDay)}
                </div>
                <div className="added-times-table__body-group-section-column">
                  {group?.startDateMonth && group?.startDateMonth >= 0
                    ? getTranslatedValue(
                      `Enum:MonthType.${monthType[
                      group?.startDateMonth as keyof typeof monthType
                      ]
                      }`,
                    )
                    : '-'}
                </div>
                <div className="added-times-table__body-group-section-column">
                  {valueHandler(group?.startDateYear)}
                </div>
                <div className="added-times-table__body-group-section-column">
                  {valueHandler(group?.startDateHour)}
                </div>
                <div className="added-times-table__body-group-section-column">
                  {valueHandler(group?.startDateMinute)}
                </div>
              </div>
              <div className="added-times-table__body-group-section">
                <div className="added-times-table__body-group-section-column">
                  {valueHandler(group?.endDateDay)}
                </div>
                <div className="added-times-table__body-group-section-column">
                  {group?.endDateMonth && group?.endDateMonth >= 0
                    ? getTranslatedValue(
                      `Enum:MonthType.${monthType[
                      group?.endDateMonth as keyof typeof monthType
                      ]
                      }`,
                    )
                    : '-'}
                </div>
                <div className="added-times-table__body-group-section-column">
                  {valueHandler(group?.endDateYear)}
                </div>
                <div className="added-times-table__body-group-section-column">
                  {valueHandler(group?.endDateHour)}
                </div>
                <div className="added-times-table__body-group-section-column">
                  {valueHandler(group?.endDateMinute)}
                </div>
              </div>
              <div className="added-times-table__body-group-column action">
                <Trash2
                  onClick={() => {
                    handleDeleteModal(index);
                  }}
                  size={20}
                  stroke="#F04438"
                />
              </div>
            </div>
          ))}
          {showDelete !== null && (
            <Modal
              modalSize="sm"
              isOpen={showDelete !== null}
              onClose={() => handleDeleteModal(null)}
            >
              <SureDeleteModalAction
                setShowModal={() => {
                  handleDeleteModal(null);
                }}
                onClick={() => {
                  remove(showDelete);
                  handleDeleteModal(null);
                }}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
