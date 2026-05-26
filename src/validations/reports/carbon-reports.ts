import { formatDateToCustomISO } from '@/helpers/bys/get-today-date';

export const reportsAddProfileCarbonReportInitialValues = {
  profileName: '',
  reportType: 'carbon',
  filterProfileFields: [
    {
      fieldName: 'StartDateTime',
      fieldType: 3,
      fieldValue: formatDateToCustomISO(-1),
      filterProfileId: 0,
    },
    {
      fieldName: 'EndDateTime',
      fieldType: 3,
      fieldValue: formatDateToCustomISO(0),
      filterProfileId: 0,
    },
  ],
};
