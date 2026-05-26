import { Trash2 } from 'lucide-react';
import { memo, useState } from 'react';
import Modal from '../modal-wrapper/modal-wrapper';
import SureDeleteModal from './sure-delete-modal';

const MemoActionDeleteButtons = ({
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
        <button
          type="button"
          className="dv-edit-delete-buttons__delete-button"
          onClick={() => setShowModal(true)}
        >
          <Trash2 color="#F04438" size={20} />
        </button>
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

const ActionDeleteButtons = memo(MemoActionDeleteButtons);

export default ActionDeleteButtons;
