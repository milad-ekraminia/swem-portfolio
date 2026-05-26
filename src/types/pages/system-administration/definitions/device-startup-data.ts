// TODO -> Modify to Actual Data Structre
interface BaseDeviceStartup {
  startDate: string;
  endDate: string;
  device: string;
  imp: string;
  exp: string;
  active: boolean;
  timeInformation: number;
}

// TODO -> Modify to Actual Data Structre
export interface DeviceStartup extends BaseDeviceStartup {
  description: string;
  id: number;
}
// TODO -> Modify to Actual Form Data Structre
export type DeviceStartupFormData = BaseDeviceStartup;
