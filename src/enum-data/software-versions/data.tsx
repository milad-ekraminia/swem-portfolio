import { dateFormatter } from '@/helpers/format-data';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Edit, Trash2 } from 'lucide-react';
import { ProductUnit } from '@/types/pages/inventory-management/product-units';
import { TextAreaScrollable } from '@/components/ui/input/textarea-scrollable/textarea-scrollable';

export const softwareVersionsTableColumns = (
  setShowDeleteModal: (id: number | null) => void,
  setShowEditModal: (notification: ProductUnit | null) => void,
) => {
  return [
    {
      header: getTranslatedValue('VersionTitle'),
      accessorKey: 'versionTitle',
      sort: 'Name',
    },
    {
      header: getTranslatedValue('VersionDescription'),
      accessorKey: 'name',
      sort: '',
      cell: ({ row }: any) => {
        const info = row?.original;
        return (
          <div className="p-5">
            <TextAreaScrollable
              // placeholder="Enter your text..."
              maxHeight="88px" // Custom max height
              rows={3}
              disabled
              defaultValue={info?.versionDescription}
              textAreaHandler={(e) => console.log(e.target.value)}
            />
          </div>
        );
      },
      size: 500,
    },
    {
      header: getTranslatedValue('CreationTime'),
      accessorKey: 'creationTime',
      sort: '',
      cell: ({ row }: any) =>
        dateFormatter(row.original?.creationTime, true, true, true),
      size: 200,
    },
    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          {getPermission('WebNet.ECentralVersions.Edit') && (
            <button
              type="button"
              onClick={() => setShowEditModal(row?.original)}
              className="dv-edit-delete-buttons__delete-button"
            >
              <Edit color="var(--brand-600)" size={20} />
            </button>
          )}
          {getPermission('WebNet.ECentralVersions.Delete') && (
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
