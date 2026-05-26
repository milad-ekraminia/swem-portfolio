export interface ScheduledReport {
  "active": boolean,
  "description": string,
  "filterProfileId": number,
  "reportType": string,
  "workHour": number,
  "sendMail": boolean,
  "userIds": string[],
  "lastReportTime"?: string,
  "nextReportTime"?: string,
  "id": number
}

export interface ScheduledReportFormData {
  "Active": boolean,
  "Description": string,
  "FilterProfileId": number,
  "ReportType": string,
  "WorkHour": number,
  "SendMail": boolean,
  "UserIds": string[],
  "LastReportTime"?: string,
  "NextReportTime"?: string
}
