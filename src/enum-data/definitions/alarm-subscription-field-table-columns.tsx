import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Trash2 } from 'lucide-react';
import {
  userNotificationPeriodTypeOptions,
  userNotificationTypeOptions,
} from './enum';

export const AlarmSubscriptionFieldTableColumns = ({
  usersLookupResponse,
  onDelete,
}: {
  usersLookupResponse: any[];
  onDelete: (row: any) => void;
}) => [
    {
      header: getTranslatedValue('em_user_login_name'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => {
        return (
          <>
            {usersLookupResponse?.find((_) => _?.id == row?.original?.userId)
              ?.displayName ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('em_user_notification_type'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => {
        return (
          <>
            {userNotificationTypeOptions?.find(
              (_) => _?.value === row?.original?.notificationType,
            )?.title ?? '-'}
          </>
        );
      },
    },
    {
      header: getTranslatedValue('em_user_notification_period'),
      accessorKey: '',
      sort: '',
      cell: ({ row }: any) => {
        return (
          <>
            {userNotificationPeriodTypeOptions?.find(
              (_) => _?.value === row?.original?.notificationPeriod,
            )?.title ?? '-'}
          </>
        );
      },
    },

    {
      header: getTranslatedValue('Actions'),
      accessorKey: '',
      sort: '',
      size: 50,
      cell: ({ row }: any) => {
        return (
          <button
            type="button"
            className="dv-edit-delete-buttons__delete-button"
            style={{ background: 'none' }}
            onClick={() => {
              onDelete(row?.original);
            }}
          >
            <Trash2 color="#F04438" size={20} />
          </button>
        );
      },
    },
  ];
