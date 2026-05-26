import { deleteCookie } from '@/helpers/cookies';

export const handleResponse = (response: any): any => {
  const status = response?.status;
  // const message = response?.response?.data?.error?.message;
  if (
    response?.status === 200 ||
    response?.status === 204 ||
    response?.status === 201
  ) {
    return response.data;
  } else {
    if (response?.status === 401) {
      deleteCookie('auth_token');
      // Redirect to login
      window.location.href = '/login';
    } else if ([403, 500]?.includes(status)) {
      // window.location.href = `/error/${status}`;  // azure task id : 169 => when one of the page’s APIs returns a 500 error or any other error, the entire page must not be redirected to the error page.
      throw response;
    } else {
      throw response;
    }
  }
};
