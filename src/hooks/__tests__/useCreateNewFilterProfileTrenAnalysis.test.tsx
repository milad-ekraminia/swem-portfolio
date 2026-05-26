import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import {
  useCreateNewFilterProfileTrendAnalyse,
  useUpdateFilterProfileTrendAnalyse,
} from '../useCreateNewFilterProfileTrenAnalysis';

// Mocks
const createNewFilterProfileTrendAnalyseMock = vi.fn();
const updateFilterProfileTrendAnalyseMock = vi.fn();
const toastSuccessMock = vi.fn();
const toastErrorMock = vi.fn();
const getTranslatedValueMock = vi.fn((k: string) => k);

vi.mock('@/services/organization-trace/trend-analyse-page-filter-profiles-apis', () => ({
  createNewFilterProfileTrendAnalyse: (...args: unknown[]) =>
    createNewFilterProfileTrendAnalyseMock(...args),
}));

vi.mock('@/services/reports/filter-profiles-apis', () => ({
  updateFilterProfileTrendAnalyse: (...args: unknown[]) =>
    updateFilterProfileTrendAnalyseMock(...args),
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
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useCreateNewFilterProfileTrendAnalyse', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows success toast, invalidates and resets on success', async () => {
    const responseData = { id: 5 };
    createNewFilterProfileTrendAnalyseMock.mockResolvedValueOnce(responseData);

    const invalidateQueries = vi.fn();
    const resetAddState = vi.fn();

    const { result } = renderHook(
      () =>
        useCreateNewFilterProfileTrendAnalyse({
          invalidateQueries,
          resetAddState,
        }),
      { wrapper: createWrapper() },
    );

    const formData = { name: 't' };
    await result.current.mutateAsync(formData as any);

    await waitFor(() => {
      expect(toastSuccessMock).toHaveBeenCalledWith('SaveSuccess');
    });
    expect(invalidateQueries).toHaveBeenCalled();
    expect(resetAddState).toHaveBeenCalledWith(responseData);
    expect(createNewFilterProfileTrendAnalyseMock).toHaveBeenCalledWith(formData);
  });

  it('shows error toast on failure', async () => {
    const error = { response: { data: { error: { message: 'Create failed' } } } };
    createNewFilterProfileTrendAnalyseMock.mockRejectedValueOnce(error);

    const { result } = renderHook(
      () =>
        useCreateNewFilterProfileTrendAnalyse({
          invalidateQueries: vi.fn(),
          resetAddState: vi.fn(),
        }),
      { wrapper: createWrapper() },
    );

    await result.current.mutateAsync({} as any).catch(() => {});

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith('Create failed');
    });
  });
});

describe('useUpdateFilterProfileTrendAnalyse', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows Updated success toast on success', async () => {
    updateFilterProfileTrendAnalyseMock.mockResolvedValueOnce({});

    const { result } = renderHook(
      () => useUpdateFilterProfileTrendAnalyse(),
      { wrapper: createWrapper() },
    );

    await result.current.mutateAsync({ id: 1 } as any);

    await waitFor(() => {
      expect(toastSuccessMock).toHaveBeenCalledWith('Updated');
    });
  });

  it('shows error toast on failure', async () => {
    const error = { response: { data: { error: { message: 'Update failed' } } } };
    updateFilterProfileTrendAnalyseMock.mockRejectedValueOnce(error);

    const { result } = renderHook(
      () => useUpdateFilterProfileTrendAnalyse(),
      { wrapper: createWrapper() },
    );

    await result.current.mutateAsync({ id: 1 } as any).catch(() => {});

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith('Update failed');
    });
  });
});


