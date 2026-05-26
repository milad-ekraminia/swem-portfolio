import { AddPlusSvg } from '@/assets/icons/add-plus-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Button } from '@/components/ui/button/button';

export const AlarmSubscriptionFieldTableHeader = ({
  setNewItem,
}: {
  setNewItem: any;
}) => {
  return (
    <div className="alarm-subscription-field-table-header">
      <span>
        {getTranslatedValue('em_alarm_configuration') +
          ' ' +
          getTranslatedValue('Active')}
      </span>
      <div className="actions">
        <Button
          type="button"
          onClick={() => setNewItem(true)}
          leftIcon={<AddPlusSvg stroke="#FFFFFF" />}
        >
          {getTranslatedValue('Add')}
        </Button>
      </div>
    </div>
  );
};
