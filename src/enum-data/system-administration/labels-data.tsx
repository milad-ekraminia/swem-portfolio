import ActionButtons from '@/components/ui/action/action-buttons';
import StatusTagCircle from '@/components/ui/status-tag-circle.tsx/status-tag-circle';
import { lableDataTypeList } from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Check, X } from 'lucide-react';
import { getPermission } from '@/helpers/get-permission-helper';

export const labelsColumns = ({ onEdit }: { onEdit: any }) => [
  {
    header: getTranslatedValue('LabelName'),
    accessorKey: 'labelName',
    sort: 'labelName',
    size: 100,
  },
  {
    header: getTranslatedValue('LabelCode'),
    accessorKey: 'labelCode',
    sort: 'labelCode',
    size: 100,
  },
  {
    header: getTranslatedValue('LabelGroup'),
    accessorKey: 'labelGroup',
    sort: 'labelGroup',
    size: 100,
    cell: ({ row }: any) => {
      const info = row?.original;
      return <>{getTranslatedValue(info?.labelGroup)}</>;
    },
  },
  {
    header: getTranslatedValue('LabelDataType'),
    accessorKey: 'labelDataTypeId',
    sort: 'labelDataTypeId',
    size: 100,
    cell: ({ row }: any) => {
      const info: any = row?.original;
      const id: 0 | 1 | 2 | 3 | 4 | 5 | 6 = info?.labelDataTypeId;
      return <>{lableDataTypeList[id]}</>;
    },
  },
  {
    header: getTranslatedValue('DefinitionFlag'),
    accessorKey: 'definitionFlag',
    size: 100,
    cell: ({ row }: any) => {
      const info = row?.original;
      const color = info?.alarmDefinitionFlag ? 'success' : 'orange';
      return (
        <StatusTagCircle
          color={color}
          label={
            !info?.alarmDefinitionFlag ? (
              <X size={14} color="red" />
            ) : (
              <Check size={14} color="green" />
            )
          }
        />
      );
    },
  },

  {
    header: getTranslatedValue('Actions'),
    accessorKey: 'actions',
    size: 130,
    cell: ({ row }: any) => {
      return (
        <ActionButtons
          deleteUrl={`app/labels/${row?.original?.id.toString()}?api-version=${import.meta.env.VITE_API_VERSION
            }`}
          queryKey={'labels list'}
          disabledDelete={!getPermission('WebNet.Labels.Delete')}
          disabledEdit={!getPermission('WebNet.Labels.Edit')}
          updateHandler={() => {
            onEdit?.(row?.original);
          }}
        />
      );
    },
  },
];
