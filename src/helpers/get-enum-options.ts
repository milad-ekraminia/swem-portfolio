export const getEnumOptions = (
  enumObj: any,
): { value: number; title: string }[] => {
  return Object.entries(enumObj)
    .filter(([, value]) => !isNaN(Number(value)))
    .map(([key, value]) => ({ value: Number(value), title: key }));
};

export const getEnumStringOptions = (
  enumObj: any,
): { value: string; title: string }[] => {
  return Object.entries(enumObj)
    .filter(([, value]) => !isNaN(Number(value)))
    .map(([key, value]) => ({ value: String(value), title: key }));
};

export const getOrgTypeEnumOptionsByCondition = (
  enumObj: any,
  ng: number,
  re: number,
): { value: number; title: string }[] => {
  return Object.entries(enumObj)
    .filter(([, value]) => !isNaN(Number(value)))
    .filter(([, value]) => {
      const numericValue = Number(value);

      if (numericValue === enumObj.Company || numericValue === enumObj.System) {
        return false;
      }

      if (numericValue === enumObj.BusinessTownDistrict) {
        return ng === 1 || re === 1;
      }

      if (numericValue === enumObj.Station) {
        return ng === 1;
      }

      if (
        numericValue === enumObj.RenewablePowerPlant ||
        numericValue === enumObj.RenewablePowerPlantPartialPlanthole
      ) {
        return re === 1;
      }

      return true;
    })
    .map(([key, value]) => ({
      value: Number(value),
      title: 'Enum:OrganizationType.' + key,
    }));
};

export const getStationTypeEnumOptionsByCondition = (
  enumObj: any,
): { value: number; title: string }[] => {
  return Object.entries(enumObj)
    .filter(([, value]) => !isNaN(Number(value)))
    .filter(([, value]) => {
      const numericValue = Number(value);

      if (
        numericValue === enumObj.CustomerStation ||
        numericValue === enumObj.VirtualStation
      ) {
        return false;
      }

      return true;
    })
    .map(([key, value]) => ({
      value: Number(value),
      title: key.replace(/([A-Z])/g, ' $1').trim(),
    }));
};
