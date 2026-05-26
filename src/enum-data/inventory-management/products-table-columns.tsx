import { getDisplayName } from '@/helpers/get-display-name';
import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ActionButtons from '@/components/ui/action/action-buttons';
import { StatusIcon } from '@/components/ui/status-icon';

export const ProductsTableColumns = ({
  brands,
  brandModels,
  manufacturers,
  types,
  onEdit,
  queryKey,
}: {
  brands: any;
  brandModels: any;
  manufacturers: any;
  types: any;
  onEdit?: (row: any) => void;
  queryKey: string;
}) => [
  {
    header: getTranslatedValue('ProductName'),
    accessorKey: 'product.productName',
    sort: 'Product.ProductName',
  },
  {
    header: getTranslatedValue('BarcodeNumber'),
    accessorKey: 'product.barcodeNumber',
    sort: 'Product.BarcodeNumber',
  },
  {
    header: getTranslatedValue('CurrentStockAmount'),
    accessorKey: 'product.currentStockAmount',
    sort: 'Product.CurrentStockAmount',
  },
  {
    header: getTranslatedValue('PurchaseNumber'),
    accessorKey: 'product.purchaseNumber',
    sort: 'Product.PurchaseNumber',
  },
  {
    header: getTranslatedValue('Status'),
    accessorKey: 'product.status',
    sort: 'Product.Status',
    size: 50,
    cell: ({ row }: any) => {
      return <>{<StatusIcon status={row?.original?.product?.status} />}</>;
    },
  },
  {
    header: getTranslatedValue('IsConsumable'),
    accessorKey: 'product.isConsumable',
    sort: 'Product.IsConsumable',
    size: 80,
    cell: ({ row }: any) => {
      return (
        <>{<StatusIcon status={row?.original?.product?.isConsumable} />}</>
      );
    },
  },
  {
    header: getTranslatedValue('StockNumber'),
    accessorKey: 'product.stockNumber',
    sort: 'Product.StockNumber',
  },
  {
    header: getTranslatedValue('ProductBrand'),
    accessorKey: 'productBrand.id',
    sort: 'ProductBrand.BrandName',
    size: 80,
    cell: ({ row }: any) => {
      return (
        <>
          {brands
            ? getDisplayName(row?.original?.productBrand?.id, brands.items)
            : '-'}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('ProductBrandModel'),
    accessorKey: 'productBrandModel.id',
    sort: 'ProductBrandModel.ModelName',
    size: 85,
    cell: ({ row }: any) => {
      return (
        <>
          {brandModels
            ? getDisplayName(
                row?.original?.productBrandModel?.id,
                brandModels.items,
              )
            : '-'}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('ProductManufacturers'),
    accessorKey: 'productManufacturer.id',
    sort: 'ProductManufacturer.ManufacturerTitle',
    size: 100,
    cell: ({ row }: any) => {
      return (
        <>
          {manufacturers
            ? getDisplayName(
                row?.original?.productManufacturer?.id,
                manufacturers.items,
              )
            : '-'}
        </>
      );
    },
  },
  {
    header: getTranslatedValue('ProductType'),
    accessorKey: 'productType.id',
    sort: 'ProductType.Name',
    size: 120,
    cell: ({ row }: any) => {
      return (
        <>
          {types
            ? getDisplayName(row?.original?.productType?.id, types.items)
            : '-'}
        </>
      );
    },
  },

  {
    header: getTranslatedValue('Actions'),
    accessorKey: '',
    sort: '',
    size: 80,
    cell: ({ row }: any) => {
      return (
        <ActionButtons
          deleteUrl={`app/products/${row?.original?.product?.id}?api-version=${import.meta.env.VITE_API_VERSION}`}
          queryKey={queryKey}
          disabledDelete={!getPermission('WebNet.Products.Delete')}
          disabledEdit={!getPermission('WebNet.Products.Edit')}
          updateHandler={() => {
            if (getPermission('WebNet.Products.Edit')) {
              onEdit?.(row?.original);
            }
          }}
        />
      );
    },
  },
];
