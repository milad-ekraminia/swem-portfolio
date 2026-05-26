import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Edit, Trash2 } from 'lucide-react';
import { PlantVideo } from '@/types/pages/system-administration/definitions/plant-videos';

export const getColumns = (
  setShowDeleteModal: (id: number | null) => void,
  setShowEditModal: (notification: PlantVideo | null) => void,
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
      header: getTranslatedValue('Poster'),
      accessorKey: 'poster',
      sort: 'Poster',
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
          {getPermission('WebNet.PlantVideos.Edit') && (
            <button
              type="button"
              onClick={() => setShowEditModal(row?.original)}
              className="dv-edit-delete-buttons__delete-button"
            >
              <Edit color="var(--brand-600)" size={20} />
            </button>
          )}
          {getPermission('WebNet.PlantVideos.Delete') && (
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
