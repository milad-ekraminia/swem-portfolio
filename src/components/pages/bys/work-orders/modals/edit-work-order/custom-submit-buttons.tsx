import { memo, ReactNode } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Check, X } from 'lucide-react';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import { Button } from '../../../../../ui/button/button';

const MemoSubmitOrCancelButtons = ({
  handleCancelForm,
  isPending = false,
  isSubmitDisabled = false,
  children,
  confirmButtonText = getTranslatedValue('Save', 'AbpUi.texts'),
  rejectButtonText,
}: {
  handleCancelForm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isPending: boolean;
  isSubmitDisabled?: boolean;
  children?: ReactNode;
  confirmButtonText?: string;
  rejectButtonText?: string;
}) => {
  return (
    <div className="dv-submit-or-cancel-buttons edit-work-order-modal">
      {children}
      <Button type="button" onClick={handleCancelForm} variant="danger-outline">
        <div className="edit-work-order-modal-button-box">
          <X />
          <span>{rejectButtonText}</span>
        </div>
      </Button>
      <Button
        disabled={isSubmitDisabled || isPending}
        type="submit"
        variant="primary"
      >
        {isPending ? (
          <ComponentLoader variant="secondary" />
        ) : (
          <div className="edit-work-order-modal-button-box">
            <Check />
            <span>{confirmButtonText}</span>
          </div>
        )}
      </Button>
    </div>
  );
};

const CustomSubmitOrCancelButtons = memo(MemoSubmitOrCancelButtons);

export default CustomSubmitOrCancelButtons;
