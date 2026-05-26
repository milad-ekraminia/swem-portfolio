import ErrorContent from '@/components/ui/error-content/error-content';
import { Loader } from '@/components/ui/loader/loader';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getCustomTypeNumber } from '@/helpers/organization-data/organization-tree-selected-tab-handler';
import { fetchOrganizationAlarmStatusDetails } from '@/services/organization-trace/dashboard-api';
import { handleChangeTree } from '@/store/features/tree-slice';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface AlarmDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alarmLevel: 1 | 2 | 3 | null; // 1: Warning, 2: Critical, 3: Dangerous
  orgId: number;
}

const AlarmDetailsModal = ({
  isOpen,
  onClose,
  alarmLevel,
  orgId,
}: AlarmDetailsModalProps) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAlarmLevelClass = () => {
    switch (alarmLevel) {
      case 1:
        return 'Warning';
      case 2:
        return 'Critical';
      case 3:
        return 'Dangerous';
      default:
        return '';
    }
  };

  const getAlarmLevelTitle = () => {
    switch (alarmLevel) {
      case 1:
        return 'WarningLevelAlarms';
      case 2:
        return 'CriticalLevelAlarms';
      case 3:
        return 'DangerousLevelAlarms';
      default:
        return 'WarningLevelAlarms';
    }
  };

  const {
    data: alarmsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['Organization Alarm Status Details', alarmLevel, orgId],
    queryFn: () =>
      fetchOrganizationAlarmStatusDetails({
        orgId,
        alarmLevel: getAlarmLevelClass(),
      }),
    enabled: isOpen && !!orgId && !!alarmLevel,
    retry: false,
  });

  const handlePlantNavigate = (alarm: any) => {
    dispatch(
      handleChangeTree({
        tree_id: alarm.organizationId,
        title: alarm.organizationName,
        parentTitle: alarm.organizationParentNames?.split(' / ')?.[1],
        locationId: alarm.locationId,
        type: getCustomTypeNumber(
          alarm.organizationType,
          alarm.organizationTreeNodeType,
          0,
        ),
        deviceModelType: 0,
        // deviceModelId: alarm.deviceModelId
      }),
    );
    // Close modal after navigation
    onClose();
    navigate('/alarm-details/organization-trace');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} modalSize="sm">
      <div className="alarm-details-modal">
        <div className="alarm-details-modal__header">
          <h2 className="alarm-details-modal__header-title">
            {getTranslatedValue(getAlarmLevelTitle())}
          </h2>
        </div>

        <div className="alarm-details-modal__content">
          {isLoading ? (
            <div className="alarm-details-modal__loader">
              <Loader />
            </div>
          ) : error ? (
            <ErrorContent error={error.message ?? ''} />
          ) : alarmsData?.length === 0 ? (
            <div className="alarm-details-modal__empty">
              {getTranslatedValue('NoDataAvailable')}
            </div>
          ) : (
            <div className="alarm-details-modal__list">
              {alarmsData?.map((alarm: any, index: number) => (
                <div key={alarm.id || index} className="alarm-item">
                  <button type="button" onClick={() => handlePlantNavigate(alarm)} className="alarm-item__title">
                    {alarm.organizationName}
                  </button>
                  <span className={`alarm-item__badge ${getAlarmLevelClass()}`}>
                    {alarm.alarmsCount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AlarmDetailsModal;
