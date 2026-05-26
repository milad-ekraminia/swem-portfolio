 
import { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/types/api-methods';

export const apiErrorHandler = async (e: AxiosError): Promise<any> => {
  const errorData = {
    error_description: e.response?.data as ApiErrorResponse | undefined,
  };
  if (errorData?.error_description) {
    return { status: e.response?.status ?? 500, error: errorData };
  } else {
    return {
      status: e.response?.status ?? 500,
      error: {
        error_description:
          e.request?.status === 404
            ? 'Api Route Not Found'
            : 'Unknown server error (status code : 500)',
      },
    };
  }
};
