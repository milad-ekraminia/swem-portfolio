import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  createNewFilterProfile,
  updateFilterProfile,
} from '@/services/reports/filter-profiles-apis';

export const useCreateNewFilterProfile = ({
  invalidateQueries,
  resetAddState,
}: {
  invalidateQueries: () => void;
  resetAddState: (data: any) => void;
}) => {
  return useMutation({
    mutationFn: (formData: any) => createNewFilterProfile(formData),
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

export const useUpdateFilterProfile = () => {
  return useMutation({
    mutationFn: (formData: any) => updateFilterProfile(formData),
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
