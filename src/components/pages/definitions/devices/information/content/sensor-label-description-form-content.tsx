import { memo } from 'react';
import DeviceEditableTable from '../../editable-table';

const MemoDeviceSensorLabelDescriptionFormContent = ({
  control,
  getDeviceLabelResponse,
}: {
  control: any;
  getDeviceLabelResponse: any;
}) => {
  return (
    <div className="device-sensor-label-description">
      <DeviceEditableTable
        control={control}
        isLoading={false}
        getDeviceLabelResponse={getDeviceLabelResponse}
      />
    </div>
  );
};

const DeviceSensorLabelDescriptionFormContent = memo(
  MemoDeviceSensorLabelDescriptionFormContent,
);

export default DeviceSensorLabelDescriptionFormContent;
