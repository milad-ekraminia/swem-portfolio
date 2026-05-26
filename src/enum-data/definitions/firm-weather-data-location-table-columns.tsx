import { getPermission } from '@/helpers/get-permission-helper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import ActionDeleteButtons from '@/components/ui/action/action-delete-buttons';

export const FirmWeatherDataLocationTableColumns = ({
  queryKey,
  firmWeatherDataLocationsListData,
}: {
  queryKey: string;
  firmWeatherDataLocationsListData: any;
}) => [
  {
    header: getTranslatedValue('LocationName'),
    accessorKey: 'displayName',
    sort: '',
    cell: ({ row }: any) => {
      const info = row?.original;
      return info?.displayName ?? '-';
    },
  },
  ...(getPermission('WebNet.SystemWeatherDataLocationOWMS.Delete')
    ? [
        {
          id: 'actions',
          header: getTranslatedValue('Actions'),
          sort: '',
          cell: ({ row }: any) => {
            const owmsId = firmWeatherDataLocationsListData?.find(
              (item: any) => item.weatherDataLocationId === row?.original?.id,
            )?.id;

            return (
              <ActionDeleteButtons
                deleteUrl={`app/firm-weather-data-location-oWMS/${owmsId ?? ''}?api-version=${import.meta.env.VITE_API_VERSION}`}
                queryKey={queryKey}
                
              />
            );
          },
        },
      ]
    : []),
];
