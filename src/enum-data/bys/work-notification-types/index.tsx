import { getTranslatedValue } from '@/helpers/get-translated-value';
import ActionButtons from '@/components/ui/action/action-buttons';
import { getPermission } from '@/helpers/get-permission-helper';

export const workNotificationTypesColumns = ({ onEdit }: { onEdit: any }) => [
  {
    header: getTranslatedValue('WorkNotificationType'),
    accessorKey: 'TypeDescription',
    sort: 'TypeDescription',
    size: 200,
    cell: ({ row }: any) => {
      const info = row?.original;
      return <>{info?.typeDescription ?? '-'}</>;
    },
  },
  {
    header: getTranslatedValue('Actions'),
    accessorKey: '',
    sort: '',
    size: 200,
    cell: ({ row }: any) => {
      return (
        <ActionButtons
          deleteUrl={`app/work-notification-types/${row?.original?.id.toString()}?api-version=${
            import.meta.env.VITE_API_VERSION
          }`}
          disabledDelete={!getPermission('WebNet.WorkNotificationTypes.Delete')}
          disabledEdit={!getPermission('WebNet.WorkNotificationTypes.Edit')}
          queryKey={'Get Work Notification Types List'}
          updateHandler={() => {
            onEdit?.(row?.original);
          }}
        />
      );
    },
  },
];
