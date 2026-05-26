import DeleteModal from '@/components/ui/action/delete-modal';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import {
  AlphabetItemEnum,
  alphabetItemEnumOptions,
  MCSDefaultValue,
  MCSDefaultValueOptions,
  MCSPinNumber,
  MCSPinNumberOptions,
} from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { multiConditionalStatusesListType } from '@/types/pages/definitions/multi-conditional-statuses';
import {
  digitalItemInitialValues,
  digitalItemInitialValuesTypes,
  digitalItemResolver,
} from '@/validations/definitions/multi-conditional-status/multi-conditional-statuses-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { CirclePlus, Trash2 } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

const MemoDigitalConditionsTable = ({
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
  } = useForm<digitalItemInitialValuesTypes>({
    resolver: yupResolver(digitalItemResolver as any),
    defaultValues: digitalItemInitialValues,
  });

  const { fields, append, remove } = useFieldArray<{
    digitalItems: digitalItemInitialValuesTypes[];
  }>({
    control,
    name: 'digitalItems',
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
      mcsItemNr: data.mcsItemNr,
      mcsPinNumber: data.mcsPinNumber,
      mcsDeviceId: data.mcsDeviceId,
      mcsLabelId: data.mcsLabelId,
      mcsDefaultValue: data.mcsDefaultValue,
    });
    reset(digitalItemInitialValues);
  };

  const detailFields = [
    getTranslatedValue('em_multi_conditional_item_id'),
    getTranslatedValue('em_multi_conditional_device'),
    getTranslatedValue('em_multi_conditional_label'),
    getTranslatedValue('MCSPinNumber'),
    getTranslatedValue('MCSDefaultValue'),
    getTranslatedValue('Actions'),
  ];

  const fieldsAlphabetList = fields?.map((item: any) => item.mcsItemNr) || [];
  // const detailFieldsAlphabetList = [];

  // const savedAlphabetList = fieldsAlphabetList.concat(detailFieldsAlphabetList);
  const savedAlphabetList = fieldsAlphabetList;

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
          {getTranslatedValue('DigitalConditions')}
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
                      {field?.mcsItemNr
                        ? getTranslatedValue(
                          AlphabetItemEnum[
                          field?.mcsItemNr as keyof typeof AlphabetItemEnum
                          ],
                        )
                        : '-'}
                    </span>
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
                      {field?.mcsPinNumber !== null &&
                        field?.mcsPinNumber !== undefined &&
                        field.mcsPinNumber >= 0
                        ? getTranslatedValue(`${MCSPinNumber[0]}`)
                        : '-'}
                    </span>
                    <span className="dv-plant-detail__body-table__body-column-cell">
                      {field?.mcsDefaultValue
                        ? getTranslatedValue(
                          `MCSDefaultValue.${MCSDefaultValue[field?.mcsDefaultValue as keyof typeof MCSDefaultValue]}`,
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
                <RegisterSelectInput
                  name="mcsItemNr"
                  // label={getTranslatedValue("em_multi_conditional_item_id")}
                  options={alphabetItemEnumOptions
                    .slice(9, 18)
                    ?.filter(
                      (item: any) => !savedAlphabetList.includes(item.value),
                    )}
                  error={errors?.mcsItemNr?.message}
                  register={register}
                  control={detailControl}
                />
              </div>
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
                  error={errors?.mcsLabelId?.message}
                />
              </div>
              <div className="dv-plant-detail__body-table__body-column-cell">
                <RegisterSelectInput
                  name="mcsPinNumber"
                  // label={getTranslatedValue("MCSPinNumber")}
                  options={MCSPinNumberOptions}
                  error={errors?.mcsPinNumber?.message}
                  register={register}
                  control={detailControl}
                />
              </div>
              <div className="dv-plant-detail__body-table__body-column-cell">
                <RegisterSelectInput
                  name="mcsDefaultValue"
                  // label={getTranslatedValue("MCSDefaultValue")}
                  options={MCSDefaultValueOptions}
                  error={errors?.mcsDefaultValue?.message}
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

const DigitalConditionsTable = memo(MemoDigitalConditionsTable);

export default DigitalConditionsTable;
