import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Check, Edit, Trash2, X } from 'lucide-react';
import { PlantImage } from '@/types/pages/system-administration/definitions/plant-images';
import StatusTagCircle from '@/components/ui/status-tag-circle.tsx/status-tag-circle';

export const getColumns = (
  setShowDeleteModal: (id: number | null) => void,
  setShowEditModal: (notification: PlantImage | null) => void,
  organizations: any[],
) => {
  return [
    {
      header: getTranslatedValue('Name'),
      accessorKey: 'name',
      sort: 'Name',
    },
    {
      header: getTranslatedValue('Uri'),
      accessorKey: 'uri',
      sort: 'Uri',
    },

    {
      header: getTranslatedValue('IsBackground'),
      accessorKey: 'isBackground',
      sort: 'IsBackground',
      cell: ({ row }: any) => {
        return (
          <StatusTagCircle
            label={
              row?.original?.isBackground ? (
                <Check size={14} color="green" />
              ) : (
                <X size={14} color="red" />
              )
            }
            color={row?.original?.isBackground ? 'success' : 'danger'}
          />
        );
      },
    },

    {
      header: getTranslatedValue('Organization'),
      accessorKey: 'organization',
      sort: 'OrganizationId',
      cell: ({ row }: { row: any }) => {
        return row.original?.organizationId
          ? (organizations?.find(
              (elem) => elem?.id === row.original?.organizationId,
            )?.displayName ?? '-')
          : '-';
      },
    },

    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          {getPermission('WebNet.PlantImages.Edit') && (
            <button
              type="button"
              onClick={() => setShowEditModal(row?.original)}
              className="dv-edit-delete-buttons__delete-button"
            >
              <Edit color="var(--brand-600)" size={20} />
            </button>
          )}
          {getPermission('WebNet.PlantImages.Delete') && (
            <button
              type="button"
              className="dv-edit-delete-buttons__delete-button"
              onClick={() => setShowDeleteModal(row?.original?.id)}
            >
              <Trash2 color="#F04438" size={20} />
            </button>
          )}
        </div>
      ),
    },
  ];
};
