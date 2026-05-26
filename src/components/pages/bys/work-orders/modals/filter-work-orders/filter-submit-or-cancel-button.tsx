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
  reset,
}: {
  handleCancelForm: () => void;
  isPending: boolean;
  isSubmitDisabled?: boolean;
  children?: ReactNode;
  confirmButtonText?: string;
  reset: any;
}) => {
  return (
    <div className="dv-submit-or-cancel-buttons filter-modal-buttons">
      <div className="filter-modal-buttons-inner">
        {children}
        <Button
          type="submit"
          onClick={() => {
            reset({
              // required string
              workOrderType: '',
              creatorId: '',
              workOrderCategory: '',
              minStartDate: null,
              maxStartDate: null,
              minEndDate: null,
              maxEndDate: null,
              openWorkOrders: null,
            });
          }}
          variant="secondary-blue"
        >
          {getTranslatedValue('Clear', 'AbpUi.texts')}
        </Button>
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
    </div>
  );
};

const FilterSubmitOrCancelButtons = memo(MemoSubmitOrCancelButtons);

export default FilterSubmitOrCancelButtons;
