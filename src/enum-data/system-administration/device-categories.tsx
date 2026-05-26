import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ActionButtons from '@/components/ui/action/action-buttons';
import { StatusIcon } from '@/components/ui/status-icon';

export const deviceCategoriesColumns = ({ onEdit }: { onEdit: any }) => [
  {
    header: getTranslatedValue('Active'),
    accessorKey: 'active',
    sort: 'Active',
    cell: ({ row }: any) => {
      return <>{<StatusIcon status={row?.original?.active} />}</>;
    },
  },
  {
    header: getTranslatedValue('CategoryName'),
    accessorKey: 'categoryName',
    sort: 'CategoryName',
  },
  {
    header: getTranslatedValue('CategoryDescription'),
    accessorKey: 'categoryDescription',
    sort: 'CategoryDescription',
  },
  {
    header: getTranslatedValue('Actions'),
    accessorKey: '',
    sort: '',
    cell: ({ row }: any) => {
      return (
        <ActionButtons
          deleteUrl={`app/device-categories/${row?.original?.id.toString()}?api-version=${
            import.meta.env.VITE_API_VERSION
          }`}
          disabledDelete={!getPermission('WebNet.DeviceCategories.Delete')}
          disabledEdit={!getPermission('WebNet.DeviceCategories.Edit')}
          queryKey={'fetch device categories list'}
          updateHandler={() => {
            onEdit?.(row?.original);
          }}
        />
      );
    },
  },
];
