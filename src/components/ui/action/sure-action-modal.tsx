import { Button } from '@/components/ui/button/button';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { memo } from 'react';
import { ComponentLoader } from '../loader/component-loader/component-loader';

const MemoSureActionModal = ({
  setShowModal,
  isPending,
  onConfirm,
  variant = 'primary',
  message,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isPending?: any;
  onConfirm?: any;
  variant?: any;
  message: string;
}) => {
  const handleAccept = () => {
    onConfirm();
  };

  return (
    <div className="dv-logout-modal">
      <div className="dv-logout-modal__header">
        {/* <div className="dv-logout-modal__header-icon">
          <Trash2 color="#F04438" size="24" />
        </div> */}
        <h2 className="dv-logout-modal__header-title">
          {getTranslatedValue('ApplyConfirmationMessage')}
        </h2>
      </div>

      <div className="dv-logout-modal__body">
        <p className="dv-logout-modal__body-text">
          {getTranslatedValue(message)}
        </p>

        <div className="dv-logout-modal__body-buttons">
          <Button disabled={isPending} onClick={handleAccept} variant={variant}>
            {isPending ? <ComponentLoader /> : getTranslatedValue('Yes')}
          </Button>
          <Button onClick={() => setShowModal(false)} variant="secondary">
            {getTranslatedValue('Cancel')}
          </Button>
        </div>
      </div>
    </div>
  );
};

const SureActionModal = memo(MemoSureActionModal);

export default SureActionModal;
