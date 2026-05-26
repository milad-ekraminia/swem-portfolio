import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Edit, Trash2 } from 'lucide-react';
import { ProductType } from '@/types/pages/inventory-management/product-types';

export const getColumns = (
  setShowDeleteModal: (id: number | null) => void,
  setShowEditModal: (notification: ProductType | null) => void,
) => {
  return [
    {
      header: getTranslatedValue('Name'),
      accessorKey: 'productType.name',
      sort: 'ProductType.Name',
    },
    {
      header: getTranslatedValue('Description'),
      accessorKey: 'productType.description',
      sort: 'ProductType.Description',
    },
    {
      header: getTranslatedValue('ProductUnit'),
      accessorKey: 'productUnit.name',
      sort: 'ProductUnit.Name',
    },
    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          {getPermission('WebNet.ProductTypes.Edit') && (
            <button
              type="button"
              onClick={() => setShowEditModal(row?.original)}
              className="dv-edit-delete-buttons__delete-button"
            >
              <Edit color="var(--brand-600)" size={20} />
            </button>
          )}
          {getPermission('WebNet.ProductTypes.Delete') && (
            <button
              type="button"
              className="dv-edit-delete-buttons__delete-button"
              onClick={() => setShowDeleteModal(row?.original?.productType?.id)}
            >
              <Trash2 color="#F04438" size={20} />
            </button>
          )}
        </div>
      ),
    },
  ];
};
