import { getTranslatedValue } from '@/helpers/get-translated-value';
import * as yup from 'yup';

export const accessPointsInitialValues = {
  active: true,
  accessPointName: '',
  accessPointDescription: '',
  accessPointCommType: 1,
  accessPointBackEndService: 1,
  accessPointCommMethod: 1,
  accessPointProtocolId: 1,
  accessPointCommLine: 1,
  accessPointIp: '192.168.1.1',
  accessPointPort: 502,
  accessPointConfPort: 555,
  mqttConnectionProtocol: 0,
  mqttVersion: 0,
  sslVersion: '',
  subscriberUserName: '',
  subscriberPassword: '',
  subscriberClientId: '',
  accessPointSerialNr: 1000001,
  accessPointComPort: '',
  accessPointTimeout: 1000,
  accessPointQueryRetryCnt: 3,
  accessPointLastConnTime: '',
  accessPointConnStatus: 0,
  accessPointLastThreadUpd: '',
  caCertificate: '',
  certificate: '',
  privateKey: '',
  opcConnectionUrl: '',
  opcUserName: '',
  opcPassword: '',
  opcConnectionProtocol: 0,
  opcNodeId: 2,
  opcMessageSecurityMode: 0,
  accessPointLogFlag: false,
  brokerSubscriberInfos: [],
};

export const accessPointsResolver = yup.object({
  active: yup.boolean(),
  accessPointName: yup
    .string()
    .required(
      `${getTranslatedValue('AccessPointName')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  accessPointDescription: yup.string(),
  accessPointCommType: yup.number(),
  accessPointBackEndService: yup.number(),
  accessPointCommMethod: yup.number(),
  accessPointProtocolId: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? 1 : value)),
  accessPointCommLine: yup.number(),
  accessPointIp: yup
    .string()
    .matches(
      /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}$/,
      'Invalid IP address',
    )
    .required(
      `${getTranslatedValue('AccessPointIp')} ${getTranslatedValue('Required', 'AbpIdentity.texts')}`,
    ),
  accessPointPort: yup.number(),
  accessPointConfPort: yup.number(),
  mqttConnectionProtocol: yup.number(),
  mqttVersion: yup.number(),
  sslVersion: yup.string(),
  subscriberUserName: yup.string(),
  subscriberPassword: yup.string(),
  subscriberClientId: yup.string(),
  accessPointSerialNr: yup.number(),
  accessPointComPort: yup.string(),
  accessPointTimeout: yup.number(),
  accessPointQueryRetryCnt: yup.number(),
  accessPointLastConnTime: yup.string().nullable(),
  accessPointConnStatus: yup.number(),
  accessPointLastThreadUpd: yup.string().nullable(),
  caCertificate: yup.string().nullable(),
  certificate: yup.string().nullable(),
  privateKey: yup.string().nullable(),
  opcConnectionUrl: yup.string(),
  opcUserName: yup.string(),
  opcPassword: yup.string(),
  opcConnectionProtocol: yup.number(),
  opcNodeId: yup.number(),
  opcMessageSecurityMode: yup.number(),
  accessPointLogFlag: yup.boolean(),
  brokerSubscriberInfos: yup.array().of(
    yup.object({
      subscriptionTopic: yup.string(),
      subscriptionTopicQos: yup.number(),
    }),
  ),
});

export type accessPointsInitialValuesTypes = yup.InferType<
  typeof accessPointsResolver
>;

export const brokerSubscriberInfosSchema = yup.object({
  subscriptionTopic: yup.string(),
  subscriptionTopicQos: yup.number(),
});

export type brokerSubscriberInfosSchemaType = yup.InferType<
  typeof brokerSubscriberInfosSchema
>;
