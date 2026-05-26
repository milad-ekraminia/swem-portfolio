import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createNewFilterProfileTrendAnalyse } from '@/services/organization-trace/trend-analyse-page-filter-profiles-apis';
import { updateFilterProfileTrendAnalyse } from '@/services/reports/filter-profiles-apis';

export const useCreateNewFilterProfileTrendAnalyse = ({
  invalidateQueries,
  resetAddState,
}: {
  invalidateQueries: () => void;
  resetAddState: (data: any) => void;
}) => {
  return useMutation({
    mutationFn: (formData: any) => createNewFilterProfileTrendAnalyse(formData),
    onSuccess: (data) => {
      toast.success(getTranslatedValue('SaveSuccess'));
      invalidateQueries();
      resetAddState(data);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error?.message ||
          'Failed to create filter profile',
      );
    },
  });
};

export const useUpdateFilterProfileTrendAnalyse = () => {
  return useMutation({
    mutationFn: (formData: any) => updateFilterProfileTrendAnalyse(formData),
    onSuccess: () => {
      toast.success(getTranslatedValue('Updated'));
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error?.message ||
          'Failed to update filter profile',
      );
    },
  });
};
