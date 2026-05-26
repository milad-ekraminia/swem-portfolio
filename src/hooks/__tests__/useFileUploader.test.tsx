import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFileUploader } from '../useFileUploader';

// Mock React hooks
vi.mock('react', async () => {
  const actualReact = await vi.importActual('react');
  return {
    ...actualReact,
    useCallback: vi.fn((fn) => fn),
  };
});

const toastErrorMock = vi.fn();

vi.mock('react-toastify', () => ({
  toast: {
    error: (...args: unknown[]) => toastErrorMock(...args),
  },
}));

// Helper to mock FileReader with controllable result
let mockFileReaderResult: string | null = null;
class MockFileReader {
  public result: string | ArrayBuffer | null = null;
  public onload: null | (() => void) = null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  readAsDataURL(_file: File) {
    this.result = mockFileReaderResult;
    if (this.onload) {
      this.onload();
    }
  }
}

describe('useFileUploader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Override for testing
    (global as unknown as { FileReader: typeof FileReader }).FileReader =
      MockFileReader as unknown as typeof FileReader;
    mockFileReaderResult = null;
  });

  it('shows error when file type is not allowed', () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useFileUploader(onSuccess));

    const badFile = new File([new Uint8Array([1, 2, 3])], 'file.gif', { type: 'image/gif' });
    const event = { target: { files: [badFile] } } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleFileUpload(event);
    });

    expect(toastErrorMock).toHaveBeenCalledWith('File type not allowed. Please upload PNG or JPEG.');
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('shows error when file size exceeds limit', () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useFileUploader(onSuccess));

    const bigBlob = new Blob([new Uint8Array(4 * 1024 * 1024 + 1)]);
    const bigFile = new File([bigBlob], 'big.png', { type: 'image/png' });
    const event = { target: { files: [bigFile] } } as unknown as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleFileUpload(event);
    });

    expect(toastErrorMock).toHaveBeenCalledWith('File size exceeds 4MB limit.');
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('calls onSuccess with base64 data for valid image', () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useFileUploader(onSuccess));

    const file = new File([new Uint8Array([1, 2, 3])], 'ok.png', { type: 'image/png' });
    const event = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;

    // Provide a valid data URL result for the next FileReader
    mockFileReaderResult = 'data:image/png;base64,QUJD';

    act(() => {
      result.current.handleFileUpload(event);
    });

    expect(onSuccess).toHaveBeenCalledWith(
      expect.objectContaining({
        fileName: 'ok.png',
        fileType: 'image/png',
        fileSize: file.size,
        base64: 'QUJD',
      }),
    );
    expect(toastErrorMock).not.toHaveBeenCalled();
  });

  it('shows error when base64 cannot be parsed', () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useFileUploader(onSuccess));

    const file = new File([new Uint8Array([1, 2, 3])], 'ok.png', { type: 'image/png' });
    const event = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;

    // Provide an invalid data URL that lacks a comma to produce undefined base64
    mockFileReaderResult = 'invalid-data-url-without-comma';

    act(() => {
      result.current.handleFileUpload(event);
    });

    expect(toastErrorMock).toHaveBeenCalledWith('Error processing the file.');
    expect(onSuccess).not.toHaveBeenCalled();
  });
});


