import { memo, ReactNode } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button/button';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';

const MemoPlantEditSubmitOrCancelButtons = ({
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
    <div className="actions">
      {children}
      <Button type="button" onClick={handleCancelForm} variant="danger-outline">
        <div className="actions__inner">
          <Trash2 size={16} />
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
  );
};

const PlantEditSubmitOrCancelButtons = memo(MemoPlantEditSubmitOrCancelButtons);

export default PlantEditSubmitOrCancelButtons;
