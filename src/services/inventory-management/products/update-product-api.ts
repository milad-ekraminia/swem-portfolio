import { updateProductInitialValues } from '@/types/pages/inventory-management/inventory-management';
import { getFormDataPost } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function updateProducts(formData: updateProductInitialValues) {
  const { productId, ...remainingData } = formData;
  return await getFormDataPost({
    endPoint: `app/products/${productId}?api-version=${apiVersion}`,
    formData: remainingData,
    type: 'put',
  });
}
