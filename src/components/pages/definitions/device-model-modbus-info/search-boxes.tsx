import { DeviceModelTypeEnum } from '@/enum-data/definitions/enum';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { Input } from '@/components/ui/input/Input';

export const DevicesModelModbusInfoSearchBoxes = ({
  deviceModelResponse,
}: {
  deviceModelResponse: any;
}) => {
  const deviceName = deviceModelResponse?.data?.deviceModelName;
  const deviceTypeId = deviceModelResponse?.data?.deviceModelTypeId;
  const type = getTranslatedValue(
    'Enum:DeviceModelType.' +
      DeviceModelTypeEnum[deviceTypeId as keyof typeof DeviceModelTypeEnum],
  );

  return (
    <div className="devices-model-modbus-info-search-boxes">
      <div className="devices-model-modbus-info-search-boxes__item">
        <Input
          placeholder={getTranslatedValue('search')}
          label={getTranslatedValue('DeviceModelName')}
          disabled={true}
          value={deviceName}
        />
      </div>
      <div className="devices-model-modbus-info-search-boxes__item">
        <Input
          name="mySelect"
          placeholder={getTranslatedValue('Elektrik Sayacı')}
          label={getTranslatedValue('DeviceModelTypeId')}
          disabled={true}
          value={type}
        />
      </div>
      <div className="devices-model-modbus-info-search-boxes__item">
        {' '}
        <Input
          onChange={(e) => {
            console.log(e.target.value);
          }}
          placeholder={getTranslatedValue('search')}
          label={getTranslatedValue('em_device_model_code')}
          disabled={true}
          value={deviceModelResponse?.data?.deviceModelCode}
        />
      </div>
    </div>
  );
};
