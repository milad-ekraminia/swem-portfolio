import { memo, useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import Modal from '../modal-wrapper/modal-wrapper';
import DeleteModal from './delete-modal';

const MemoActionWithRemoveItemButtonBox = ({
  editActionHandler,
  deleteItemHandler,
}: {
  editActionHandler: () => void;
  deleteItemHandler: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="dv-edit-delete-buttons">
        <button
          type="button"
          className="dv-edit-delete-buttons__delete-button"
          onClick={() => setShowModal(true)}
        >
          <Trash2 color="#F04438" size={20} />
        </button>
        <button
          type="button"
          className="dv-edit-delete-buttons__edit-button"
          onClick={editActionHandler}
        >
          <Edit2 color="#2E90FA" size={20} />
        </button>
      </div>

      {showModal && !!deleteItemHandler && (
        <Modal
          modalSize="sm"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <DeleteModal
            setShowModal={setShowModal}
            deleteItemHandler={() => {
              deleteItemHandler();
              setShowModal(false);
            }}
          />
        </Modal>
      )}
    </>
  );
};

const ActionWithRemoveItemButtonBox = memo(MemoActionWithRemoveItemButtonBox);

export default ActionWithRemoveItemButtonBox;
