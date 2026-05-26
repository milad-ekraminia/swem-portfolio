export const formatSelectOptions = (data: any) => {
  return (
    data?.items?.map((item: any) => ({
      title: item.displayName,
      value: item.id,
    })) ?? []
  );
};

export const formatSelectOptionsWithoutItems = (data: any) => {
  return data?.length
    ? data?.map((item: any) => ({
        title: item.displayName,
        value: item.id,
      }))
    : [];
};

export const formatSelectOptionsWithExtraInfo = (data: any) => {
  return (
    data?.map((item: any) => ({
      title: `${item.countryCode} - ${item.cityName}`,
      value: item.id,
    })) ?? []
  );
};
