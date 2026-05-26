import { getFormDataPost } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function createNewInventory(formData: any) {
  return await getFormDataPost({
    endPoint: `app/inventories?api-version=${apiVersion}`,
    formData,
    type: 'post',
  });
}

export async function createNewInventoriesWithUseExcel({
  formData,
  id,
}: {
  formData: any;
  id: number;
}) {
  return await getFormDataPost({
    endPoint: `app/import-from-excel/import-inventories-from-excel/${id}?api-version=${apiVersion}`,
    formData: formData,
    type: 'post',
    hasExcel: true,
  });
}
