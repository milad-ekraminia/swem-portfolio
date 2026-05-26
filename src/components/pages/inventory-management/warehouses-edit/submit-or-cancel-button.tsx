import { memo, ReactNode } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button/button';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';

const MemoWarehouseEditSubmitOrCancelButtons = ({
  handleCancelForm,
  isPending = false,
  isSubmitDisabled = false,
  children,
  confirmButtonText = getTranslatedValue('Save', 'AbpUi.texts'),
}: {
  handleCancelForm: () => void;
  isPending: boolean;
  isSubmitDisabled?: boolean;
  children?: ReactNode;
  confirmButtonText?: string;
}) => {
  return (
    <div className="dv-submit-or-cancel-buttons fit-content">
      <div>
        {children}
        <Button
          type="button"
          onClick={handleCancelForm}
          variant="danger-outline"
        >
          <div className="delete-button-inner">
            <TrashIcon size={16} />
            {getTranslatedValue('DeleteWarehouse')}
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
            confirmButtonText
          )}
        </Button>
      </div>
    </div>
  );
};

const WarehouseEditSubmitOrCancelButtons = memo(
  MemoWarehouseEditSubmitOrCancelButtons,
);

export default WarehouseEditSubmitOrCancelButtons;
