import Table from '@/components/ui/table/table';
import { GlobalTableHeader } from '@/components/ui/table/table-head/global-table-header';
import { deviceModelTypeList } from '@/enum-data/definitions/enum';
import { labelModalColumns as basicColumns } from '@/enum-data/system-administration/label-modal-data';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  createNewDeviceType,
  deleteDeviceTypeLabel,
  fetchDeviceTypeLabelList,
} from '@/services/system-administration/bys/labels-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useEffect, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';

type Props = {
  labelId: number;
  isEdit?: boolean;
  setValue: (name: string, value: any) => void;
  control: any;
  reset: (values: any) => void;
  info: any;
};

const MemoDeviceTypeLabelField = ({
  labelId,
  isEdit = false,
  setValue,
  control,
  reset,
  info,
}: Props) => {
  const queryClient = useQueryClient();
  const [deviceTypeId, setDeviceTypeId] = useState<number | null>(null);

  const { data, refetch } = useQuery({
    queryKey: ['get device type label list', labelId],
    queryFn: () => fetchDeviceTypeLabelList(labelId),
    enabled: !!labelId,
    retry: false,
  });

  const deviceTypeLabelList: number[] =
    useWatch({ control, name: 'deviceTypeLabelList' }) as unknown as any ?? [];

  const handleApiError = async (error: any) => {
    const err = await apiErrorHandler(error);
    toastError(err?.error);
  };

  const mutationAddDeviceType = useMutation({
    mutationFn: createNewDeviceType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get device type label list', labelId],
      });
      refetch();
    },
    onError: handleApiError,
  });

  const mutationDeleteDeviceTypeLabel = useMutation({
    mutationFn: deleteDeviceTypeLabel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get device type label list'],
      });
    },
    onError: handleApiError,
  });

  const onSubmitDeviceTypeId = (id: number) => {
    if (isEdit) {
      mutationAddDeviceType.mutate({ labelId, deviceTypeId: id });
    } else {
      setValue('deviceTypeLabelList', [...deviceTypeLabelList, id]);
    }
  };

  const handleRemoveDetail = (id: number, index: number) => {
    if (isEdit) {
      mutationDeleteDeviceTypeLabel.mutate(id);
    } else {
      const updatedList = [...deviceTypeLabelList];
      updatedList.splice(index, 1);
      setValue('deviceTypeLabelList', updatedList);
    }
  };

  // Reset + Populate deviceTypeLabelList
  useEffect(() => {
    if (!info || !labelId) return;

    reset({ ...info });

    if (isEdit && data?.items) {
      const ids = data.items.map((item: any) => item.deviceTypeId);
      setValue('deviceTypeLabelList', [...ids]);
    }
  }, [info, reset, labelId, data?.items, isEdit, setValue]);

  const filteredDeviceType = deviceModelTypeList?.filter((item) =>
    isEdit
      ? data?.items?.every((info: any) => info.deviceTypeId !== item.value)
      : deviceTypeLabelList?.every((id: number) => id !== item.value),
  );

  const columns = useMemo(
    () =>
      basicColumns({
        onEdit: () => { },
        filteredDeviceType,
        setDeviceTypeId,
        onSubmitDeviceTypeId,
        deviceTypeId,
        deviceModelTypeList,
        handleRemoveDetail,
        isEdit,
        allData: data?.items,
      }),
    [
      filteredDeviceType,
      onSubmitDeviceTypeId,
      deviceTypeId,
      handleRemoveDetail,
      isEdit,
      data?.items,
    ],
  );

  const tableData: any = [
    { firstRow: true },
    ...deviceTypeLabelList.map((id, index) => ({ id, index })),
  ];

  const header = useMemo(
    () => (
      <GlobalTableHeader
        label="LabelDeviceType"
        hasFilterTable={false}
        columnOrder={[]}
        selectedColumnKeys={[]}
        setColumnOrder={() => { }}
        setSelectedColumnKeys={() => { }}
        tableColumns={<></>}
      />
    ),
    [],
  );

  return <Table headerChildren={header} data={tableData} columns={columns} />;
};

const DeviceTypeLabelField = memo(MemoDeviceTypeLabelField);

export default DeviceTypeLabelField;
