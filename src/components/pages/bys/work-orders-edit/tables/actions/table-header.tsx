import { AddPlusSvg } from '@/assets/icons/add-plus-svg';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Button } from '@/components/ui/button/button';

const ActionsTableHeader = ({
  label,
  description,
  setNewItem,
}: {
  label: string;
  description?: string;
  setNewItem: any;
}) => {
  return (
    <div className="dv-organization-table-header">
      <div className="dv-organization-table-header__title-section">
        <h3>{getTranslatedValue(label)}</h3>
        {description && <h5>{getTranslatedValue(description)}</h5>}
      </div>
      <div className="dv-organization-table-header__actions">
        {/* <Link to={link} type="button" className="dv-alt-organization-link">
          <span>{getTranslatedValue("ShowMore")}</span>
          <ArrowRight size={20} />
        </Link> */}
        <Button
          onClick={() => setNewItem(true)}
          type="button"
          leftIcon={<AddPlusSvg stroke="#FFFFFF" />}
        >
          {getTranslatedValue('Add')}
        </Button>
      </div>
    </div>
  );
};

export default ActionsTableHeader;
