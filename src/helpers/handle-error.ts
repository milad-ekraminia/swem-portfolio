import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { toastError } from './error-boundary/toast-error';

export const handleError = async (error: any) => {
  const errorResponse = await apiErrorHandler(error);
  toastError(errorResponse?.error);
};
