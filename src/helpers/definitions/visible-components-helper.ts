export const getVisibleComponents = ({
  accessPointCommType,
  accessPointCommMethod,
  accessPointProtocolId,
}: {
  accessPointCommType: number;
  accessPointCommMethod: number;
  accessPointProtocolId: number;
}): number => {
  switch (accessPointCommType) {
    case 1:
      switch (accessPointCommMethod) {
        case 1:
          return accessPointProtocolId === 7 ? 2 : 1;
        case 2:
          return 3;
        case 3:
          return 4;
        default:
          return 1;
      }
    case 2:
      switch (accessPointCommMethod) {
        case 1:
          return 5;
        case 2:
          return 6;
        case 3:
          return 7;
        default:
          return 1;
      }
    case 3:
      switch (accessPointCommMethod) {
        case 1:
          return 8;
        case 2:
          return 9;
        case 3:
          return 10;
        default:
          return 1;
      }
    case 4:
      switch (accessPointCommMethod) {
        case 1:
          return 12;
        case 2:
          return 13;
        default:
          return 11;
      }
    default:
      return 1;
  }
};

export const shouldShowProtocolSelect = (visibleNumber: number) => {
  return [1, 2, 5, 8].includes(visibleNumber);
};

export const shouldShowAccessPointCommLine = (visibleNumber: number) => {
  return [1, 3, 4, 5, 6, 7, 8, 9, 10].includes(visibleNumber);
};

export const shouldShowAccessPointIp = (visibleNumber: number) => {
  return [1, 3, 5, 6, 7, 11, 12, 13].includes(visibleNumber);
};

export const shouldShowMqttConnectionProtocol = (visibleNumber: number) => {
  return [11, 12, 13].includes(visibleNumber);
};

export const shouldShowSSLVersion = (visibleNumber: number) => {
  return [12, 13].includes(visibleNumber);
};

export const shouldShowAccessPointSerialNr = (visibleNumber: number) => {
  return [5, 6, 7].includes(visibleNumber);
};
export const shouldShowAccessPointComPort = (visibleNumber: number) => {
  return [8, 9, 10].includes(visibleNumber);
};

export const shouldShowAccessPointTimeout = (visibleNumber: number) => {
  return [1, 3, 4, 5, 6, 7, 8, 9, 10].includes(visibleNumber);
};
