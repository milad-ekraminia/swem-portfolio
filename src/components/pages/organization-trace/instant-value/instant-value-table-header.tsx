import { getTranslatedValue } from '@/helpers/get-translated-value';

export const InstantValueTableHeader = ({ formattedDate }: any) => {
  return (
    <div className="instant-value-header">
      <span>{getTranslatedValue('mnuEMReportElecInverterInstantValue')}</span>
      <span className="header-date-status">{formattedDate}</span>
    </div>
  );
};
