import ErrorContent from '@/components/ui/error-content/error-content';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { filterSelectedDataTypes } from '@/types/tree-node';
import { memo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import AlarmConfigurationsOrganizationTreeModal from './tree-modal';

const MemoAlarmConfigurationsOrganizationField = ({
  control,
  setValue,
  error,
  fieldName,
}: {
  control: any;
  setValue: any;
  error: string;
  fieldName?: string;
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const selectedOrganizations = useWatch({
    control,
    name: 'selectedOrganizations',
  });

  return (
    <>
      <div className={`main-input`} onClick={() => setShowDetail(!showDetail)}>
        <label className="label">{getTranslatedValue('Organization')}</label>

        <div
          className="main-input__wrapper"
          style={{ marginBottom: 4, overflow: 'hidden' }}
        >
          <span className="input" style={{ padding: '7px 14px' }}>
            {selectedOrganizations?.length > 0
              ? selectedOrganizations
                ?.map((item: filterSelectedDataTypes) => item.caption)
                .join(', ')
              : getTranslatedValue('Select')}
          </span>
        </div>
        {error && <ErrorContent error={error} />}
      </div>
      {showDetail && (
        <Modal
          isOpen={showDetail}
          onClose={() => setShowDetail(false)}
          modalSize="md"
          showCloseButton={false}
          outsideClickStyle={{ zIndex: 1006 }}
          contentStyle={{ zIndex: 1007 }}
        >
          <AlarmConfigurationsOrganizationTreeModal
            setIsVisible={setShowDetail}
            setValue={setValue}
            fieldName={fieldName}
          />
        </Modal>
      )}
    </>
  );
};

const AlarmConfigurationsOrganizationField = memo(
  MemoAlarmConfigurationsOrganizationField,
);

export default AlarmConfigurationsOrganizationField;
