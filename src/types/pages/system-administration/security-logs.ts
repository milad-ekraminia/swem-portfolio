export interface Filters {
  StartTime?: string;
  EndTime?: string;
  ApplicationName?: string;
  Identity?: string;
  asdassd?: string;
  UserName?: string;
  Action?: string;
  ClientId?: string;
  CorrelationId?: string;
}
export interface SecurityLog {
  tenantId: string;
  applicationName: string;
  identity: string;
  action: string;
  userId: string;
  userName: string;
  tenantName: string;
  clientId: string;
  correlationId: string;
  clientIpAddress: string;
  browserInfo: string;
  creationTime: string;
  id: string;
}
