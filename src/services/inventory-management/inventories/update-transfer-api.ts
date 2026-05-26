import { getFormDataPost } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function updateTransfer(formData: any) {
  return await getFormDataPost({
    endPoint: `app/inventories/transfer-inventory?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}
