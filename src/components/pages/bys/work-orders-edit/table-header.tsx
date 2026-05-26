import { getTranslatedValue } from '@/helpers/get-translated-value';

const ActionsGlobalTableHeader = ({
  label,
  description,
}: {
  label: string;
  description?: string;
}) => {
  return (
    <div className="dv-organization-table-header">
      <div className="dv-organization-table-header__title-section">
        <h3>{getTranslatedValue(label)}</h3>
        {description && <h5>{getTranslatedValue(description)}</h5>}
      </div>
    </div>
  );
};

export default ActionsGlobalTableHeader;
