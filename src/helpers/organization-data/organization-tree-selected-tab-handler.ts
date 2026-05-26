export const getCustomTypeNumber = (
  orgType: number,
  orgTreeType: number,
  deviceType: number,
) => {
  console.log(
    '🚀 ~ getCustomTypeNumber ~ orgType:',
    orgType,
    orgTreeType,
    deviceType,
  );
  if (orgType === 0) {
    if (orgTreeType === 1) {
      if (deviceType === 0) {
        return 0;
      }
    } else if (orgTreeType === 2) {
      if (deviceType === 1 || deviceType === 11) {
        return 5;
      } else if (deviceType === 26) {
        return 6;
      } else if (deviceType === 51) {
        return 7;
      }
    }
  } else if (orgType === 1) {
    if (orgTreeType === 1) {
      if (deviceType === 0) {
        return 1;
      }
    }
  } else if (orgType === 3 || orgType === 4) {
    if (orgTreeType === 1 && deviceType === 0) {
      return 3;
    }
  }
};
