import { Button } from '@/components/ui/button/button';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import {
  downloadExcelFile,
  downloadExcelFileApiWithRow,
} from '@/helpers/download-excel-export';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { DownloadIcon } from 'lucide-react';
import { memo, useMemo } from 'react';

const MemoExcelExportButton = ({
  customFormData,
  formData,
  watchInfo,
  url,
  fileName,
  excelType,
  productionConsumptionsData,
}: {
  formData: any;
  customFormData?: any;
  watchInfo?: any;
  url: string;
  fileName: string;
  excelType?: string;
  productionConsumptionsData?: any;
}) => {
  const selectedOrganizationsObjects = watchInfo?.find(
    (item: any) => item?.fieldName === 'SelectedOrganizationsObjects',
  );

  const selectedIds = useMemo(() => {
    return selectedOrganizationsObjects?.fieldValue &&
      selectedOrganizationsObjects?.fieldValue?.length > 0 &&
      Array.isArray(selectedOrganizationsObjects?.fieldValue)
      ? selectedOrganizationsObjects?.fieldValue
        ?.filter((item: any) => item?.organizationTreeNodeType === 2)
        ?.map((item: any) => Number(item?.id))
      : [];
  }, [selectedOrganizationsObjects]);

  const mutation = useMutation({
    mutationFn: downloadExcelFileApiWithRow,
    onSuccess: async (data) => {
      downloadExcelFile({
        response: data,
        fileName,
      });
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const downloadHandler = async () => {
    let mutateFormData = formData;

    if (customFormData) {
      mutateFormData = {
        ...customFormData,
        periodType: Number(
          watchInfo?.find((item: any) => item?.fieldName === 'ReportPeriod')
            ?.fieldValue,
        ),
        readDateTimeMin: watchInfo?.find(
          (item: any) => item?.fieldName === 'StartDateTime',
        )?.fieldValue,
        readDateTimeMax: watchInfo?.find(
          (item: any) => item?.fieldName === 'EndDateTime',
        )?.fieldValue,
        deviceIds: selectedIds,
      };
    } else if (watchInfo) {
      mutateFormData = {
        ...formData,
        periodType: Number(
          watchInfo?.find((item: any) => item?.fieldName === 'ReportPeriod')
            ?.fieldValue,
        ),
        startDate: watchInfo?.find(
          (item: any) => item?.fieldName === 'StartDateTime',
        )?.fieldValue,
        endDate: watchInfo?.find(
          (item: any) => item?.fieldName === 'EndDateTime',
        )?.fieldValue,
        deviceIdList: selectedIds,
        data: [],
      };
    }

    if (
      excelType === 'weather'
      // || excelType === 'PeriodicElecProductionConsumptionReports'
    ) {
      delete mutateFormData?.periodType;
    }

    if (excelType === 'production-consumptions') {
      mutateFormData = {
        ...mutateFormData,
        data: productionConsumptionsData,
      };
    }

    mutation.mutate({
      url,
      formData: mutateFormData,
    });
  };
  return (
    <Button
      variant="secondary"
      onClick={downloadHandler}
      disabled={mutation?.isPending}
    >
      {mutation?.isPending ? <ComponentLoader variant="secondary" /> : <DownloadIcon stroke="#344054" width={20} height={20} />}
    </Button>
  );
};

const ExcelExportButton = memo(MemoExcelExportButton);

export default ExcelExportButton;
