import { getData } from '@/lib/api-method/api-method-functions';


export async function fetchTreeDataApi() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: 1,
      caption: 'Arma Solar Plant',
      orgType: 0,
      orgTreeType: 1,
      deviceType: 0,
      type: 0,
      active: true,
      hasActiveAlarm: 2,
      organizationType: 0,
      organizationTreeNodeType: 1,
      deviceModelType: 0,
      deviceModelId: null,
      locationId: 34,

      childs: [
        {
          id: 11,
          caption: 'Istanbul Solar Plant',

          orgType: 0,
          orgTreeType: 1,
          deviceType: 0,
          type: 1,

          active: true,
          hasActiveAlarm: 1,
          organizationType: 1,
          organizationTreeNodeType: 1,
          deviceModelType: 0,
          deviceModelId: null,
          locationId: 3401,

          childs: [
            {
              id: 111,
              caption: 'Huawei SUN2000-100KTL',

              orgType: 3,
              orgTreeType: 1,
              deviceType: 0,
              type: 2, // 5

              active: true,
              hasActiveAlarm: 0,
              organizationType: 3,
              organizationTreeNodeType: 1,
              deviceModelType: 0,
              deviceModelId: 501,
              locationId: 340101,

              // childs: [
              //   {
              //     id: 1111,
              //     caption: 'Inverter A-01',

              //     orgType: 0,
              //     orgTreeType: 2,
              //     deviceType: 1,
              //     type: 3,

              //     active: true,
              //     hasActiveAlarm: 0,
              //     organizationType: 4,
              //     organizationTreeNodeType: 3,
              //     deviceModelType: 1,
              //     deviceModelId: 501,
              //     locationId: 34010101,
              //     childs: [],
              //   },
              //   {
              //     id: 1112,
              //     caption: 'Inverter A-02',

              //     orgType: 0,
              //     orgTreeType: 2,
              //     deviceType: 1,
              //     type: 3,

              //     active: false,
              //     hasActiveAlarm: 3,
              //     organizationType: 4,
              //     organizationTreeNodeType: 3,
              //     deviceModelType: 1,
              //     deviceModelId: 501,
              //     locationId: 34010102,
              //     childs: [],
              //   },
              //   {
              //     id: 1113,
              //     caption: 'Inverter A-03',

              //     orgType: 0,
              //     orgTreeType: 2,
              //     deviceType: 26,
              //     type: 3, // 6

              //     active: true,
              //     hasActiveAlarm: 1,
              //     organizationType: 4,
              //     organizationTreeNodeType: 3,
              //     deviceModelType: 1,
              //     deviceModelId: 501,
              //     locationId: 34010103,
              //     childs: [],
              //   },
              // ],
            },

            {
              id: 112,
              caption: 'Sungrow SG125CX',

              orgType: 3,
              orgTreeType: 1,
              deviceType: 0,
              type: 2,

              active: true,
              hasActiveAlarm: 2,
              organizationType: 3,
              organizationTreeNodeType: 1,
              deviceModelType: 0,
              deviceModelId: 502,
              locationId: 340102,
            },
          ],
        },
      ],
    },
  ];
}
export async function loginApi() {
  const grant_type = import.meta.env.VITE_API_GRANT_TYPE;
  const client_id = import.meta.env.VITE_API_CLIENT_ID;
  const client_secret = import.meta.env.VITE_API_CLIENT_SECRET;
  const scope = import.meta.env.VITE_API_SCOPE;

  const dataParams: {
    username?: string;
    password?: string;
    grant_type?: string;
    client_id?: string;
    client_secret?: string;
    scope?: string;
  } = {
    username: 'admin',
    password: 'Atolla34!',
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