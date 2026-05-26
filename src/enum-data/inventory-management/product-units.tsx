import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Edit, Trash2 } from 'lucide-react';
import { ProductUnit } from '@/types/pages/inventory-management/product-units';

export const getColumns = (
  setShowDeleteModal: (id: number | null) => void,
  setShowEditModal: (notification: ProductUnit | null) => void,
) => {
  return [
    {
      header: getTranslatedValue('ProductUnits'),
      accessorKey: 'name',
      sort: 'Name',
    },
    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          {getPermission('WebNet.ProductUnits.Edit') && (
            <button
              type="button"
              onClick={() => setShowEditModal(row?.original)}
              className="dv-edit-delete-buttons__delete-button"
            >
              <Edit color="var(--brand-600)" size={20} />
            </button>
          )}
          {getPermission('WebNet.ProductUnits.Delete') && (
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
