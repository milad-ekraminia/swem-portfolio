import SureDeleteModalAction from '@/components/ui/action/sure-delete-modal-action';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { NotificationModal } from '@/components/ui/notification/notification-modal/notification-modal';
import { alphabetItemEnumOptions } from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Parameter } from '@/types/pages/system-administration/definitions/derived-values';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import DerivedValuesParameterForm from '../paramater-form';
import DerivedValuesParameter from '../parameter';

interface Props {
  isLoading: boolean;
  control: any;
  formula: string;
  fields: Parameter[];
  append: any;
  remove: any;
}
export default function ParametersTable({
  control,
  isLoading,
  formula,
  append,
  fields,
  remove,
}: Props) {
  const [showParameterUsedModal, setShowParameterUsedModal] =
    useState<boolean>(false);
  const [showParameterDeleteModal, setShowParameterDeleteModal] = useState<
    string | null
  >(null);

  const handleRemoveChecks = (parameter: Parameter, index: number) => {
    const letter = alphabetItemEnumOptions?.find(
      (item: any) => item.value === parameter.dvItemNr,
    );

    if (formula.includes(letter?.title as string)) {
      setShowParameterUsedModal(true);
    } else {
      setShowParameterDeleteModal(index.toString());
    }
  };

  const handleRemove = () => {
    remove(Number(showParameterDeleteModal));
    setShowParameterDeleteModal(null);
  };
  return (
    <>
      <div className="derived-values-form-table">
        <div className="derived-values-form-table__title">
          {getTranslatedValue('em_derived_value_parameter')}
        </div>
        <div className="derived-values-form-table__header">
          <div
            className="derived-values-form-table__header-column"
            style={{ gridColumn: 'span 1 / span 1' }}
          >
            {getTranslatedValue('em_derived_value_item_number')}
          </div>
          <div className="derived-values-form-table__header-column">
            {getTranslatedValue('em_device')}
          </div>
          <div className="derived-values-form-table__header-column">
            {getTranslatedValue('em_derived_value_label')}
          </div>
          <div className="derived-values-form-table__header-column">
            {getTranslatedValue('em_derived_value_math_operator')}
          </div>
          <div className="derived-values-form-table__header-column">
            {getTranslatedValue('em_derived_value_constant_value')}
          </div>
          <div
            className="derived-values-form-table__header-column"
            style={{ gridColumn: 'span 1 / span 1' }}
          >
            {getTranslatedValue('Actions')}
          </div>
        </div>
        <div className="derived-values-form-table__body">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <DerivedValuesParameterForm
                mainControl={control}
                fields={fields}
                append={append}
                remove={remove}
              />
              {fields.map((field, index) => (
                <DerivedValuesParameter
                  handleRemove={() => {
                    handleRemoveChecks(field, index);
                  }}
                  parameter={field}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {showParameterUsedModal ? (
        <NotificationModal
          isOpen={showParameterUsedModal}
          onCancel={() => setShowParameterUsedModal(false)}
          onClose={() => setShowParameterUsedModal(false)}
          footerType="confirmationError"
          cancelButtonText={getTranslatedValue('Cancel')}
          submitButtonText={getTranslatedValue('Confirm')}
          onConfirm={() => setShowParameterUsedModal(false)}
          title={getTranslatedValue('ParameterDeletionNotAllowed')}
          modalSize="sm"
        >
          <div style={{ padding: '0 var(--spacing-lg)' }}>
            {getTranslatedValue('DeleteFormulaParameterErrorMessage')}
          </div>
        </NotificationModal>
      ) : null}
      {showParameterDeleteModal ? (
        <Modal
          isOpen={!!showParameterDeleteModal}
          onClose={() => setShowParameterDeleteModal(null)}
        >
          <SureDeleteModalAction
            onClick={handleRemove}
            setShowModal={() => setShowParameterDeleteModal(null)}
          />
        </Modal>
      ) : null}
    </>
  );
}
