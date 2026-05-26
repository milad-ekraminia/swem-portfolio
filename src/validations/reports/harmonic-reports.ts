import { formatDateToCustomISO } from '@/helpers/bys/get-today-date';

export const harmonicReportProfileInitialFields = {
  profileName: '',
  reportType: 'harmonics',
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
    {
      fieldName: 'DeviceCategory',
      fieldType: 2,
      fieldValue: '-1',
      filterProfileId: 0,
    },
    {
      fieldName: 'DeviceModel',
      fieldType: 2,
      fieldValue: '-1',
      filterProfileId: 0,
    },
    {
      fieldName: 'SelectedOrganizations', // 1;2;3
      fieldType: 4,
      fieldValue: [],
      filterProfileId: 0,
    },
    {
      fieldName: 'SelectedOrganizationsObjects', // [{id:1,caption:"Organization1"},{id:2,caption:"Organization2"},{id:3,caption:"Organization3"}]
      fieldType: 4,
      fieldValue: [],
      filterProfileId: 0,
    },
  ],
};
