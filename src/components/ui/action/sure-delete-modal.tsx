import { Button } from '@/components/ui/button/button';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import { deleteItemApi } from '@/services/general/delete-item-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Trash2 } from 'lucide-react';
import { memo } from 'react';
import { toast } from 'react-toastify';
import { ComponentLoader } from '../loader/component-loader/component-loader';

const MemoSureDeleteModal = ({
  queryKey,
  setShowModal,
  deleteItemUrl,
  onSuccess,
  multiQueryKey,
}: {
  queryKey: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteItemUrl: string;
  onSuccess?: VoidFunction;
  multiQueryKey?: any;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteItemApi,
    onSuccess: async () => {
      if (onSuccess) onSuccess();
      toast.success(getTranslatedValue('DeletedSuccessfully', 'AbpUi.texts'));
      if (multiQueryKey) {
        queryClient.invalidateQueries({
          queryKey: multiQueryKey || [queryKey],
        });
      }
      if (queryKey) {
        queryClient.invalidateQueries({
          queryKey: [queryKey],
        });
      }
      setShowModal(false);
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const handleAccept = () => {
    mutation.mutate({
      deleteItemUrl,
    });
  };

  return (
    <div className="dv-logout-modal">
      <div className="dv-logout-modal__header">
        <div className="dv-logout-modal__header-icon">
          <Trash2 color="#F04438" size="24" />
        </div>
        <h2 className="dv-logout-modal__header-title">
          {getTranslatedValue('ApplyConfirmationMessage')}
        </h2>
      </div>

      <div className="dv-logout-modal__body">
        <p className="dv-logout-modal__body-text">
          {getTranslatedValue('DeleteConfirmationMessage')}
        </p>

        <div className="dv-logout-modal__body-buttons">
          <Button
            disabled={mutation?.isPending}
            onClick={handleAccept}
            variant="danger"
          >
            {mutation?.isPending ? (
              <ComponentLoader />
            ) : (
              getTranslatedValue('Yes')
            )}
          </Button>
          <Button onClick={() => setShowModal(false)} variant="secondary">
            {getTranslatedValue('Cancel')}
          </Button>
        </div>
      </div>
    </div>
  );
};

const SureDeleteModal = memo(MemoSureDeleteModal);

export default SureDeleteModal;
