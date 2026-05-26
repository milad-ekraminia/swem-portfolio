import { useQuery } from '@tanstack/react-query';
import {
  fetchAllLabels,
  fetchDevices,
  fetchLabelsByDevice,
} from '@/services/organization-trace/graphics';

function useLabelByDevice({ deviceId }: { deviceId?: any }) {
  const { data: devices, isLoading: isLoadingDevices } = useQuery({
    queryKey: ['fetch devices'],
    queryFn: () => fetchDevices(),
    retry: false,
  });
  const { data: labels, isLoading: isLoadingLabels } = useQuery({
    queryKey: ['fetch labels', deviceId],
    queryFn: () =>
      fetchLabelsByDevice({
        deviceId,
      }),
    enabled: deviceId !== null && deviceId !== undefined,
    retry: false,
  });
  const { data: allLabels } = useQuery({
    queryKey: ['fetch all labels'],
    queryFn: () => fetchAllLabels(),
    retry: false,
  });

  return {
    devices: devices?.items,
    labels: labels?.items,
    isLoading: isLoadingDevices || isLoadingLabels,
    isLoadingDevices,
    allLabels,
  };
}

export default useLabelByDevice;
