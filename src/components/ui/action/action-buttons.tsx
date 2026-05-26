import { Edit2, PlusCircle, Trash2 } from 'lucide-react';
import { memo, useState } from 'react';
import Modal from '../modal-wrapper/modal-wrapper';
import SureDeleteModal from './sure-delete-modal';

const MemoActionButtons = ({
  updateHandler,
  deleteUrl,
  queryKey,
  addButtonHandler,
  multiQueryKey,
  disabledEdit,
  disabledDelete,
}: {
  updateHandler: () => void;
  deleteUrl?: string;
  queryKey: string;
  addButtonHandler?: () => void;
  multiQueryKey?: any;
  disabledEdit?: any;
  disabledDelete?: any;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="dv-edit-delete-buttons">
        {deleteUrl && !disabledDelete ? (
          <button
            type="button"
            className="dv-edit-delete-buttons__delete-button"
            onClick={() => setShowModal(true)}
          >
            <Trash2 color="#F04438" size={20} />
          </button>
        ) : null}
        {!disabledEdit && (
          <button
            type="button"
            className="dv-edit-delete-buttons__edit-button"
            onClick={updateHandler}
          >
            <Edit2 color="#2E90FA" size={20} />
          </button>
        )}
        {addButtonHandler && (
          <button
            type="button"
            className="dv-edit-delete-buttons__edit-button"
            onClick={addButtonHandler}
          >
            <PlusCircle color="#667085" size={20} />
          </button>
        )}
      </div>

      {showModal && deleteUrl && !disabledDelete && (
        <Modal
          modalSize="sm"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <SureDeleteModal
            queryKey={queryKey}
            multiQueryKey={multiQueryKey}
            deleteItemUrl={deleteUrl}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
};

const ActionButtons = memo(MemoActionButtons);

export default ActionButtons;
