import { memo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchDeviceModelLabelList } from '@/services/organization-trace/sensor-value-api';
import SelectInput from '@/components/ui/input/select-input/select-input';
import SensorValueHeatmap from './sensor-value-heatmap';
import SensorValueLineChart from './sensor-value-line-chart';
import SensorValueTable from './sensor-value-table';

const MemoSensorValue = () => {
  const treeData = useSelector((state: any) => state?.tree?.info);

  const [activeSelectedLabelId, setActiveSelectedLabelId] = useState('');

  const { data } = useQuery({
    queryKey: ['Device Model Label List', treeData?.deviceModelId],
    queryFn: () =>
      fetchDeviceModelLabelList({
        deviceModelId: treeData?.deviceModelId,
      }),
    retry: false,
    enabled: !!treeData?.deviceModelId,
  });

  useEffect(() => {
    if (data) {
      setActiveSelectedLabelId(data[0].id);
    }
  }, [data]);

  return (
    <div className="sensor-value-container">
      <SensorValueTable />
      <SensorValueHeatmap labelId={activeSelectedLabelId}>
        <SelectInput
          name="sensorHeatMapSelect"
          value={activeSelectedLabelId}
          onChange={(val: any) => setActiveSelectedLabelId(val)}
          options={
            data?.map((item: any) => ({
              value: item.id,
              id: item.id,
              displayName: item.labelCode,
            })) ?? []
          }
        />
      </SensorValueHeatmap>
      <SensorValueLineChart labelId={activeSelectedLabelId} />
    </div>
  );
};

const SensorValue = memo(MemoSensorValue);

export default SensorValue;
