import { getData } from '@/lib/api-method/api-method-functions';

export async function fetchWorkOrderDetail({
  workOrderId,
}: {
  workOrderId: number;
}) {
  return await getData({
    endPoint: `app/work-orders/${workOrderId}?api-version=${
      import.meta.env.VITE_API_VERSION
    }`,
    type: 'get',
  });
}
