import { useState } from 'react';
import { toastError } from '@/helpers/error-boundary/toast-error';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { apiErrorHandler } from '@/lib/api-method/api-error-handler';
import {
  approveAlarmApi,
  cancelAlarmApi,
} from '@/services/organization-trace/alarm-api';
import SureActionModal from '@/components/ui/action/sure-action-modal';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import ApproveAlarmButton from '@/components/pages/organization-trace/alarms/approve-btn';
import CancelAlarmButton from '@/components/pages/organization-trace/alarms/cancel-alarm-btn';
import UserHasUpdatedFiledName from '@/components/pages/organization-trace/alarms/user-has-updated-filed-name';

export const ApproveAlarmComponent = ({
  row,
  refetch,
  isPassive,
  isAll,
}: {
  row: any;
  refetch: any;
  isPassive?: boolean;
  isAll?: boolean;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: approveAlarmApi,
    onSuccess: async () => {
      toast.success(getTranslatedValue('Approved'));
      refetch();
      setShowSureModal(false);
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const approveAlarmHandler = async () => {
    mutation.mutate({ alarmId: row?.original?.id });
  };

  const cancelMutation = useMutation({
    mutationFn: cancelAlarmApi,
    onSuccess: async () => {
      toast.success(getTranslatedValue('successfully_deleted'));
      queryClient.invalidateQueries({
        queryKey: ['fetch active alarm organization list'],
      });
      queryClient.invalidateQueries({
        queryKey: ['fetch passive alarm organization list'],
      });
      queryClient.invalidateQueries({
        queryKey: ['system alarm reports list'],
      });
      setShowSureModal(false);
    },
    onError: async (error: AxiosError) => {
      const errorResponse = await apiErrorHandler(error);
      toastError(errorResponse?.error);
    },
  });

  const cancelAlarmHandler = async () => {
    cancelMutation.mutate({ alarmId: row?.original?.id });
  };
  const [showSureModal, setShowSureModal] = useState(false);
  return (
    <>
      {isAll ? (
        <AllComponent
          approveAlarmHandler={approveAlarmHandler}
          cancelAlarmHandler={cancelAlarmHandler}
          cancelMutation={cancelMutation}
          info={row?.original}
          mutation={mutation}
          setShowSureModal={setShowSureModal}
          showSureModal={showSureModal}
        />
      ) : row?.original?.alarmApproved ? (
        <div className="active-alarm-action-div-cancel">
          {!isPassive && (
            <CancelAlarmButton setShowSureModal={setShowSureModal} />
          )}

          {!isPassive ? (
            <UserHasUpdatedFiledName
              fullName={row?.original?.alarmApprovedUserFullName}
              dateTime={row?.original?.alarmApprovedDateTime}
            />
          ) : (
            getTranslatedValue('alarm_status_1')
          )}
          {showSureModal && (
            <Modal
              modalSize="sm"
              isOpen={!!showSureModal}
              onClose={() => setShowSureModal(false)}
            >
              <SureActionModal
                setShowModal={() => setShowSureModal(false)}
                onConfirm={cancelAlarmHandler}
                isPending={cancelMutation?.isPending}
                variant="danger"
                message={'AlarmEndConfirmationMessage'}
              />
            </Modal>
          )}
        </div>
      ) : (
        <>
          <ApproveAlarmButton
            setShowSureModal={setShowSureModal}
            isPending={mutation?.isPending}
          />
          {showSureModal && (
            <Modal
              modalSize="sm"
              isOpen={!!showSureModal}
              onClose={() => setShowSureModal(false)}
            >
              <SureActionModal
                setShowModal={() => setShowSureModal(false)}
                onConfirm={approveAlarmHandler}
                isPending={mutation?.isPending}
                message={'AlarmApproveConfirmationMessage'}
              />
            </Modal>
          )}
        </>
      )}
    </>
  );
};

const AllComponent = ({
  info,
  showSureModal,
  setShowSureModal,
  cancelAlarmHandler,
  cancelMutation,
  mutation,
  approveAlarmHandler,
}: {
  info: any;
  showSureModal: any;
  setShowSureModal: any;
  cancelAlarmHandler: any;
  cancelMutation: any;
  mutation: any;
  approveAlarmHandler: any;
}) => {
  const isPassive = info?.alarmStatus === 2;
  return info?.alarmApproved ? (
    <div className="active-alarm-action-div-cancel">
      {!isPassive && <CancelAlarmButton setShowSureModal={setShowSureModal} />}

      {!isPassive ? (
        <UserHasUpdatedFiledName
          fullName={info?.alarmApprovedUserFullName}
          dateTime={info?.alarmApprovedDateTime}
        />
      ) : (
        getTranslatedValue('alarm_status_1')
      )}
      {showSureModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showSureModal}
          onClose={() => setShowSureModal(false)}
        >
          <SureActionModal
            setShowModal={() => setShowSureModal(false)}
            onConfirm={cancelAlarmHandler}
            isPending={cancelMutation?.isPending}
            variant="danger"
            message={'AlarmEndConfirmationMessage'}
          />
        </Modal>
      )}
    </div>
  ) : (
    <>
      <ApproveAlarmButton
        setShowSureModal={setShowSureModal}
        isPending={mutation?.isPending}
      />
      {showSureModal && (
        <Modal
          modalSize="sm"
          isOpen={!!showSureModal}
          onClose={() => setShowSureModal(false)}
        >
          <SureActionModal
            setShowModal={() => setShowSureModal(false)}
            onConfirm={approveAlarmHandler}
            isPending={mutation?.isPending}
            message={'AlarmApproveConfirmationMessage'}
          />
        </Modal>
      )}
    </>
  );
};
