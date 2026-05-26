import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  },
  post: vi.fn(),
  get: vi.fn(),
  delete: vi.fn(),
}));

import { handleUpload, fetchUploadedFile, deleteUploadedFile } from '@/helpers/upload-file/upload-file-helper';

describe('upload-file/upload-file-helper', () => {
  const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });

  beforeEach(() => {
    vi.stubEnv('VITE_FILE_SERVER_URL', 'http://test-server');
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('handleUpload shows alert for no file', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    await handleUpload(null as any, 'plant-images');
    
    expect(alertSpy).toHaveBeenCalledWith('Please select a file first!');
    alertSpy.mockRestore();
  });

  it('handleUpload posts file to correct endpoint', async () => {
    const axios = await import('axios');
    (axios.default.post as any).mockResolvedValue({ data: 'success' });
    
    await handleUpload(mockFile, 'plant-images');
    
    expect(axios.default.post).toHaveBeenCalledWith(
      'http://test-server/upload/plant-images',
      expect.any(FormData),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  });

  it('handleUpload shows alert on error', async () => {
    const axios = await import('axios');
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    (axios.default.post as any).mockRejectedValue(new Error('Upload failed'));
    
    await handleUpload(mockFile, 'plant-images');
    
    expect(alertSpy).toHaveBeenCalledWith('File upload failed.');
    alertSpy.mockRestore();
  });

  it('fetchUploadedFile returns data on success', async () => {
    const axios = await import('axios');
    const mockData = { fileName: 'test.txt', size: 100 };
    (axios.default.get as any).mockResolvedValue({ data: mockData });
    
    const result = await fetchUploadedFile('test.txt', 'plant-images');
    
    expect(axios.default.get).toHaveBeenCalledWith('http://test-server/file-info/plant-images/test.txt');
    expect(result).toEqual(mockData);
  });

  it('fetchUploadedFile returns undefined for empty fileName', async () => {
    const result = await fetchUploadedFile('', 'plant-images');
    expect(result).toBeUndefined();
  });

  it('fetchUploadedFile handles errors gracefully', async () => {
    const axios = await import('axios');
    (axios.default.get as any).mockRejectedValue(new Error('Fetch failed'));
    
    const result = await fetchUploadedFile('test.txt', 'plant-images');
    
    expect(result).toBeUndefined();
  });

  it('deleteUploadedFile returns data on success', async () => {
    const axios = await import('axios');
    const mockData = { success: true };
    (axios.default.delete as any).mockResolvedValue({ data: mockData });
    
    const result = await deleteUploadedFile('test.txt', 'plant-images');
    
    expect(axios.default.delete).toHaveBeenCalledWith('http://test-server/uploads/plant-images/test.txt');
    expect(result).toEqual(mockData);
  });

  it('deleteUploadedFile returns undefined for empty fileName', async () => {
    const result = await deleteUploadedFile('', 'plant-images');
    expect(result).toBeUndefined();
  });

  it('deleteUploadedFile handles errors gracefully', async () => {
    const axios = await import('axios');
    (axios.default.delete as any).mockRejectedValue(new Error('Delete failed'));
    
    const result = await deleteUploadedFile('test.txt', 'plant-images');
    
    expect(result).toBeUndefined();
  });
});
