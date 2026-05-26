import { memo, useState } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { timeAgoFrom } from '@/helpers/time-ago';
import AlarmDetailsModal from './alarm-details-modal';

interface Props {
  status: {
    // activeAlarmsCount: number;
    warningAlarmsCount: number;
    criticalAlarmsCount: number;
    dangerousAlarmsCount: number;
    lastReadDateTime: string;
  };
  orgId: number;
}

const MemoAlarmStatusType = ({ status, orgId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlarmLevel, setSelectedAlarmLevel] = useState<
    1 | 2 | 3 | null
  >(null);

  const handleStatusClick = (level: 1 | 2 | 3) => {
    setSelectedAlarmLevel(level);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlarmLevel(null);
  };

  return (
    <>
      <div className="status">
        <div className="status-items">
          {/* active */}
          {/* <div className="active">
            <div className="dot"></div>
            {status?.activeAlarmsCount} {getTranslatedValue('Active')}
          </div> */}

          {/* warning */}
          <div
            className="warning"
            onClick={() => handleStatusClick(1)}
            style={{ cursor: 'pointer' }}
          >
            <div className="dot"></div>
            {status?.warningAlarmsCount} {getTranslatedValue('Warning')}
          </div>

          {/* critical */}
          <div
            className="orange"
            onClick={() => handleStatusClick(2)}
            style={{ cursor: 'pointer' }}
          >
            <div className="dot"></div>
            {status?.criticalAlarmsCount} {getTranslatedValue('Critical')}
          </div>

          {/* dangerous */}
          <div
            className="danger"
            onClick={() => handleStatusClick(3)}
            style={{ cursor: 'pointer' }}
          >
            <div className="dot"></div>
            {status?.dangerousAlarmsCount} {getTranslatedValue('Danger')}
          </div>
        </div>

        <div className="status-info">
          {getTranslatedValue('latest_updates')}{' '}
          {timeAgoFrom(status?.lastReadDateTime)}
        </div>
      </div>

      <AlarmDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        alarmLevel={selectedAlarmLevel}
        orgId={orgId}
      />
    </>
  );
};

const AlarmStatusType = memo(MemoAlarmStatusType);

export default AlarmStatusType;
