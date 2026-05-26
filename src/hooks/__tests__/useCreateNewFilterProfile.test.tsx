import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateNewFilterProfile, useUpdateFilterProfile } from '../useCreateNewFilterProfile';
import type { ReactNode } from 'react';

// Mocks
const createNewFilterProfileMock = vi.fn();
const updateFilterProfileMock = vi.fn();
const toastSuccessMock = vi.fn();
const toastErrorMock = vi.fn();
const getTranslatedValueMock = vi.fn((k: string) => k);

vi.mock('@/services/reports/filter-profiles-apis', () => ({
  createNewFilterProfile: (...args: unknown[]) => createNewFilterProfileMock(...args),
  updateFilterProfile: (...args: unknown[]) => updateFilterProfileMock(...args),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccessMock(...args),
    error: (...args: unknown[]) => toastErrorMock(...args),
  },
}));

vi.mock('@/helpers/get-translated-value', () => ({
  getTranslatedValue: (...args: unknown[]) => getTranslatedValueMock(...(args as [string])),
}));

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useCreateNewFilterProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls toast success, invalidates and resets on success', async () => {
    const responseData = { id: 10 };
    createNewFilterProfileMock.mockResolvedValueOnce(responseData);

    const invalidateQueries = vi.fn();
    const resetAddState = vi.fn();

    const { result } = renderHook(
      () => useCreateNewFilterProfile({ invalidateQueries, resetAddState }),
      { wrapper: createWrapper() }
    );

    const formData = { name: 'profile' };
    await result.current.mutateAsync(formData as any);

    await waitFor(() => {
      expect(toastSuccessMock).toHaveBeenCalledWith('SaveSuccess');
    });
    expect(invalidateQueries).toHaveBeenCalled();
    expect(resetAddState).toHaveBeenCalledWith(responseData);
    expect(createNewFilterProfileMock).toHaveBeenCalledWith(formData);
  });

  it('calls toast error on failure', async () => {
    const error = { response: { data: { error: { message: 'X failed' } } } };
    createNewFilterProfileMock.mockRejectedValueOnce(error);

    const { result } = renderHook(
      () => useCreateNewFilterProfile({ invalidateQueries: vi.fn(), resetAddState: vi.fn() }),
      { wrapper: createWrapper() }
    );

    await result.current.mutateAsync({} as any).catch(() => {});

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith('X failed');
    });
  });
});

describe('useUpdateFilterProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls toast success with Updated on success', async () => {
    updateFilterProfileMock.mockResolvedValueOnce({});

    const { result } = renderHook(() => useUpdateFilterProfile(), { wrapper: createWrapper() });

    await result.current.mutateAsync({ id: 1 } as any);

    await waitFor(() => {
      expect(toastSuccessMock).toHaveBeenCalledWith('Updated');
    });
  });

  it('calls toast error on failure', async () => {
    const error = { response: { data: { error: { message: 'Update failed' } } } };
    updateFilterProfileMock.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useUpdateFilterProfile(), { wrapper: createWrapper() });

    await result.current.mutateAsync({ id: 1 } as any).catch(() => {});

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith('Update failed');
    });
  });
});


