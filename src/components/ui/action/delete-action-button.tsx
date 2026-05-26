import { Trash2 } from 'lucide-react';
import { memo, useState } from 'react';
import Modal from '../modal-wrapper/modal-wrapper';
import SureDeleteModal from './sure-delete-modal';

const MemoActionButtons = ({
  deleteUrl,
  queryKey,
}: {
  deleteUrl?: string;
  queryKey: string;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="dv-edit-delete-buttons">
        {deleteUrl ? (
          <button
            type="button"
            className="dv-edit-delete-buttons__delete-button"
            onClick={() => setShowModal(true)}
          >
            <Trash2 color="#F04438" size={20} />
          </button>
        ) : null}
      </div>

      {showModal && deleteUrl && (
        <Modal
          modalSize="sm"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <SureDeleteModal
            queryKey={queryKey}
            deleteItemUrl={deleteUrl}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
};

const DeleteActionButton = memo(MemoActionButtons);

export default DeleteActionButton;
