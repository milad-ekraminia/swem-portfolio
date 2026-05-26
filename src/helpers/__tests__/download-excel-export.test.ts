import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  downloadExcelFileApiWithRow,
  downloadExcelFileApi,
  downloadExcelFileApiWithoutRow,
  downloadExcelFileTokenApi,
  downloadExcelFileWithUseTokenApi,
  downloadExcelFile,
  downloadGetMethodExcelFile,
} from '@/helpers/download-excel-export';

vi.mock('@/lib/api-method/api-method-functions', () => ({
  getData: vi.fn(async (args: unknown) => ({ ok: true, args })),
  getFormDataPost: vi.fn(async (args: unknown) => ({ ok: true, args })),
}));

vi.mock('@/helpers/cookies', () => ({
  getCookie: vi.fn(() => 'TEST_TOKEN'),
}));

const ensureAtob = () => {
  if (typeof globalThis.atob === 'undefined') {
    (globalThis as unknown as { atob: (input: string) => string }).atob = (input: string) =>
      Buffer.from(input, 'base64').toString('binary');
  }
};

describe('download-excel-export helpers', () => {
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.useFakeTimers();
    ensureAtob();
  });

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    (globalThis as unknown as { fetch?: typeof fetch }).fetch = originalFetch;
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('API wrappers delegate to api-method functions', async () => {
    const { getData, getFormDataPost } = await import('@/lib/api-method/api-method-functions');
    await downloadExcelFileApiWithRow({ url: '/x', formData: { a: 1 } });
    expect(getFormDataPost).toHaveBeenCalledWith({ endPoint: '/x', formData: { a: 1 }, type: 'post' });

    await downloadExcelFileApi({ url: '/y' });
    expect(getData).toHaveBeenCalledWith({ endPoint: '/y', type: 'get' });

    await downloadExcelFileApiWithoutRow({ url: '/z', formData: { b: 2 } });
    expect(getData).toHaveBeenCalledWith({ endPoint: '/z', type: 'post', dataParams: { b: 2 }, isHeaderJson: true });

    await downloadExcelFileTokenApi({ url: '/t' });
    expect(getData).toHaveBeenCalledWith({ endPoint: '/t', type: 'get' });

    await downloadExcelFileWithUseTokenApi({ url: '/u', formData: { c: 3 } });
    expect(getData).toHaveBeenCalledWith({ endPoint: '/u', type: 'get', dataParams: { c: 3 } });
  });

  it('downloadExcelFile decodes base64, creates blob and triggers click', async () => {
    const blobUrl = 'blob:mock-url';
    const clickMock = vi.fn();
    URL.createObjectURL = vi.fn().mockReturnValue(blobUrl);
    URL.revokeObjectURL = vi.fn();

    // Mock anchor element
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = originalCreateElement(tag);
      if (tag === 'a') {
        Object.defineProperty(el, 'click', { value: clickMock });
      }
      return el;
    });

    const sampleBinary = 'Hello';
    const base64 = Buffer.from(sampleBinary, 'binary').toString('base64');

    await downloadExcelFile({ response: base64, fileName: 'Report' });

    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalledTimes(1);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(blobUrl);
  });

  it('downloadGetMethodExcelFile fetches and downloads file', async () => {
    const blobUrl = 'blob:mock-url-2';
    URL.createObjectURL = vi.fn().mockReturnValue(blobUrl);
    URL.revokeObjectURL = vi.fn();

    const clickMock = vi.fn();
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = originalCreateElement(tag);
      if (tag === 'a') {
        Object.defineProperty(el, 'click', { value: clickMock });
      }
      return el;
    });

    const blobData = new Blob([new Uint8Array([1, 2, 3])], { type: 'application/octet-stream' });
    (globalThis as unknown as { fetch: typeof fetch }).fetch = vi.fn(async () => ({
      ok: true,
      blob: async () => blobData,
    })) as unknown as typeof fetch;

    await downloadGetMethodExcelFile({ excelUrl: '/export', fileName: 'Data' });

    expect(fetch).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalledTimes(1);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(blobUrl);
  });

  it('downloadGetMethodExcelFile throws on non-ok response', async () => {
    (globalThis as unknown as { fetch: typeof fetch }).fetch = vi.fn(async () => ({
      ok: false,
      blob: async () => new Blob(),
    })) as unknown as typeof fetch;

    await expect(downloadGetMethodExcelFile({ excelUrl: '/bad', fileName: 'Bad' })).rejects.toThrow(
      'Failed to download the Excel file',
    );
  });
});


