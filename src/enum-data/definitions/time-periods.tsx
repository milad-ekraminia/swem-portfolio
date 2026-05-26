import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Edit, Trash2 } from 'lucide-react';
import { TimePeriod } from '@/types/pages/definitions/time-periods';
import { StatusIcon } from '@/components/ui/status-icon';
import { timePeriodType } from './enum';

export const getColumns = (
  setShowDeleteModal: (id: number | null) => void,
  setShowEditModal: (notification: TimePeriod | null) => void,
) => {
  return [
    {
      header: getTranslatedValue('Active'),
      accessorKey: 'active',
      sort: 'Active',
      size: 50,
      cell: ({ row }: any) => {
        return <>{<StatusIcon status={row?.original?.active} />}</>;
      },
    },
    {
      header: getTranslatedValue('TimePeriodName'),
      accessorKey: 'timePeriodName',
      sort: 'TimePeriodName',
      size: 400,
    },
    {
      header: getTranslatedValue('TimePeriodType'),
      accessorKey: 'timePeriodType',
      size: 300,
      sort: 'TimePeriodType',
      cell: ({ row }: any) =>
        getTranslatedValue(
          `Enum:${
            timePeriodType[
              row.original?.timePeriodType as keyof typeof timePeriodType
            ]
          }`,
        ),
    },
    {
      header: getTranslatedValue('TimePeriodDescription'),
      size: 300,
      accessorKey: 'timePeriodDescription',
      sort: 'TimePeriodDescription',
    },

    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          {getPermission('WebNet.TimePeriods.Edit') && (
            <button
              type="button"
              onClick={() => setShowEditModal(row?.original)}
              className="dv-edit-delete-buttons__delete-button"
            >
              <Edit color="var(--brand-600)" size={20} />
            </button>
          )}
          {getPermission('WebNet.TimePeriods.Delete') && (
            <button
              type="button"
              className="dv-edit-delete-buttons__delete-button"
              onClick={() => setShowDeleteModal(row?.original.id)}
            >
              <Trash2 color="#F04438" size={20} />
            </button>
          )}
        </div>
      ),
    },
  ];
};
