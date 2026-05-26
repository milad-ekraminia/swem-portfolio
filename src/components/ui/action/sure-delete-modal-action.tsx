import { Button } from '@/components/ui/button/button';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Trash2 } from 'lucide-react';
import { memo } from 'react';

const MemoSureDeleteModalAction = ({
  setShowModal,
  onClick,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}) => {
  return (
    <div className="dv-logout-modal">
      <div className="dv-logout-modal__header">
        <div className="dv-logout-modal__header-icon">
          <Trash2 color="#F04438" size="24" />
        </div>
        <h2 className="dv-logout-modal__header-title">
          {getTranslatedValue('ApplyConfirmationMessage')}
        </h2>
      </div>

      <div className="dv-logout-modal__body">
        <p className="dv-logout-modal__body-text">
          {getTranslatedValue('DeleteConfirmationMessage')}
        </p>

        <div className="dv-logout-modal__body-buttons">
          <Button onClick={onClick} variant="danger">
            {getTranslatedValue('Yes')}
          </Button>
          <Button onClick={() => setShowModal(false)} variant="secondary">
            {getTranslatedValue('Cancel')}
          </Button>
        </div>
      </div>
    </div>
  );
};

const SureDeleteModalAction = memo(MemoSureDeleteModalAction);

export default SureDeleteModalAction;
