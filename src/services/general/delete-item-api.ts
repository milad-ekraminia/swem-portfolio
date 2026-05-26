import { getData } from '@/lib/api-method/api-method-functions';

export async function deleteItemApi({
  deleteItemUrl,
}: {
  deleteItemUrl: string;
}) {
  return await getData({
    endPoint: deleteItemUrl,
    type: 'delete',
  });
}
