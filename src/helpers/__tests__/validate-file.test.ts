import { validateFile } from '@/helpers/validate-file';
import { describe, expect, it } from 'vitest';

describe('validate-file', () => {
  const createMockFile = (type: string, size: number): File => {
    return {
      type,
      size,
      name: 'test.jpg',
      lastModified: Date.now(),
      webkitRelativePath: '',
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      slice: () => new Blob(),
      stream: () => new ReadableStream(),
      text: () => Promise.resolve(''),
    } as File;
  };

  it('returns null for valid file', () => {
    const file = createMockFile('image/jpeg', 1000000);
    const result = validateFile({
      file,
      types: ['image/jpeg', 'image/png'],
    });
    expect(result).toBeNull();
  });

  it('returns error for invalid file type', () => {
    const file = createMockFile('text/plain', 1000000);
    const result = validateFile({
      file,
      types: ['image/jpeg', 'image/png'],
    });
    expect(result).toBe('File type not allowed. Please upload PNG or JPEG.');
  });

  it('returns error for file exceeding size limit', () => {
    const file = createMockFile('image/jpeg', 5000000);
    const result = validateFile({
      file,
      types: ['image/jpeg', 'image/png'],
    });
    expect(result).toBe('File size exceeds 4 MB limit.');
  });

  it('returns error for file exceeding custom size limit', () => {
    const file = createMockFile('image/jpeg', 2000000);
    const result = validateFile({
      file,
      types: ['image/jpeg', 'image/png'],
      maxFileSize: 1000000,
    });
    expect(result).toBe('File size exceeds 4 MB limit.');
  });

  it('handles multiple valid types', () => {
    const jpegFile = createMockFile('image/jpeg', 1000000);
    const pngFile = createMockFile('image/png', 1000000);

    expect(
      validateFile({ file: jpegFile, types: ['image/jpeg', 'image/png'] }),
    ).toBeNull();
    expect(
      validateFile({ file: pngFile, types: ['image/jpeg', 'image/png'] }),
    ).toBeNull();
  });

  it('handles edge cases', () => {
    const zeroSizeFile = createMockFile('image/jpeg', 0);
    const maxSizeFile = createMockFile('image/jpeg', 4 * 1000 * 1000);

    expect(
      validateFile({ file: zeroSizeFile, types: ['image/jpeg'] }),
    ).toBeNull();
    expect(
      validateFile({ file: maxSizeFile, types: ['image/jpeg'] }),
    ).toBeNull();
  });
});
