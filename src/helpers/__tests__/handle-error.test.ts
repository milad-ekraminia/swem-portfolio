import { describe, it, expect, vi } from 'vitest';
import { handleError } from '@/helpers/handle-error';

vi.mock('@/lib/api-method/api-error-handler', () => ({
  apiErrorHandler: vi.fn(async (e: unknown) => ({ error: String(e) })),
}));

vi.mock('@/helpers/error-boundary/toast-error', () => ({
  toastError: vi.fn(),
}));

describe('handleError', () => {
  it('delegates to apiErrorHandler and calls toastError with message', async () => {
    const { apiErrorHandler } = await import('@/lib/api-method/api-error-handler');
    const { toastError } = await import('@/helpers/error-boundary/toast-error');

    await handleError(new Error('Boom'));
    expect(apiErrorHandler).toHaveBeenCalled();
    expect(toastError).toHaveBeenCalledWith('Error: Boom');
  });
});


