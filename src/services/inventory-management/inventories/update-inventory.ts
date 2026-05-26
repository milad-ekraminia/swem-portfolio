import { addInventorySchemaType } from '@/validations/inventory-management/inventories/add-edit-inventory-validation';
import { getFormDataPost } from '@/lib/api-method/api-method-functions';

const apiVersion = import.meta.env.VITE_API_VERSION;

export async function updateInventory(formData: addInventorySchemaType) {
  const { inventoryId, ...remainingData } = formData;
  return await getFormDataPost({
    endPoint: `app/inventories/${inventoryId}?api-version=${apiVersion}`,
    formData: remainingData,
    type: 'put',
  });
}
