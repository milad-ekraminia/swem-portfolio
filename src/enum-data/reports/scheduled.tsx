import { StatusIcon } from '@/components/ui/status-icon';
import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { ScheduledReport } from '@/types/pages/reports/scheduled';
import { Edit, Trash2 } from 'lucide-react';

export const getColumns = (
  setShowDeleteModal: (id: number | null) => void,
  setShowEditModal: (derivedValue: ScheduledReport | null) => void,
  filterProfileList: any
) => {
  return [
    {
      header: getTranslatedValue('State'),
      accessorKey: 'active',
      sort: 'Active',
      size: 50,
      cell: ({ row }: any) => {
        return <>{<StatusIcon status={row?.original?.active} />}</>;
      },
    },
    {
      header: getTranslatedValue('ScheduledReportDescription'),
      accessorKey: 'description',
      sort: 'Description',
      size: 250,
    },
    {
      header: getTranslatedValue('report_type'),
      accessorKey: 'reportType',
      cell: ({ row }: any) => {
        return (
          filterProfileList?.find(
            (filterProfile: any) =>
              filterProfile?.filterProfileId === row?.original?.filterProfileId,
          )?.reportType || '-'
        );
      },
      size: 250,
      sort: 'ReportType',
    },
    {
      header: getTranslatedValue('em_report_filter_profile_name'),
      accessorKey: 'filterProfileId',
      cell: ({ row }: any) => {
        return (
          filterProfileList?.find(
            (filterProfile: any) =>
              filterProfile?.filterProfileId === row?.original?.filterProfileId,
          )?.filterProfileName || '-'
        );
      },
      size: 250,
      sort: 'FilterProfileId',
    },
    {
      header: getTranslatedValue('AdditionalWorkingHours'),
      accessorKey: 'workHour',
      size: 100,
      sort: '',
    },
    {
      header: getTranslatedValue('LastWorkingTime'),
      accessorKey: 'lastReportTime',
      cell: ({ row }: any) => {
        return dateFormatter(row?.original?.lastReportTime, true);
      },
      sort: '',
    },
    {
      header: getTranslatedValue('NextWorkingTime'),
      accessorKey: 'nextReportTime',
      cell: ({ row }: any) => {
        return dateFormatter(row?.original?.nextReportTime, true);
      },
      sort: '',
    },
    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          <button
            type="button"
            onClick={() => setShowEditModal(row?.original)}
            className="dv-edit-delete-buttons__delete-button"
          >
            <Edit color="var(--brand-600)" size={20} />
          </button>
          <button
            type="button"
            className="dv-edit-delete-buttons__delete-button"
            onClick={() => setShowDeleteModal(row?.original.id)}
          >
            <Trash2 color="#F04438" size={20} />
          </button>
        </div>
      ),
    },
  ];
};
