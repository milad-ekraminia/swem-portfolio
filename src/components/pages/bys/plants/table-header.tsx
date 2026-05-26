import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getCookie } from '@/helpers/cookies';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlantLogsTableHeader = ({
  label,
  description,
  link,
}: {
  label: string;
  description?: string;
  link: string;
}) => {
  const isRTL = getCookie('CultureName') === 'fa';

  return (
    <div className="dv-organization-table-header">
      <div className="dv-organization-table-header__title-section">
        <h3>{getTranslatedValue(label)}</h3>
        {description && <h5>{getTranslatedValue(description)}</h5>}
      </div>
      <div className="dv-organization-table-header__actions">
        <Link to={link} type="button" className="dv-alt-organization-link">
          <span>{getTranslatedValue('ShowMore')}</span>
          {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
        </Link>
      </div>
    </div>
  );
};

export default PlantLogsTableHeader;
