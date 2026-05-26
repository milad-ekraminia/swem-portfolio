import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Edit, Trash2 } from 'lucide-react';
import { ProductManufacturer } from '@/types/pages/inventory-management/product-manufacturers';

export const getColumns = (
  setShowDeleteModal: (id: number | null) => void,
  setShowEditModal: (notification: ProductManufacturer | null) => void,
) => {
  return [
    {
      header: getTranslatedValue('ManufacturerTitle'),
      accessorKey: 'manufacturerTitle',
      sort: 'ManufacturerTitle',
    },
    {
      header: getTranslatedValue('ManufacturerNo'),
      accessorKey: 'manufacturerNo',
      sort: 'ManufacturerNo',
    },
    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          {getPermission('WebNet.ProductManufacturers.Edit') && (
            <button
              type="button"
              onClick={() => setShowEditModal(row?.original)}
              className="dv-edit-delete-buttons__delete-button"
            >
              <Edit color="var(--brand-600)" size={20} />
            </button>
          )}
          {getPermission('WebNet.ProductManufacturers.Delete') && (
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
