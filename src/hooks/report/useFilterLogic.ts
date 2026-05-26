import { useCallback, useMemo } from 'react';
import { useFormDataValueChangeByFieldName } from '@/helpers/reports/find-fieldvalue-by-fieldname';
import { useQueries } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';
import {
  getDeviceCategoryLookupApi,
  getDeviceLabelLookupApi,
  getDeviceModelLookupApi,
} from '@/services/reports/get-device-apis';

interface Props {
  control: any;
  fields: any;
  setValue: any;
}

export default function useFilterLogic({ fields, control, setValue }: Props) {
  const getFieldValuePath = useFormDataValueChangeByFieldName(fields);
  const startDate = useWatch({
    control,
    name: getFieldValuePath('StartDateTime'),
  });
  const endDate = useWatch({ control, name: getFieldValuePath('EndDateTime') });

  const periodType = useWatch({
    control,
    name: getFieldValuePath('ReportPeriod'),
  });

  const selectedOrganizationsObjects = useWatch({
    control,
    name: getFieldValuePath('SelectedOrganizationsObjects'),
  });
  const ids = useMemo(() => {
    return selectedOrganizationsObjects?.length > 0 &&
      typeof selectedOrganizationsObjects === 'object'
      ? selectedOrganizationsObjects?.map((item: any) => Number(item?.id))
      : [];
  }, [selectedOrganizationsObjects]);

  const results = useQueries({
    queries: [
      {
        queryKey: ['get-device-category-lookup', ids],
        queryFn: () => getDeviceCategoryLookupApi({ ids }),
        retry: false,
        enabled: !!ids?.length,
      },
      {
        queryKey: ['get-device-model-lookup', ids],
        queryFn: () => getDeviceModelLookupApi({ ids }),
        retry: false,
        enabled: !!ids?.length,
      },
      {
        queryKey: ['get-device-label-lookup', ids],
        queryFn: () => getDeviceLabelLookupApi({ ids }),
        enabled: !!ids?.length, // Only execute query if `ids` is non-empty
        retry: false,
      },
    ],
  });

  const [
    getDeviceCategoryResponse,
    getDeviceModelResponse,
    getDeviceLabelResponse,
  ] = results;

  const handleUpdateDate = useCallback(
    (field: 'StartDateTime' | 'EndDateTime', value: string) => {
      const whichDate = getFieldValuePath(field);
      setValue(whichDate, value);
    },
    [getFieldValuePath, setValue],
  );
  const handleUpdateDateGraphic = useCallback(
    (field: 'StartDateTime' | 'EndDateTime', value: string) => {
      setValue(field, value);
    },
    [setValue],
  );

  return {
    handleUpdateDate,
    handleUpdateDateGraphic,
    getDeviceCategoryResponse,
    getDeviceModelResponse,
    getDeviceLabelResponse,
    startDate,
    endDate,
    periodType,
    getFieldValuePath,
  };
}
