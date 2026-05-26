import { memo, ReactNode } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ComponentLoader } from '../loader/component-loader/component-loader';
import { Button } from './button';

const MemoSendOrCancelButtons = ({
  handleCancelForm,
  handleSubmitForm,
  isPending = false,
  isSubmitDisabled = false,
  children,
  confirmButtonText = getTranslatedValue('Save', 'AbpUi.texts'),
}: {
  handleCancelForm: () => void;
  handleSubmitForm: () => void;
  isPending: boolean;
  isSubmitDisabled?: boolean;
  children?: ReactNode;
  confirmButtonText?: string;
}) => {
  return (
    <div className="dv-send-or-cancel-buttons">
      {children}
      <Button type="button" onClick={handleCancelForm} variant="secondary">
        {getTranslatedValue('cancel')}
      </Button>
      <Button
        disabled={isSubmitDisabled || isPending}
        onClick={handleSubmitForm}
        type="button"
        variant="primary"
      >
        {isPending ? (
          <ComponentLoader variant="secondary" />
        ) : (
          confirmButtonText
        )}
      </Button>
    </div>
  );
};

const SendOrCancelButtons = memo(MemoSendOrCancelButtons);

export default SendOrCancelButtons;
