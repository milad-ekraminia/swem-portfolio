import { getFormDataPost } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function createNewProduct(formData: any) {
  return await getFormDataPost({
    endPoint: `app/products?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}
