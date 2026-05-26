import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useLabelByDevice from '../use-label-by-device';
import type { ReactNode } from 'react';

// Mocks for services
const fetchDevicesMock = vi.fn();
const fetchLabelsByDeviceMock = vi.fn();
const fetchAllLabelsMock = vi.fn();

vi.mock('@/services/organization-trace/graphics', () => ({
  fetchDevices: (...args: unknown[]) => fetchDevicesMock(...args),
  fetchLabelsByDevice: (...args: unknown[]) => fetchLabelsByDeviceMock(...args),
  fetchAllLabels: (...args: unknown[]) => fetchAllLabelsMock(...args),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useLabelByDevice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches devices, labels (when deviceId provided), and all labels', async () => {
    fetchDevicesMock.mockResolvedValueOnce({ items: [{ id: 1 }, { id: 2 }] });
    fetchLabelsByDeviceMock.mockResolvedValueOnce({ items: [{ l: 'A' }] });
    fetchAllLabelsMock.mockResolvedValueOnce(['L1', 'L2']);

    const { result } = renderHook(() => useLabelByDevice({ deviceId: 42 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetchDevicesMock).toHaveBeenCalledTimes(1);
    expect(fetchLabelsByDeviceMock).toHaveBeenCalledWith({ deviceId: 42 });
    expect(fetchAllLabelsMock).toHaveBeenCalledTimes(1);

    expect(result.current.devices).toEqual([{ id: 1 }, { id: 2 }]);
    expect(result.current.labels).toEqual([{ l: 'A' }]);
    expect(result.current.allLabels).toEqual(['L1', 'L2']);
  });

  it('does not fetch labels when deviceId is undefined (enabled=false)', async () => {
    fetchDevicesMock.mockResolvedValueOnce({ items: [] });
    fetchAllLabelsMock.mockResolvedValueOnce(['L1']);

    const { result } = renderHook(() => useLabelByDevice({ deviceId: undefined }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetchDevicesMock).toHaveBeenCalledTimes(1);
    expect(fetchLabelsByDeviceMock).not.toHaveBeenCalled();
    expect(fetchAllLabelsMock).toHaveBeenCalledTimes(1);

    expect(result.current.labels).toBeUndefined();
  });

  it('exposes loading state while queries are in-flight', async () => {
    let resolveDevices: (v: unknown) => void;
    let resolveLabels: (v: unknown) => void;
    let resolveAll: (v: unknown) => void;

    const devicesPromise = new Promise((res) => (resolveDevices = res));
    const labelsPromise = new Promise((res) => (resolveLabels = res));
    const allPromise = new Promise((res) => (resolveAll = res));

    fetchDevicesMock.mockReturnValueOnce(devicesPromise);
    fetchLabelsByDeviceMock.mockReturnValueOnce(labelsPromise);
    fetchAllLabelsMock.mockReturnValueOnce(allPromise);

    const { result } = renderHook(() => useLabelByDevice({ deviceId: 7 }), {
      wrapper: createWrapper(),
    });

    // Initially loading since promises are unresolved
    expect(result.current.isLoading).toBe(true);

    // Resolve all
    resolveDevices!({ items: [{ id: 'd' }] });
    resolveLabels!({ items: [{ l: 'x' }] });
    resolveAll!(['L1']);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.devices).toEqual([{ id: 'd' }]);
    expect(result.current.labels).toEqual([{ l: 'x' }]);
    expect(result.current.allLabels).toEqual(['L1']);
  });
});


