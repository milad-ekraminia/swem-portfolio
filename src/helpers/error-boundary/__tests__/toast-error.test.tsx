import { describe, it, expect, vi } from 'vitest';
import { toastError, toastUseQueryError } from '@/helpers/error-boundary/toast-error';

vi.mock('react-toastify', () => ({
  toast: { error: vi.fn() },
}));

describe('error-boundary/toast-error', () => {
  it('toastError shows message when error_description.error.message exists', async () => {
    const { toast } = await import('react-toastify');
    const error = {
      error_description: {
        error: {
          message: 'Test error message',
        },
      },
    };
    
    toastError(error);
    expect(toast.error).toHaveBeenCalledWith('Test error message');
  });

  it('toastError shows error_description when message not available', async () => {
    const { toast } = await import('react-toastify');
    const error = {
      error_description: 'Fallback error',
    };
    
    toastError(error);
    expect(toast.error).toHaveBeenCalledWith('Fallback error');
  });

  it('toastUseQueryError shows details when available', async () => {
    const { toast } = await import('react-toastify');
    const error = {
      response: {
        data: {
          error: {
            details: 'Detailed error message',
          },
        },
      },
    };
    
    toastUseQueryError(error);
    expect(toast.error).toHaveBeenCalledWith('Detailed error message');
  });

  it('toastUseQueryError shows message when details not available', async () => {
    const { toast } = await import('react-toastify');
    const error = {
      response: {
        data: {
          error: {
            message: 'Error message',
          },
        },
      },
    };
    
    toastUseQueryError(error);
    expect(toast.error).toHaveBeenCalledWith('Error message');
  });
});
