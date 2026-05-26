import { memo, ReactNode } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Button } from '@/components/ui/button/button';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';

const MemoSubmitOrCancelButtons = ({
  handleCancelForm,
  isPending = false,
  isSubmitDisabled = false,
  children,
  confirmButtonText = getTranslatedValue('Save', 'AbpUi.texts'),
  onConfirm,
}: {
  handleCancelForm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isPending: boolean;
  isSubmitDisabled?: boolean;
  children?: ReactNode;
  confirmButtonText?: string;
  onConfirm?: any;
}) => {
  return (
    <div className="dv-submit-or-cancel-buttons">
      {children}
      <Button type="button" onClick={handleCancelForm} variant="secondary">
        {getTranslatedValue('cancel')}
      </Button>
      <Button
        disabled={isSubmitDisabled || isPending}
        type="button"
        variant="primary"
        onClick={(e) => {
          e?.preventDefault();
          onConfirm();
        }}
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

const AddActionSubmitOrCancelButtons = memo(MemoSubmitOrCancelButtons);

export default AddActionSubmitOrCancelButtons;
