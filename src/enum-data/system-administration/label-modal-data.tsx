import { getTranslatedValue } from '@/helpers/get-translated-value';
import { PlusCircle, Trash2 } from 'lucide-react';
import ActionDeleteButtons from '@/components/ui/action/action-delete-buttons';
import SelectInputPortal from '@/components/ui/input/select-input-with-portal/select-input-with-portal';

export const labelModalColumns = ({
  filteredDeviceType,
  setDeviceTypeId,
  onSubmitDeviceTypeId,
  deviceTypeId,
  deviceModelTypeList,
  handleRemoveDetail,
  isEdit,
  allData,
}: {
  onEdit: any;
  filteredDeviceType: any;
  setDeviceTypeId: any;
  onSubmitDeviceTypeId: any;
  deviceTypeId: any;
  deviceModelTypeList: any;
  handleRemoveDetail: any;
  isEdit?: any;
  allData?: any;
}) => [
  {
    header: getTranslatedValue('DeviceModelName'),
    accessorKey: 'DeviceModelName',
    size: 500,
    cell: ({ row }: any) => {
      const info = row?.original;
      if (info?.firstRow) {
        return (
          <SelectInputPortal
            name={'deviceTypeId'}
            placeholder={getTranslatedValue('SelectDeviceModel')}
            options={
              filteredDeviceType?.map(({ value, title }: any) => ({
                displayName: title,
                value,
              })) || []
            }
            value={deviceTypeId}
            onChange={(value) => {
              setDeviceTypeId(value);
            }}
            // error={fieldState.error?.message}
            openDirection="down"
            portalClassName='max-h-200'
          />
        );
      }
      return (
        <>
          {
            deviceModelTypeList?.find((item: any) => +item?.value === +info?.id)
              ?.title
          }
        </>
      );
    },
  },

  {
    header: getTranslatedValue('Actions'),
    accessorKey: 'actions',
    size: 170,
    cell: ({ row }: any) => {
      const info = row?.original;
      const data = allData?.find(
        (item: any) => item?.deviceTypeId === info?.id,
      );
      const deleteId = data?.id;
      if (info?.firstRow) {
        return (
          <button
            type="button"
            onClick={() => onSubmitDeviceTypeId(deviceTypeId)}
          >
            <PlusCircle stroke="#2E90FA" />
          </button>
        );
      }
      return (
        <div className="dv-edit-delete-buttons">
          {isEdit ? (
            <ActionDeleteButtons
              deleteUrl={`app/device-type-labels/${deleteId}?api-version=${
                import.meta.env.VITE_API_VERSION
              }`}
              queryKey={'get device type label list'}
            />
          ) : (
            <button
              type="button"
              className="dv-edit-delete-buttons__delete-button"
              onClick={() => handleRemoveDetail(info?.id, info?.index)}
            >
              <Trash2 color="#F04438" size={20} />
            </button>
          )}
        </div>
      );
    },
  },
];
