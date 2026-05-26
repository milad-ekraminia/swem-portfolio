import { useDownloadFile } from '@/hooks/use-download-file';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

// Mock React hooks
vi.mock('react', async () => {
  const actualReact = await vi.importActual('react');
  return {
    ...actualReact,
    useState: vi.fn(() => [false, vi.fn()]),
    useEffect: vi.fn(),
  };
});

vi.mock('@/helpers/download-excel-export', () => ({
  downloadExcelFileTokenApi: vi.fn(async () => ({ token: 'TOKEN' })),
  downloadGetMethodExcelFile: vi.fn(async () => undefined),
}));

vi.mock('@/lib/api-method/api-error-handler', () => ({
  apiErrorHandler: vi.fn(async (e: unknown) => ({ error: String(e) })),
}));

vi.mock('@/helpers/error-boundary/toast-error', () => ({
  toastError: vi.fn(),
}));

describe('useDownloadFile', () => {
  const originalEnv = { ...import.meta.env } as Record<string, string>;

  beforeEach(() => {
    (import.meta as any).env = { ...originalEnv, VITE_API_VERSION: '1.0' };
  });

  afterEach(() => {
    (import.meta as any).env = originalEnv;
    vi.restoreAllMocks();
  });

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const client = new QueryClient();
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };

  it('builds URL based on token and triggers download', async () => {
    const { result } = renderHook(() => useDownloadFile(), { wrapper });
    const { downloadExcelFileTokenApi, downloadGetMethodExcelFile } = await import(
      '@/helpers/download-excel-export'
    );

    await act(async () => {
      result.current.downloadHandler({
        excelUrl: '/export/excel',
        fileName: 'Report',
        getTokenUrl: '/token',
      });
    });

    expect(downloadExcelFileTokenApi).toHaveBeenCalledWith(
      expect.objectContaining({ url: '/token?api-version=1.0' }),
    );
    expect(downloadGetMethodExcelFile).toHaveBeenCalled();
  });

  it('appends FilterText when search input provided', async () => {
    const { result } = renderHook(() => useDownloadFile(), { wrapper });
    const { downloadGetMethodExcelFile } = await import('@/helpers/download-excel-export');

    await act(async () => {
      result.current.downloadHandler({
        excelUrl: '/export/excel',
        fileName: 'Report',
        getTokenUrl: '/token',
        searchInputValue: 'abc',
      });
    });

    const call = (downloadGetMethodExcelFile as unknown as Mock).mock.calls.pop();
    expect(call?.[0].excelUrl).toContain('FilterText=abc');
  });

  it('uses Token and FileType when url contains import-users-sample-file', async () => {
    const { result } = renderHook(() => useDownloadFile(), { wrapper });
    const { downloadGetMethodExcelFile } = await import('@/helpers/download-excel-export');

    await act(async () => {
      result.current.downloadHandler({
        excelUrl: '/import-users-sample-file',
        fileName: 'Sample',
        getTokenUrl: '/token',
      });
    });

    const call = (downloadGetMethodExcelFile as unknown as Mock).mock.calls.pop();
    expect(call?.[0].excelUrl).toContain('Token=TOKEN');
    expect(call?.[0].excelUrl).toContain('FileType=1');
  });
});


