import { LoginRequestType, UserAccount } from '@/types/pages/login/form';
import { getData } from '@/lib/api-method/api-method-functions';

export async function loginApi(inputValues: UserAccount) {
  const grant_type = import.meta.env.VITE_API_GRANT_TYPE;
  const client_id = import.meta.env.VITE_API_CLIENT_ID;
  const client_secret = import.meta.env.VITE_API_CLIENT_SECRET;
  const scope = import.meta.env.VITE_API_SCOPE;
  const { username, password } = inputValues;

  const dataParams: LoginRequestType = {
    username,
    password,
    grant_type,
    client_id,
    client_secret,
    scope,
  };

  return await getData({
    endPoint: `connect/token`,
    type: 'post',
    dataParams,
    isToken: false,
    hasTenant: true,
  });
}
