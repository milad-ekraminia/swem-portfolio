// it should get application-configuration key from localStorage and pars from string to object and find  key from object and return value of key
export const getPermission = (value: string) => {
  const userPermissionItems =
    localStorage.getItem('application-configuration') !== 'undefined'
      ? JSON.parse(localStorage.getItem('application-configuration') ?? '{}')
      : {};
  return userPermissionItems?.[value] ?? false;
};

