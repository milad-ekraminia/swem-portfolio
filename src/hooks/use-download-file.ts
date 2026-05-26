import { useEffect, useState } from 'react';
import {
  downloadExcelFileTokenApi,
  downloadGetMethodExcelFile,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';

type UseDownloadFileProps = {
  excelUrl: string; // URL for fetching Excel file
  fileName: string; // Name of the downloaded file
  searchInputValue?: string; // Optional search filter
  getTokenUrl: string; // URL for getting the token
};

export const useDownloadFile = () => {
  const [loader, setLoader] = useState(false);

  const getTokenMutation = useMutation<any, AxiosError, UseDownloadFileProps>({
    mutationFn: ({ getTokenUrl, ...rest }) =>
      downloadExcelFileTokenApi({
        url: `${getTokenUrl}?api-version=${import.meta.env.VITE_API_VERSION}`,
        ...rest,
      }),
    onSuccess: async (data: any, variables: UseDownloadFileProps) => {
      // Check if the excelUrl already has query parameters
      const hasExistingParams = variables.excelUrl.includes('?');
      const paramSeparator = hasExistingParams ? '&' : '?';

      let url = variables.searchInputValue
        ? `${variables.excelUrl}${paramSeparator}DownloadToken=${data?.token}&FilterText=${variables.searchInputValue}`
        : `${variables.excelUrl}${paramSeparator}${variables.excelUrl.includes('import-users-sample-file') ? 'Token' : 'DownloadToken'}=${data?.token}`;

      if (variables.excelUrl.includes('import-users-sample-file')) {
        url += '&FileType=1';
      }

      setLoader(true);
      await downloadGetMethodExcelFile({
        excelUrl: url,
        fileName: variables.fileName,
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const downloadHandler = (props: UseDownloadFileProps) => {
    getTokenMutation.mutate(props);
  };

  useEffect(() => {
    setLoader(getTokenMutation.isPending);
  }, [getTokenMutation.isPending]);

  return { downloadHandler, isExcelDownloading: loader };
};
