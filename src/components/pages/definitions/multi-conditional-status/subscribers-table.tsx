import DeleteModal from '@/components/ui/action/delete-modal';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import {
  userNotificationPeriodType,
  userNotificationPeriodTypeOptions,
  userNotificationType,
  userNotificationTypeOptions,
} from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { multiConditionalStatusesListType } from '@/types/pages/definitions/multi-conditional-statuses';
import {
  subscriberInitialValues,
  subscriberInitialValuesTypes,
  subscriberResolver,
} from '@/validations/definitions/multi-conditional-status/multi-conditional-statuses-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { CirclePlus, Trash2 } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

const MemoSubscribersTable = ({
  control,
  userLookupResponse,
}: {
  control: any;
  userLookupResponse: multiConditionalStatusesListType;
}) => {
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    control: detailControl,
    reset,
  } = useForm<subscriberInitialValuesTypes>({
    resolver: yupResolver(subscriberResolver as any),
    defaultValues: subscriberInitialValues,
  });

  const userId = useWatch({
    control: detailControl,
    name: 'userId',
  });

  const { fields, append, remove } = useFieldArray<{
    subscribers: subscriberInitialValuesTypes[];
  }>({
    control,
    name: 'subscribers',
  });

  const handleAddDetail = (data: any) => {
    append({
      userId: data.userId,
      notificationPeriod: data.notificationPeriod,
      notificationType: data.notificationType,
    });
    reset(subscriberInitialValues);
  };

  const detailFields = [
    getTranslatedValue('User'),
    getTranslatedValue('em_multi_conditional_label'),
    getTranslatedValue('em_multi_conditional_alarm_action'),
    getTranslatedValue('Actions'),
  ];

  const handleRemoveDetail = (index: number) => {
    remove(index);
    setDeleteIndex(null);
  };

  const modalOpen = useMemo(
    () => Number(deleteIndex) >= 0 && deleteIndex !== null,
    [deleteIndex],
  );

  return (
    <div className="dv-plant-detail dv-organization-modal__content-input-full">
      <div className="dv-plant-detail__header">
        <h1 className="dv-plant-detail__header-title">
          {getTranslatedValue('AlarmSubscription')}
        </h1>
      </div>
      <div className="dv-plant-detail__body">
        <div className="dv-plant-detail__body-table">
          <div className="dv-plant-detail__body-table__header">
            {detailFields.map((field) => (
              <div
                key={field}
                className="dv-plant-detail__body-table__header-cell"
              >
                <span className="dv-plant-detail__body-table__header-cell-title">
                  {field}
                </span>
              </div>
            ))}
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
                      {field?.userId
                        ? userLookupResponse?.find(
                          (item: any) => item.id === field?.userId,
                        )?.displayName
                        : '-'}
                    </span>
                    <span className="dv-plant-detail__body-table__body-column-cell">
                      {field?.notificationType !== undefined &&
                        field?.notificationType !== null &&
                        Number(field.notificationType) >= 0
                        ? getTranslatedValue(
                          `Enum:UserNotificationType.${userNotificationType[Number(field.notificationType) as keyof typeof userNotificationType]}`,
                        )
                        : '-'}
                    </span>
                    <span className="dv-plant-detail__body-table__body-column-cell">
                      {field?.notificationPeriod !== undefined &&
                        field?.notificationPeriod !== null &&
                        Number(field.notificationPeriod) >= 0
                        ? getTranslatedValue(
                          `Enum:UserNotificationPeriodType.${userNotificationPeriodType[Number(field.notificationPeriod) as keyof typeof userNotificationPeriodType]}`,
                        )
                        : '-'}
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

            <div className="dv-plant-detail__body-table__body-column">
              <div className="dv-plant-detail__body-table__body-column-cell">
                <SearchableDropdown
                  name="userId"
                  // label={getTranslatedValue("User")}
                  searchParameterLabel={'title'}
                  options={userLookupResponse?.map((item: any) => ({
                    value: item.id,
                    title: item.displayName,
                    disabled: item.disabled,
                  }))}
                  selectedVal={
                    userId
                      ? (userLookupResponse?.find(
                        (item: any) => item.id == userId,
                      )?.displayName ?? '')
                      : ''
                  }
                  placeholder={getTranslatedValue('Search')}
                  handleChange={(selectedValue: any) =>
                    setValue('userId', selectedValue)
                  }
                  isLoading={false}
                  error={errors?.userId?.message}
                />
              </div>
              <div className="dv-plant-detail__body-table__body-column-cell">
                <RegisterSelectInput
                  name="notificationType"
                  // label={getTranslatedValue("UserNotificationType")}
                  options={userNotificationTypeOptions}
                  error={errors?.notificationType?.message}
                  register={register}
                  control={detailControl}
                />
              </div>
              <div className="dv-plant-detail__body-table__body-column-cell">
                <RegisterSelectInput
                  name="notificationPeriod"
                  // label={getTranslatedValue("Action")}
                  options={userNotificationPeriodTypeOptions}
                  error={errors?.notificationPeriod?.message}
                  register={register}
                  control={detailControl}
                />
              </div>

              <div className="dv-plant-detail__body-table__body-column-cell">
                <button
                  type="button"
                  className="dv-add-to-table-button"
                  onClick={handleSubmit(handleAddDetail)}
                >
                  <CirclePlus color="var(--brand-600)" size={20} />
                  {/* <span>{getTranslatedValue("Add")}</span> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <Modal
          modalSize="sm"
          isOpen={Boolean(modalOpen)}
          onClose={() => setDeleteIndex(null)}
        >
          <DeleteModal
            setShowModal={() => setDeleteIndex(null)}
            deleteItemHandler={() => handleRemoveDetail(Number(deleteIndex))}
          />
        </Modal>
      )}
    </div>
  );
};

const SubscribersTable = memo(MemoSubscribersTable);

export default SubscribersTable;
