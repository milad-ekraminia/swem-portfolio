import { formatDate } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';

export const plantTransferLogsTableColumns = () => [
  {
    header: getTranslatedValue('record'),
    accessorKey: 'stockChange.description',
    sort: 'stockChange.record',
    size: 800,
    cell: ({ row }: any) => {
      return (
        <div className="transfer-description">
          <div
            aria-label="transfer-indicator"
            className={`transfer-indicator ${
              row?.original?.stockChange?.transferCode.includes('Input')
                ? 'input'
                : 'output'
            }`}
          >
            <div className="indicator-dot" />
          </div>
          &nbsp;
          <span>{row?.original?.stockChange?.description}</span>
        </div>
      );
    },
  },
  {
    header: getTranslatedValue('Date'),
    accessorKey: 'stockChange.creationTime',
    sort: '',
    size: 900,
    cell: ({ row }: any) => {
      const creationTime = row?.original?.stockChange?.creationTime;
      return <>{formatDate(creationTime)}</>;
    },
  },
];
