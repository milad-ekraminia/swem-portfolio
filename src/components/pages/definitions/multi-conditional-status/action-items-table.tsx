import DeleteModal from '@/components/ui/action/delete-modal';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import {
  MCSWriteValue,
  MCSWriteValueOptions,
} from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { multiConditionalStatusesListType } from '@/types/pages/definitions/multi-conditional-statuses';
import {
  actionInitialValues,
  actionInitialValuesTypes,
  actionResolver,
} from '@/validations/definitions/multi-conditional-status/multi-conditional-statuses-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { CirclePlus, Trash2 } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

const MemoActionItemsTable = ({
  control,
  deviceLookupResponse,
  labelLookupyResponse,
}: {
  control: any;
  deviceLookupResponse: multiConditionalStatusesListType;
  labelLookupyResponse: multiConditionalStatusesListType;
}) => {
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    control: detailControl,
    reset,
  } = useForm<actionInitialValuesTypes>({
    resolver: yupResolver(actionResolver as any),
    defaultValues: actionInitialValues,
  });

  const { fields, append, remove } = useFieldArray<{
    actions: actionInitialValuesTypes[];
  }>({
    control,
    name: 'actions',
  });

  const mcsDeviceId = useWatch({
    control: detailControl,
    name: 'mcsDeviceId',
  });
  const mcsLabelId = useWatch({
    control: detailControl,
    name: 'mcsLabelId',
  });

  const handleAddDetail = (data: any) => {
    append({
      mcsWriteValue: data.mcsWriteValue,
      mcsDeviceId: data.mcsDeviceId,
      mcsLabelId: data.mcsLabelId,
    });
    reset(actionInitialValues);
  };

  const detailFields = [
    getTranslatedValue('em_multi_conditional_device'),
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
          {getTranslatedValue('Action')}
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
                      {field?.mcsDeviceId
                        ? deviceLookupResponse?.find(
                          (item: any) => item.id === field?.mcsDeviceId,
                        )?.displayName
                        : '-'}
                    </span>
                    <span className="dv-plant-detail__body-table__body-column-cell">
                      {field?.mcsLabelId && labelLookupyResponse
                        ? getTranslatedValue(
                          labelLookupyResponse.find(
                            (item: any) => item.id === field?.mcsLabelId,
                          )?.displayName ?? '',
                        )
                        : '-'}
                    </span>
                    <span className="dv-plant-detail__body-table__body-column-cell">
                      {field?.mcsWriteValue !== undefined &&
                        field?.mcsWriteValue !== null &&
                        Number(field.mcsWriteValue) >= 0
                        ? getTranslatedValue(
                          `MCSWriteValue.${MCSWriteValue[Number(field.mcsWriteValue) as keyof typeof MCSWriteValue]}`,
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
                  name="mcsDeviceId"
                  // label={getTranslatedValue("em_multi_conditional_device")}
                  searchParameterLabel={'title'}
                  options={deviceLookupResponse?.map((item: any) => ({
                    value: item.id,
                    title: item.displayName,
                    disabled: item.disabled,
                  }))}
                  selectedVal={
                    mcsDeviceId
                      ? (deviceLookupResponse?.find(
                        (item: any) => item.id == mcsDeviceId,
                      )?.displayName ?? '')
                      : ''
                  }
                  placeholder={getTranslatedValue('Search')}
                  handleChange={(selectedValue: any) =>
                    setValue('mcsDeviceId', selectedValue)
                  }
                  isLoading={false}
                  error={errors?.mcsDeviceId?.message}
                />
              </div>
              <div className="dv-plant-detail__body-table__body-column-cell">
                <SearchableDropdown
                  name="mcsLabelId"
                  // label={getTranslatedValue("em_multi_conditional_label")}
                  searchParameterLabel={'title'}
                  options={labelLookupyResponse?.map((item: any) => ({
                    value: item.id,
                    title: item.displayName,
                    disabled: item.disabled,
                  }))}
                  selectedVal={
                    mcsLabelId
                      ? getTranslatedValue(
                        labelLookupyResponse?.find(
                          (item: any) => item.id == mcsLabelId,
                        )?.displayName ?? '',
                      )
                      : ''
                  }
                  placeholder={getTranslatedValue('Search')}
                  handleChange={(selectedValue: any) =>
                    setValue('mcsLabelId', selectedValue)
                  }
                  isLoading={false}
                  error={errors?.mcsLabelId?.message}
                />
              </div>
              <div className="dv-plant-detail__body-table__body-column-cell">
                <RegisterSelectInput
                  name="mcsWriteValue"
                  // label={getTranslatedValue("em_multi_conditional_alarm_action")}
                  options={MCSWriteValueOptions}
                  error={errors?.mcsWriteValue?.message}
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

const ActionItemsTable = memo(MemoActionItemsTable);

export default ActionItemsTable;
