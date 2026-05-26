import DeleteModal from '@/components/ui/action/delete-modal';
import { DecimalInput } from '@/components/ui/input/decimal-input/Input';
import SearchableDropdown from '@/components/ui/input/searchable-select/searchable-select';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import {
  AlphabetItemEnum,
  alphabetItemEnumOptions,
  MCSControlArea,
  MCSControlAreaOptions,
} from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { multiConditionalStatusesListType } from '@/types/pages/definitions/multi-conditional-statuses';
import {
  derivedItemInitialValues,
  derivedItemInitialValuesTypes,
  derivedItemResolver,
} from '@/validations/definitions/multi-conditional-status/multi-conditional-statuses-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { CirclePlus, Trash2 } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

const MemoDerivedValueConditionsTable = ({
  control,
  derivedValueLookupResponse,
}: {
  control: any;
  derivedValueLookupResponse: multiConditionalStatusesListType;
}) => {
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    control: detailControl,
    reset,
  } = useForm<derivedItemInitialValuesTypes>({
    resolver: yupResolver(derivedItemResolver as any),
    defaultValues: derivedItemInitialValues,
  });

  const { fields, append, remove } = useFieldArray<{
    derivedItems: derivedItemInitialValuesTypes[];
  }>({
    control,
    name: 'derivedItems',
  });

  const mcsDerivedId = useWatch({
    control: detailControl,
    name: 'mcsDerivedId',
  });

  const handleAddDetail = (data: any) => {
    append({
      mcsItemNr: data.mcsItemNr,
      mcsControlArea: data.mcsControlArea,
      mcsMinimum: data.mcsMinimum,
      mcsMaximum: data.mcsMaximum,
      mcsDerivedId: data.mcsDerivedId,
    });
    reset(derivedItemInitialValues);
  };

  const detailFields = [
    getTranslatedValue('em_multi_conditional_item_id'),
    getTranslatedValue('DerivedValue'),
    getTranslatedValue('em_multi_conditional_conf_area'),
    getTranslatedValue('em_multi_conditional_min'),
    getTranslatedValue('em_multi_conditional_max'),
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
          {getTranslatedValue('DerivedValueConditions')}
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
                      {field?.mcsDerivedId
                        ? derivedValueLookupResponse?.find(
                          (item: any) => item.id === field?.mcsDerivedId,
                        )?.displayName
                        : '-'}
                    </span>
                    <span className="dv-plant-detail__body-table__body-column-cell">
                      {field?.mcsControlArea
                        ? getTranslatedValue(
                          `Enum:MCSControlArea.${MCSControlArea[field?.mcsControlArea as keyof typeof MCSControlArea]}`,
                        )
                        : '-'}
                    </span>
                    <span className="dv-plant-detail__body-table__body-column-cell">
                      {field?.mcsMinimum ?? 0}
                    </span>
                    <span className="dv-plant-detail__body-table__body-column-cell">
                      {field?.mcsMaximum ?? 0}
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
                    .slice(18)
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
                  name="mcsDerivedId"
                  // label={getTranslatedValue("DerivedValue")}
                  searchParameterLabel={'title'}
                  options={derivedValueLookupResponse?.map((item: any) => ({
                    value: item.id,
                    title: item.displayName,
                    disabled: item.disabled,
                  }))}
                  selectedVal={
                    mcsDerivedId
                      ? (derivedValueLookupResponse?.find(
                        (item: any) => item.id == mcsDerivedId,
                      )?.displayName ?? '')
                      : ''
                  }
                  placeholder={getTranslatedValue('Search')}
                  handleChange={(selectedValue: any) =>
                    setValue('mcsDerivedId', selectedValue)
                  }
                  isLoading={false}
                  error={errors?.mcsDerivedId?.message}
                />
              </div>
              <div className="dv-plant-detail__body-table__body-column-cell">
                <RegisterSelectInput
                  name="mcsControlArea"
                  // label={getTranslatedValue("em_multi_conditional_conf_area")}
                  options={MCSControlAreaOptions}
                  error={errors?.mcsControlArea?.message}
                  register={register}
                  control={detailControl}
                />
              </div>
              <div className="dv-plant-detail__body-table__body-column-cell">
                <DecimalInput
                  // label={getTranslatedValue("em_multi_conditional_min")}
                  error={errors?.mcsMinimum?.message}
                  name="mcsMinimum"
                  register={register}
                  setValue={setValue}
                  placeholder="0,0000"
                  step="0.0001"
                />
              </div>
              <div className="dv-plant-detail__body-table__body-column-cell">
                <DecimalInput
                  // label={getTranslatedValue("em_multi_conditional_max")}
                  error={errors?.mcsMaximum?.message}
                  name="mcsMaximum"
                  register={register}
                  setValue={setValue}
                  placeholder="0,0000"
                  step="0.0001"
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

const DerivedValueConditionsTable = memo(MemoDerivedValueConditionsTable);

export default DerivedValueConditionsTable;
