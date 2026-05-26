import { memo, useMemo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import DeleteModal from '@/components/ui/action/delete-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';

const MemoMeasurementData = ({
  label = '',
  children,
  setDeleteIndex,
  deleteIndex,
  icon,
  remove,
}: {
  control: any;
  label?: string;
  icon?: any;
  children?: any;
  setDeleteIndex: any;
  deleteIndex: any;
  remove: any;
}) => {
  const handleRemoveDetail = (index: number) => {
    remove(index);
    setDeleteIndex(null);
  };

  const modalOpen = useMemo(
    () => Number(deleteIndex) >= 0 && deleteIndex !== null,
    [deleteIndex],
  );

  return (
    <div className="graphic-table-container">
      <div className="dv-plant-detail dv-organization-modal__content-input-full">
        <div className="dv-plant-detail__header">
          <h1 className="dv-plant-detail__header-title">
            {icon} {getTranslatedValue(label)}
          </h1>
        </div>
        <div className="dv-plant-detail__body">
          <div className="dv-plant-detail__body-table">{children}</div>
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
    </div>
  );
};

const TableBox = memo(MemoMeasurementData);

export default TableBox;
