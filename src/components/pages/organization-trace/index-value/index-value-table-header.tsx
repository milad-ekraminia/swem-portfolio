import { getTranslatedValue } from '@/helpers/get-translated-value';

export const IndexValueTableHeader = ({ formattedDate }: any) => {
  return (
    <div className="index-value-header">
      <span>{getTranslatedValue('InverterIndexValue')}</span>
      <span className="header-date-status">{formattedDate}</span>
    </div>
  );
};
