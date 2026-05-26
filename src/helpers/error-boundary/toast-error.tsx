import { toast } from 'react-toastify';

export const toastError = (error: any) => {
  // if (error?.error_description?.error?.details) {
  //   toast.error(error?.error_description?.error?.details);
  if (error?.error_description?.error?.message) {
    toast.error(error?.error_description?.error?.message);
  } else toast.error(error?.error_description);
};

export const toastUseQueryError = (error: any) => {
  if (error?.response?.data?.error?.details) {
    toast.error(error?.response?.data?.error?.details);
  } else {
    toast.error(error?.response?.data?.error?.message);
  }
};
