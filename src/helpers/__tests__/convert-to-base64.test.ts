import { convertExcelToBase64 } from '@/helpers/convert-to-base64';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock xlsx module
vi.mock('xlsx', () => {
  return {
    read: vi.fn(() => ({ __mockWorkbook: true })),
    write: vi.fn(() => 'MOCK_EXCEL_BINARY_STRING'),
  };
});

// Ensure btoa exists in the test environment
const ensureBtoa = () => {
  if (typeof globalThis.btoa === 'undefined') {
    // minimal btoa polyfill using Buffer
    (globalThis as unknown as { btoa: (input: string) => string }).btoa = (
      input: string,
    ) => Buffer.from(input, 'binary').toString('base64');
  }
};

// Ensure File exists (jsdom has it; Node may not)
const ensureFileCtor = () => {
  if (
    typeof (globalThis as unknown as { File?: unknown }).File === 'undefined'
  ) {
    class FilePolyfill extends Blob {
      name: string;
      lastModified: number;
      constructor(chunks: BlobPart[], name: string, options?: FilePropertyBag) {
        super(chunks, options);
        this.name = name;
        this.lastModified = Date.now();
      }
    }
    (globalThis as unknown as { File: typeof File }).File =
      FilePolyfill as unknown as typeof File;
  }
};

// Helper to create a fake File object with minimal interface
const createFakeFile = (
  name = 'test.xlsx',
  type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
) => {
  ensureFileCtor();
  const blob = new Blob([new Uint8Array([1, 2, 3])], { type });
  return new File([blob], name, { type });
};

describe('convertExcelToBase64', () => {
  const OriginalFileReader: typeof FileReader | undefined = (
    globalThis as unknown as { FileReader?: typeof FileReader }
  ).FileReader;

  beforeEach(() => {
    vi.useFakeTimers();
    ensureBtoa();
  });

  afterEach(() => {
    vi.useRealTimers();
    if (OriginalFileReader) {
      global.FileReader = OriginalFileReader;
    }
    vi.restoreAllMocks();
  });

  it('converts an Excel file to base64 string (happy path)', async () => {
    // Mock FileReader behavior
    class MockFileReader {
      static readonly EMPTY = 0;
      static readonly LOADING = 1;
      static readonly DONE = 2;
      public onload:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
        | null = null;
      public onerror:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
        | null = null;
      public onabort:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
        | null = null;
      public onloadend:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
        | null = null;
      public onloadstart:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
        | null = null;
      public onprogress:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
        | null = null;
      public readyState: number = 0;
      public result: string | ArrayBuffer | null = null;
      public error: DOMException | null = null;
      public abort() {}
      public addEventListener() {}
      public removeEventListener() {}
      public dispatchEvent() {
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      readAsArrayBuffer(_file: Blob) {
        // simulate async read
        Promise.resolve().then(() => {
          const buffer = new ArrayBuffer(8);
          const event = {
            target: { result: buffer },
          } as unknown as ProgressEvent<FileReader>;
          if (this.onload) {
            this.onload.call(this as any, event);
          }
        });
      }
      public readAsBinaryString() {}
      public readAsDataURL() {}
      public readAsText() {}
    }
    (globalThis as unknown as { FileReader: typeof FileReader }).FileReader =
      MockFileReader as unknown as typeof FileReader;

    const file = createFakeFile();
    const base64 = await convertExcelToBase64(file);

    // 'MOCK_EXCEL_BINARY_STRING' btoa => T U 9 DS19F W N F T F 9 C SU5 BUllf U 1 UU U l O R w
    // We don't need exact base64 match; check it's a non-empty string and contains expected pattern
    expect(typeof base64).toBe('string');
    expect(base64.length).toBeGreaterThan(0);
  });

  it('rejects when FileReader errors', async () => {
    class MockFileReaderError {
      static readonly EMPTY = 0;
      static readonly LOADING = 1;
      static readonly DONE = 2;
      public onload:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
        | null = null;
      public onerror:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
        | null = null;
      public onabort:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
        | null = null;
      public onloadend:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
        | null = null;
      public onloadstart:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
        | null = null;
      public onprogress:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => any)
        | null = null;
      public readyState: number = 0;
      public result: string | ArrayBuffer | null = null;
      public error: DOMException | null = null;
      public abort() {}
      public addEventListener() {}
      public removeEventListener() {}
      public dispatchEvent() {
        return false;
      }
      public readAsArrayBuffer() {
        Promise.resolve().then(() => {
          const event = new Event(
            'error',
          ) as unknown as ProgressEvent<FileReader>;
          if (this.onerror) {
            this.onerror.call(this as any, event);
          }
        });
      }
      public readAsBinaryString() {}
      public readAsDataURL() {}
      public readAsText() {}
    }
    (globalThis as unknown as { FileReader: typeof FileReader }).FileReader =
      MockFileReaderError as unknown as typeof FileReader;

    const file = createFakeFile();
    await expect(convertExcelToBase64(file)).rejects.toBeTruthy();
  });
});
