import { getTranslatedValue } from '@/helpers/get-translated-value';

export const usersTableHeaders = [
  {
    title: getTranslatedValue('DisplayName:UserName', 'AbpAccount.texts'),
    sort: 'UserName',
  },
  {
    title: 'Email',
    sort: 'Email',
  },
  {
    title: 'Roles',
    sort: '',
  },
  {
    title: getTranslatedValue('PhoneNumber', 'AbpIdentity.texts'),
    sort: 'PhoneNumber',
  },
  {
    title: 'Name',
    sort: 'Name',
  },
  {
    title: getTranslatedValue('DisplayName:Surname', 'AbpAccount.texts'),
    sort: 'Surname',
  },
  {
    title: getTranslatedValue('DisplayName:IsActive', 'AbpIdentity.texts'),
    sort: 'IsActive',
  },
  {
    title: getTranslatedValue(
      'DisplayName:LockoutEnabled',
      'AbpIdentity.texts',
    ),
    sort: 'LockoutEnabled',
  },
  {
    title: getTranslatedValue(
      'DisplayName:EmailConfirmed',
      'AbpIdentity.texts',
    ),
    sort: 'EmailConfirmed',
  },
  {
    title: getTranslatedValue(
      'DisplayName:TwoFactorEnabled',
      'AbpAccount.texts',
    ),
    sort: 'TwoFactorEnabled',
  },
  {
    title: getTranslatedValue(
      'DisplayName:AccessFailedCount',
      'AbpIdentity.texts',
    ),
    sort: 'AccessFailedCount',
  },
  {
    title: getTranslatedValue('DisplayName:CreationTime', 'Payment.texts'),
    sort: 'CreationTime',
  },
  {
    title: getTranslatedValue('LastModificationTime', 'AbpIdentity.texts'),
    sort: 'LastModificationTime',
  },
  {
    title: getTranslatedValue('AppUserOrganizationId', 'AbpIdentity.texts'),
    sort: '',
  },
  {
    title: getTranslatedValue('AppUserMimicProfileId', 'AbpIdentity.texts'),
    sort: '',
  },
  {
    title: getTranslatedValue(
      'AppUserOrganizationProfileId',
      'AbpIdentity.texts',
    ),
    sort: '',
  },
  {
    title: 'Actions',
    sort: '',
  },
];

export const securityLogsTableHeaders = [
  {
    title: getTranslatedValue('SecurityLogs:Date', 'AbpIdentity.texts'),
    sort: 'CreationTime',
  },
  {
    title: getTranslatedValue('SecurityLogs:Action', 'AbpIdentity.texts'),
    sort: 'Action',
  },
  {
    title: getTranslatedValue('SecurityLogs:IpAddress', 'AbpIdentity.texts'),
    sort: 'ClientIpAddress',
  },
  {
    title: getTranslatedValue('SecurityLogs:Browser', 'AbpIdentity.texts'),
    sort: 'BrowserInfo',
  },
  {
    title: getTranslatedValue('SecurityLogs:Application', 'AbpIdentity.texts'),
    sort: 'ApplicationName',
  },
  {
    title: getTranslatedValue('SecurityLogs:Identity', 'AbpIdentity.texts'),
    sort: 'Identity',
  },
  {
    title: getTranslatedValue('SecurityLogs:UserName', 'AbpIdentity.texts'),
    sort: 'UserName',
  },
  {
    title: getTranslatedValue('SecurityLogs:Client', 'AbpIdentity.texts'),
    sort: 'ClientId',
  },
  {
    title: getTranslatedValue(
      'SecurityLogs:CorrelationId',
      'AbpIdentity.texts',
    ),
    sort: 'CorrelationId',
  },
];

export const LanguageTableHeaders = [
  {
    title: getTranslatedValue('DisplayName', 'LanguageManagement.texts'),
    sort: 'DisplayName',
  },
  {
    title: getTranslatedValue('BaseCultureName', 'LanguageManagement.texts'),
    sort: 'BaseCultureName',
  },
  {
    title: getTranslatedValue('UiCultureName', 'LanguageManagement.texts'),
    sort: 'UiCultureName',
  },
  {
    title: getTranslatedValue('IsEnabled', 'LanguageManagement.texts'),
    sort: 'IsEnabled',
  },
  {
    title: '#',
    sort: '',
  },
  {
    title: getTranslatedValue('Actions', 'AbpUi.texts'),
    sort: '',
  },
];

export const sessionsTableHeaders = [
  {
    title: getTranslatedValue('Session:Device', 'AbpIdentity.texts'),
    sort: '',
  },
  {
    title: getTranslatedValue('Session:DeviceInfo', 'AbpIdentity.texts'),
    sort: '',
  },
  {
    title: getTranslatedValue('Session:SignedIn', 'AbpIdentity.texts'),
    sort: '',
  },
  {
    title: getTranslatedValue('Session:LastAccessed', 'AbpIdentity.texts'),
    sort: '',
  },
  {
    title: getTranslatedValue('Session:Current', 'AbpIdentity.texts'),
    sort: '',
  },
  {
    title: getTranslatedValue('Actions', 'AbpUi.texts'),
    sort: '',
  },
];

export const yesOrNoList = [
  {
    title: getTranslatedValue('Yes', 'AbpUi.texts'),
    value: 'True',
  },
  {
    title: getTranslatedValue('No', 'AbpUi.texts'),
    value: 'False',
  },
];

export const textTableHeaders = [
  {
    title: getTranslatedValue('Key', 'LanguageManagement.texts'),
    sort: 'Name',
  },
  {
    title: getTranslatedValue('BaseValue', 'LanguageManagement.texts'),
    sort: 'CultureName',
  },
  {
    title: getTranslatedValue('Value', 'LanguageManagement.texts'),
    sort: 'Value',
  },
  {
    title: getTranslatedValue('ResourceName', 'LanguageManagement.texts'),
    sort: 'ResourceName',
  },
  {
    title: getTranslatedValue('Actions', 'AbpUi.texts'),
    sort: '',
  },
];
export const userOrganizationProfilesMainTableHeaders = [
  {
    title: '',
    sort: '',
  },
  {
    title: getTranslatedValue('ProfileName'),
    sort: 'ProfileName',
  },

  {
    title: ' ',
    sort: '',
  },
  {
    title: getTranslatedValue('Actions', 'AbpUi.texts'),
    sort: '',
  },
];
export const userOrganizationProfilesDetailTableHeaders = [
  {
    title: getTranslatedValue('em_organization'),
    sort: 'Organization',
  },
  {
    title: getTranslatedValue('Actions', 'AbpUi.texts'),
    sort: '',
  },
];

export const rolesTableHeaders = [
  {
    title: getTranslatedValue('DisplayName:RoleName', 'AbpIdentity.texts'),
    sort: 'RoleName',
  },
  {
    title: getTranslatedValue('DisplayName:IsPublic', 'AbpIdentity.texts'),
    sort: '',
  },
  {
    title: getTranslatedValue('DisplayName:IsDefault', 'AbpIdentity.texts'),
    sort: '',
  },
  {
    title: getTranslatedValue('UserCount', 'AbpIdentity.texts'),
    sort: 'UserCount',
  },
  {
    title: 'Actions',
    sort: '',
  },
];

export const twoFactorOptions = [
  {
    value: 1,
    title: getTranslatedValue(
      'Feature:TwoFactor.Disabled',
      'AbpIdentity.texts',
    ),
  },
  {
    value: 0,
    title: getTranslatedValue(
      'Feature:TwoFactor.Optional',
      'AbpIdentity.texts',
    ),
  },
  {
    value: 2,
    title: getTranslatedValue('Feature:TwoFactor.Forced', 'AbpIdentity.texts'),
  },
];

export const sessionsOptions = [
  {
    value: 1,
    title: getTranslatedValue(
      'Enum:IdentityProPreventConcurrentLoginBehaviour.Disabled',
      'AbpIdentity.texts',
    ),
  },
  {
    value: 0,
    title: getTranslatedValue(
      'Enum:IdentityProPreventConcurrentLoginBehaviour.LogoutFromSameTypeDevices',
      'AbpIdentity.texts',
    ),
  },
  {
    value: 2,
    title: getTranslatedValue(
      'Enum:IdentityProPreventConcurrentLoginBehaviour.LogoutFromAllDevices',
      'AbpIdentity.texts',
    ),
  },
];
