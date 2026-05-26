import { memo, ReactNode } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ComponentLoader } from '../loader/component-loader/component-loader';
import { Button } from './button';

const MemoSubmitOrCancelButtons = ({
  handleCancelForm,
  isPending = false,
  isSubmitDisabled = false,
  children,
  confirmButtonText = getTranslatedValue('Save', 'AbpUi.texts'),
}: {
  handleCancelForm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isPending: boolean;
  isSubmitDisabled?: boolean;
  children?: ReactNode;
  confirmButtonText?: string;
}) => {
  return (
    <div className="dv-submit-or-cancel-buttons">
      {children}
      <Button type="button" onClick={handleCancelForm} variant="secondary">
        {getTranslatedValue('cancel')}
      </Button>
      <Button
        disabled={isSubmitDisabled || isPending}
        type="submit"
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

const SubmitOrCancelButtons = memo(MemoSubmitOrCancelButtons);

export default SubmitOrCancelButtons;
