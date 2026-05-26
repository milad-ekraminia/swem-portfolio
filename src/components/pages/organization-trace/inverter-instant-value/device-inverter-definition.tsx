import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchDeviceInverterDefinition } from '@/services/organization-trace/inverter-instant-value-api';
import DeviceInverterDefinitionCard from './device-inverter-definition-card';

export default function DeviceInverterDefinition() {
  const treeData = useSelector((state: any) => state?.tree?.info);
  const { data: responseData, isLoading } = useQuery({
    queryKey: ['Device Inverter Definition', treeData?.tree_id],
    queryFn: () =>
      fetchDeviceInverterDefinition({ tree_id: treeData?.tree_id }),
    retry: false,
    enabled: !!treeData?.tree_id,
  });

  return (
    <div className="device-inverter-definition">
      <DeviceInverterDefinitionCard
        isLoading={isLoading}
        title="DeviceACRatedPower"
        value={responseData?.deviceACRatedPower || 0}
        unit="kWe"
        type="warning"
      />
      <DeviceInverterDefinitionCard
        isLoading={isLoading}
        title="DeviceDCRatedPower"
        value={responseData?.deviceDCRatedPower || 0}
        unit="kWp"
        type="success"
      />
      <DeviceInverterDefinitionCard
        isLoading={isLoading}
        title="DeviceACLimitedPower"
        value={responseData?.deviceACLimitedPower || 0}
        unit="kWe"
        type="info"
      />
    </div>
  );
}
