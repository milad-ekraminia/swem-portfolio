import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Edit, Trash2 } from 'lucide-react';
import { ProductBrandModel } from '@/types/pages/inventory-management/product-brand-models';

export const getColumns = (
  setShowDeleteModal: (id: number | null) => void,
  setShowEditModal: (notification: ProductBrandModel | null) => void,
) => {
  return [
    {
      header: getTranslatedValue('ModelName'),
      accessorKey: 'productBrandModel.modelName',
      sort: 'ProductBrandModel.ModelName',
    },
    {
      header: getTranslatedValue('Brand'),
      accessorKey: 'productBrand.brandName',
      sort: 'ProductBrand.BrandName',
    },

    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => (
        <div className="dv-edit-delete-buttons ">
          {getPermission('WebNet.ProductBrandModels.Edit') && (
            <button
              type="button"
              onClick={() => setShowEditModal(row?.original)}
              className="dv-edit-delete-buttons__delete-button"
            >
              <Edit color="var(--brand-600)" size={20} />
            </button>
          )}
          {getPermission('WebNet.ProductBrandModels.Delete') && (
            <button
              type="button"
              className="dv-edit-delete-buttons__delete-button"
              onClick={() =>
                setShowDeleteModal(row?.original?.productBrandModel?.id)
              }
            >
              <Trash2 color="#F04438" size={20} />
            </button>
          )}
        </div>
      ),
    },
  ];
};
